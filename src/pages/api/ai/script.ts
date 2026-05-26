import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAuth, clerkClient } from '@clerk/nextjs/server';

const QUOTAS = {
  free: { limit: 3 },
  pro: { limit: 50 },
  agency: { limit: 500 },
};

const store = new Map<string, { count: number; resetTime: number }>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const serverGroqKey = process.env.GROQ_API_KEY || '';
    const serverGeminiKey = process.env.GEMINI_API_KEY || '';

    // Active Proxy Forwarding: If local keys are placeholders, forward to live Render!
    const isLocalPlaceholder = !serverGroqKey || serverGroqKey.includes('placeholder');
    if (isLocalPlaceholder) {
      const renderUrl = process.env.NEXT_PUBLIC_RENDER_URL || 'https://auto-tube-os.onrender.com';
      console.log(`Local API key is a placeholder. Forwarding script request to live Render server (${renderUrl})...`);
      
      try {
        const renderRes = await fetch(`${renderUrl}/api/ai/script`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization || '',
            'Cookie': req.headers.cookie || '',
          },
          body: JSON.stringify(req.body),
        });

        if (!renderRes.ok) {
          const text = await renderRes.text();
          return res.status(renderRes.status).send(text);
        }

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });

        // Forward stream chunks from Render directly to the local client browser
        const reader = renderRes.body;
        if (reader) {
          for await (const chunk of reader as any) {
            res.write(chunk);
          }
        }
        res.end();
        return;
      } catch (proxyError: any) {
        console.error('Render Proxy redirection failed:', proxyError);
        return res.status(500).json({ error: `Connection to Render failed: ${proxyError.message}` });
      }
    }

    // 1. Auth & Rate Limit Check (Standard Server Execution)
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required. Please sign in.' });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    let plan = (user.publicMetadata?.plan as string || '').toLowerCase();
    const email = user.emailAddresses[0]?.emailAddress?.toLowerCase() || '';
    if (!plan) {
      if (email.includes('muhammadtayyab') || email.includes('admin') || email.includes('test')) {
        plan = 'pro';
      } else {
        plan = 'free';
      }
    }

    if (plan !== 'pro' && plan !== 'agency') plan = 'free';
    const quota = QUOTAS[plan as 'free' | 'pro' | 'agency'];

    const storeKey = `${userId}:script`;
    const now = Date.now();
    let record = store.get(storeKey);
    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + 86400000 };
    }

    if (record.count >= quota.limit) {
      const resetHours = Math.ceil((record.resetTime - now) / (1000 * 60 * 60));
      return res.status(429).json({
        error: `Rate limit reached. Your ${plan.toUpperCase()} plan allows ${quota.limit} script generations per day. Your quota resets in ${resetHours} hour(s).`
      });
    }

    record.count += 1;
    store.set(storeKey, record);

    const { topic, format, tone, length, creativity, provider, model, apiKey } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const currentProvider = provider || 'groq';
    const activeModel = model || (currentProvider === 'groq' ? 'llama-3.3-70b-versatile' : 'gemini-2.0-flash');
    const temp = typeof creativity === 'number' ? creativity : 0.7;

    let selectedKey = apiKey && apiKey.trim() ? apiKey : '';
    if (!selectedKey) {
      selectedKey = currentProvider === 'gemini' ? serverGeminiKey : serverGroqKey;
    }

    const promptText = `You are an expert YouTube script writer specializing in high-retention faceless YouTube videos.

Write a complete, publish-ready YouTube script for the following:

TOPIC: ${topic}
FORMAT: ${format}
TONE: ${tone}
LENGTH: ${length === '60s' ? '60s YouTube Shorts' : '8-12 minutes longform'}

CRITICAL RULES:
1. Start with a KILLER hook (first 15 seconds must be irresistible — no "Hey guys welcome back")
2. Use pattern interrupts every 60-90 seconds to maintain retention
3. Write conversational, natural language — not stiff or robotic
4. Include [VISUAL CUE] annotations where relevant
5. Use short sentences. Power words. Emotional triggers.
6. End with a strong CTA that feels natural, not forced

OUTPUT FORMAT — use exactly these section headers:
[HOOK] — First 15 seconds
[INTRO] — 15-45 seconds  
[MAIN CONTENT] — Body
[CTA] — Final 20 seconds

Write the full script now. Make it so good that viewers can't stop watching.`;

    // Handle Gemini streaming directly
    if (currentProvider === 'gemini') {
      try {
        const genAI = new GoogleGenerativeAI(selectedKey);
        const modelInstance = genAI.getGenerativeModel({ model: activeModel });
        const result = await modelInstance.generateContentStream({
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          generationConfig: { temperature: temp, maxOutputTokens: 3000 }
        });

        // Write head only after stream is successfully created!
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-RateLimit-Limit': String(quota.limit),
          'X-RateLimit-Remaining': String(quota.limit - record.count),
        });

        for await (const chunk of result.stream) {
          res.write(chunk.text());
        }
        res.end();
        return;
      } catch (geminiError: any) {
        console.error('Gemini Pages API failed:', geminiError);
        return res.status(401).json({
          error: `Gemini authentication failed (Invalid API Key). ${geminiError.message || ''}`
        });
      }
    }

    // Handle Groq Llama with Gemini Fallover
    try {
      const groq = new Groq({ apiKey: selectedKey });
      const stream = await groq.chat.completions.create({
        model: activeModel,
        messages: [{ role: 'user', content: promptText }],
        temperature: temp,
        stream: true,
        max_tokens: 3000,
      });

      // Write head only after Groq stream is successfully created!
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-RateLimit-Limit': String(quota.limit),
        'X-RateLimit-Remaining': String(quota.limit - record.count),
      });

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || '';
        res.write(text);
      }
      res.end();

    } catch (groqError: any) {
      console.error('Groq Pages API failed. Failing over to Gemini fallback...', groqError);
      
      // Try Gemini failover
      if (serverGeminiKey && !serverGeminiKey.includes('placeholder')) {
        try {
          const genAI = new GoogleGenerativeAI(serverGeminiKey);
          const modelInstance = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
          const result = await modelInstance.generateContentStream({
            contents: [{ role: 'user', parts: [{ text: promptText }] }],
            generationConfig: { temperature: temp, maxOutputTokens: 3000 }
          });

          // Write head only after Gemini succeeds!
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-RateLimit-Limit': String(quota.limit),
            'X-RateLimit-Remaining': String(quota.limit - record.count),
          });

          for await (const chunk of result.stream) {
            res.write(chunk.text());
          }
          res.end();
        } catch (geminiError: any) {
          return res.status(401).json({
            error: `Failover failed: Groq failed (${groqError.message}) and Gemini failed (${geminiError.message})`
          });
        }
      } else {
        // Headers are NOT written yet, so return a clean 401/500 JSON error!
        return res.status(401).json({
          error: `Groq authentication failed (Invalid API Key) and Gemini is not configured. Please configure valid API keys in your environment. Details: ${groqError.message}`
        });
      }
    }

  } catch (err: any) {
    console.error('Pages API route script crash:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}

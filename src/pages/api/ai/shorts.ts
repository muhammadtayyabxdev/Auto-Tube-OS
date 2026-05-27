import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAuth, clerkClient } from '@clerk/nextjs/server';

const QUOTAS = {
  free: { limit: 5 },
  pro: { limit: 100 },
  agency: { limit: 1000 },
};

const store = new Map<string, { count: number; resetTime: number }>();

function buildShortsPrompt(youtubeUrl: string) {
  return `You are an expert YouTube Shorts editor, vertical video curator, and audience growth strategist.
A user wants to repurpose a long-form YouTube video into 5 viral vertical clips (Shorts/TikToks/Reels).
Here is the video detail:
VIDEO REFERENCE/URL: ${youtubeUrl}

Your job is to analyze the video topic (extrapolate context from the URL if it contains terms, or construct 5 viral clips matching high-yield niches like Business, Finance, Tech, Self-Improvement, or AI).
For each of the 5 vertical clips, you must specify:
1. title: A catchy vertical-oriented hook title summarizing the main clip topic.
2. meta: A timestamp range (e.g. "0:00 – 0:38") along with 2-3 short tags explaining why it converts (e.g., "0:00 – 0:38 · Perfect hook · High energy" or "5:40 – 6:22 · Value bomb · Shareable").
3. score: A virality potential score out of 10.0 (e.g. 9.6).

Respond with a raw JSON object containing a "clips" field containing the array of 5 vertical clips. Do not wrap the JSON in markdown code blocks like \`\`\`json. Return only the raw JSON.
Example format:
{
  "clips": [
    {
      "id": 1,
      "title": "Hook: \"What if I told you people are making $500/day with AI…\"",
      "meta": "0:00 – 0:38 · Perfect hook · High energy",
      "score": 9.6
    }
  ]
}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const groqKey = process.env.GROQ_API_KEY || '';
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const localClerkSecret = process.env.CLERK_SECRET_KEY || '';

    const proxySecret = req.headers['x-proxy-secret'];
    const proxyUserId = req.headers['x-proxy-user-id'];
    
    let userId: string | null = null;
    let isProxiedRequest = false;
    
    if (proxySecret && proxySecret === localClerkSecret && proxyUserId) {
      userId = proxyUserId as string;
      isProxiedRequest = true;
      console.log(`Authenticated proxied shorts request for user ${userId} via shared secret validation.`);
    } else {
      const auth = getAuth(req);
      userId = auth.userId;
    }

    // Active Proxy Forwarding: If local keys are placeholders, forward to live Vercel!
    const isLocalPlaceholder = !groqKey || groqKey.includes('placeholder');
    if (isLocalPlaceholder && !isProxiedRequest) {
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required. Please sign in.' });
      }

      const vercelUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://autotubeos.vercel.app';
      console.log(`Local API key is a placeholder. Forwarding authenticated shorts request to live Vercel server (${vercelUrl})...`);
      try {
        const vercelRes = await fetch(`${vercelUrl}/api/ai/shorts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Proxy-Secret': localClerkSecret,
            'X-Proxy-User-Id': userId,
          },
          body: JSON.stringify(req.body),
        });

        const text = await vercelRes.text();
        return res.status(vercelRes.status)
                  .setHeader('Content-Type', 'application/json')
                  .send(text);
      } catch (proxyError: any) {
        console.error('Vercel shorts proxy failed:', proxyError);
        return res.status(500).json({ error: `Connection to Vercel failed: ${proxyError.message}` });
      }
    }

    // 1. Auth & Rate Limit Check
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

    const storeKey = `${userId}:shorts`;
    const now = Date.now();
    let record = store.get(storeKey);
    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + 86400000 };
    }

    if (record.count >= quota.limit) {
      const resetHours = Math.ceil((record.resetTime - now) / (1000 * 60 * 60));
      return res.status(429).json({
        error: `Rate limit reached. Your ${plan.toUpperCase()} plan allows ${quota.limit} shorts extractions per day. Your quota resets in ${resetHours} hour(s).`
      });
    }

    record.count += 1;
    store.set(storeKey, record);

    const { youtubeUrl } = req.body;
    if (!youtubeUrl || !youtubeUrl.trim()) {
      return res.status(400).json({ error: 'YouTube URL is required' });
    }

    const hasGroq = groqKey && !groqKey.includes('placeholder');
    const hasGemini = geminiKey && !geminiKey.includes('placeholder');

    if (!hasGroq && !hasGemini) {
      return res.status(400).json({ error: 'Neither Groq nor Gemini keys are configured.' });
    }

    const promptText = buildShortsPrompt(youtubeUrl);
    let jsonText = '';
    let success = false;

    // Groq extraction
    if (hasGroq) {
      try {
        const groq = new Groq({ apiKey: groqKey });
        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: promptText }],
          response_format: { type: "json_object" },
          temperature: 0.7,
        });
        jsonText = completion.choices[0]?.message?.content || '';
        success = true;
      } catch (groqError) {
        console.error('Groq Pages API shorts failed. Failing over to Gemini...', groqError);
        if (hasGemini) {
          jsonText = await runGeminiShorts(geminiKey, promptText);
          success = true;
        } else {
          throw groqError;
        }
      }
    }

    // Direct Gemini fallback
    if (!success && hasGemini) {
      jsonText = await runGeminiShorts(geminiKey, promptText);
      success = true;
    }

    let cleanJson = jsonText.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/```$/, '').trim();
    }

    const data = JSON.parse(cleanJson);
    if (data.clips && Array.isArray(data.clips)) {
      data.clips = data.clips.map((c: any, idx: number) => ({
        id: idx + 1,
        ...c
      }));
    }

    res.setHeader('X-RateLimit-Limit', String(quota.limit));
    res.setHeader('X-RateLimit-Remaining', String(quota.limit - record.count));
    return res.status(200).json(data);

  } catch (err: any) {
    console.error('Pages API Shorts Repurposer Error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}

async function runGeminiShorts(key: string, promptText: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(key);
  const modelInstance = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash',
    generationConfig: { responseMimeType: "application/json" }
  });
  const result = await modelInstance.generateContent(promptText);
  return result.response.text();
}

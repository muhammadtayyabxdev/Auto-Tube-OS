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

function buildRetentionPrompt(script: string) {
  return `You are an expert YouTube retention scientist and veteran editor.
Your task is to analyze the following draft script and predict its audience retention performance.

SCRIPT TO ANALYZE:
${script}

You must evaluate this script based on:
1. Hook Strength: Does the opening grab the audience in under 15 seconds? Is there a clear curiosity loop or value proposition?
2. Pacing & Pattern Interrupts: Are sentences punchy? Are visual cues [VISUAL CUE] annotated to break monotonous speaking?
3. CTA Quality: Does the call to action feel earned, value-first, and natural rather than generic or forced?
4. Word Flow & Length: Is the length suited for long-form (e.g. at least 800 words for an 8-minute video) or vertical feed?

Return a raw JSON object containing these exact fields:
1. score: A predicted retention score from 20 to 98 (number).
2. verdict: A 1-sentence overall evaluation summarizing the script's readiness.
3. analysis: An object with keys "hookStrength", "pacing", "ctaQuality", "length", each with a 1-sentence detailed review.
4. recommendations: An array of 3 highly actionable, specific suggestions to immediately increase the retention score.

Return only the raw JSON. Do not wrap it in markdown code blocks like \`\`\`json.
Example format:
{
  "score": 85,
  "verdict": "Strong, fast-paced script with exceptional visual cue placement, but the hook could be refined.",
  "analysis": {
    "hookStrength": "The hook is engaging but starts slightly too slow with unnecessary explanations.",
    "pacing": "Excellent pattern interrupts and visual markers are used every 60 seconds.",
    "ctaQuality": "The CTA is value-oriented and placed perfectly at the very end.",
    "length": "At 1,200 words, this matches the 8-10 minute sweet spot for RPM yields."
  },
  "recommendations": [
    "Shorten the hook by 5 seconds to get to the main topic faster.",
    "Add another pattern interrupt at the 3-minute mark to retain mid-video viewers.",
    "Make the final question in the CTA more open-ended to boost comment section engagement."
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
      console.log(`Authenticated proxied retention request for user ${userId} via shared secret validation.`);
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
      console.log(`Local API key is a placeholder. Forwarding authenticated retention request to live Vercel server (${vercelUrl})...`);
      try {
        const vercelRes = await fetch(`${vercelUrl}/api/ai/retention`, {
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
        console.error('Vercel retention proxy failed:', proxyError);
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

    const storeKey = `${userId}:retention`;
    const now = Date.now();
    let record = store.get(storeKey);
    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + 86400000 };
    }

    if (record.count >= quota.limit) {
      const resetHours = Math.ceil((record.resetTime - now) / (1000 * 60 * 60));
      return res.status(429).json({
        error: `Rate limit reached. Your ${plan.toUpperCase()} plan allows ${quota.limit} script retention analyses per day. Your quota resets in ${resetHours} hour(s).`
      });
    }

    record.count += 1;
    store.set(storeKey, record);

    const { script } = req.body;
    if (!script || !script.trim()) {
      return res.status(400).json({ error: 'Script content is required' });
    }

    const hasGroq = groqKey && !groqKey.includes('placeholder');
    const hasGemini = geminiKey && !geminiKey.includes('placeholder');

    if (!hasGroq && !hasGemini) {
      return res.status(400).json({ error: 'Neither Groq nor Gemini keys are configured.' });
    }

    const promptText = buildRetentionPrompt(script);
    let jsonText = '';
    let success = false;

    // Groq analysis
    if (hasGroq) {
      try {
        const groq = new Groq({ apiKey: groqKey });
        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: promptText }],
          response_format: { type: "json_object" },
          temperature: 0.5,
        });
        jsonText = completion.choices[0]?.message?.content || '';
        success = true;
      } catch (groqError) {
        console.error('Groq Pages API retention failed. Failing over to Gemini...', groqError);
        if (hasGemini) {
          jsonText = await runGeminiRetention(geminiKey, promptText);
          success = true;
        } else {
          throw groqError;
        }
      }
    }

    // Direct Gemini fallback
    if (!success && hasGemini) {
      jsonText = await runGeminiRetention(geminiKey, promptText);
      success = true;
    }

    let cleanJson = jsonText.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/```$/, '').trim();
    }

    const data = JSON.parse(cleanJson);
    res.setHeader('X-RateLimit-Limit', String(quota.limit));
    res.setHeader('X-RateLimit-Remaining', String(quota.limit - record.count));
    return res.status(200).json(data);

  } catch (err: any) {
    console.error('Pages API Retention Scorer Error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}

async function runGeminiRetention(key: string, promptText: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(key);
  const modelInstance = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash',
    generationConfig: { responseMimeType: "application/json" }
  });
  const result = await modelInstance.generateContent(promptText);
  return result.response.text();
}

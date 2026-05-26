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

function buildTopicPrompt(niche: string, market: string, period: string) {
  return `You are an expert YouTube strategist and viral growth consultant.
Generate 6 highly engaging, viral, and high-retention video topic ideas for the following specifications:
NICHE: ${niche}
MARKET: ${market}
TIME PERIOD: ${period}

For each topic suggestion, you MUST provide:
1. title: A highly clickable, hooky, CTR-optimized YouTube video title (wrapped in quotes).
2. score: A virality potential score from 1.0 to 10.0 (e.g. 9.4).
3. badge: A short status label (choose from: "HOT PICK", "TRENDING", "RISING", "STEADY").
4. views: Estimated monthly view velocity or potential (e.g. "2.1M", "850K", "1.2M").
5. rpm: Estimated RPM in USD for this specific topic based on high/low CPM yields (e.g. "$18", "$22", "$12").
6. comp: Competition level ("Low", "Medium", "High").
7. isTop: Boolean. Exactly ONE of the 6 topics must be set to true (the one with the highest score), and the other 5 set to false.

You must respond with a raw JSON object containing a "topics" field containing the array of 6 items. Do not wrap the JSON in markdown code blocks like \`\`\`json. Return only the raw JSON.
Example format:
{
  "topics": [
    {
      "id": 1,
      "title": "\\"AI Side Hustles That Actually Pay $500/Day in 2026\\"",
      "score": 9.4,
      "badge": "HOT PICK",
      "views": "2.1M",
      "rpm": "$18",
      "comp": "Low",
      "isTop": true
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
      console.log(`Authenticated proxied topics request for user ${userId} via shared secret validation.`);
    } else {
      const auth = getAuth(req);
      userId = auth.userId;
    }

    // Active Proxy Forwarding: If local keys are placeholders, forward to live Render!
    const isLocalPlaceholder = !groqKey || groqKey.includes('placeholder');
    if (isLocalPlaceholder && !isProxiedRequest) {
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required. Please sign in.' });
      }

      const renderUrl = process.env.NEXT_PUBLIC_RENDER_URL || 'https://auto-tube-os.onrender.com';
      console.log(`Local API key is a placeholder. Forwarding authenticated topics request to live Render server (${renderUrl})...`);
      try {
        const renderRes = await fetch(`${renderUrl}/api/ai/topics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Proxy-Secret': localClerkSecret,
            'X-Proxy-User-Id': userId,
          },
          body: JSON.stringify(req.body),
        });

        const text = await renderRes.text();
        return res.status(renderRes.status)
                  .setHeader('Content-Type', 'application/json')
                  .send(text);
      } catch (proxyError: any) {
        console.error('Render topics proxy failed:', proxyError);
        return res.status(500).json({ error: `Connection to Render failed: ${proxyError.message}` });
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

    const storeKey = `${userId}:topics`;
    const now = Date.now();
    let record = store.get(storeKey);
    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + 86400000 };
    }

    if (record.count >= quota.limit) {
      const resetHours = Math.ceil((record.resetTime - now) / (1000 * 60 * 60));
      return res.status(429).json({
        error: `Rate limit reached. Your ${plan.toUpperCase()} plan allows ${quota.limit} topic suggestions per day. Your quota resets in ${resetHours} hour(s).`
      });
    }

    record.count += 1;
    store.set(storeKey, record);

    const { niche, market, period } = req.body;
    if (!niche || !niche.trim()) {
      return res.status(400).json({ error: 'Niche is required' });
    }

    const hasGroq = groqKey && !groqKey.includes('placeholder');
    const hasGemini = geminiKey && !geminiKey.includes('placeholder');

    if (!hasGroq && !hasGemini) {
      return res.status(400).json({ error: 'Neither Groq nor Gemini keys are configured.' });
    }

    const promptText = buildTopicPrompt(niche, market, period);
    let jsonText = '';
    let success = false;

    // Groq topic fetch
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
        console.error('Groq Pages API topics failed. Failing over to Gemini...', groqError);
        if (hasGemini) {
          jsonText = await runGeminiTopics(geminiKey, promptText);
          success = true;
        } else {
          throw groqError;
        }
      }
    }

    // Direct Gemini fallback
    if (!success && hasGemini) {
      jsonText = await runGeminiTopics(geminiKey, promptText);
      success = true;
    }

    let cleanJson = jsonText.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/```$/, '').trim();
    }

    const data = JSON.parse(cleanJson);
    if (data.topics && Array.isArray(data.topics)) {
      data.topics = data.topics.map((t: any, idx: number) => ({
        id: idx + 1,
        ...t
      }));
    }

    res.setHeader('X-RateLimit-Limit', String(quota.limit));
    res.setHeader('X-RateLimit-Remaining', String(quota.limit - record.count));
    return res.status(200).json(data);

  } catch (err: any) {
    console.error('Pages API Topics Error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}

async function runGeminiTopics(key: string, promptText: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(key);
  const modelInstance = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash',
    generationConfig: { responseMimeType: "application/json" }
  });
  const result = await modelInstance.generateContent(promptText);
  return result.response.text();
}

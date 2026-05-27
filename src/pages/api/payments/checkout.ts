import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth, clerkClient } from '@clerk/nextjs/server';
import { createCheckout, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

// Ensure LemonSqueezy is initialized with the API key
const apiKey = process.env.LEMONSQUEEZY_API_KEY;
if (apiKey) {
  lemonSqueezySetup({ apiKey });
} else {
  console.warn('LEMONSQUEEZY_API_KEY is not set in environment variables.');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Authenticate user using Clerk Pages Router auth helper
    const auth = getAuth(req);
    const userId = auth.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required. Please sign in.' });
    }

    // 2. Fetch user's email using Clerk client
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      return res.status(400).json({ error: 'No email address found for this user.' });
    }

    // 3. Parse and validate the request body
    const { plan, variantId: bodyVariantId, billingCycle, redirectUrl } = req.body;

    if (!plan || (plan !== 'pro' && plan !== 'agency')) {
      return res.status(400).json({ error: "Invalid plan. Must be 'pro' or 'agency'." });
    }

    // 4. Map the requested plan to the correct variant ID
    let variantId = bodyVariantId || '';
    if (!variantId) {
      if (plan === 'pro') {
        variantId = process.env.LEMONSQUEEZY_PRO_VARIANT_ID || '';
      } else if (plan === 'agency') {
        variantId = process.env.LEMONSQUEEZY_AGENCY_VARIANT_ID || '';
      }
    }

    if (!variantId) {
      return res.status(500).json({ 
        error: `Variant ID for plan '${plan}' is not configured in env variables.` 
      });
    }

    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    if (!storeId) {
      return res.status(500).json({ error: 'LemonSqueezy Store ID is not configured.' });
    }

    let liveUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://autotubeos.vercel.app';
    if (process.env.VERCEL_URL) {
      liveUrl = `https://${process.env.VERCEL_URL}`;
    }
    const finalRedirectUrl = redirectUrl || `${liveUrl}/dashboard`;

    // 5. Create checkout session with LemonSqueezy
    const checkout = await createCheckout(
      storeId,
      variantId.toString(),
      {
        checkoutOptions: {
          embed: true,
          media: true,
          logo: true,
          dark: true,
        },
        checkoutData: {
          email,
          custom: {
            user_id: userId,
          },
        },
        productOptions: {
          redirectUrl: finalRedirectUrl,
        },
      }
    );

    if (checkout.error) {
      console.error('LemonSqueezy createCheckout API error:', checkout.error);
      return res.status(500).json({ error: checkout.error.message });
    }

    const checkoutUrl = checkout.data?.data?.attributes?.url;

    if (!checkoutUrl) {
      return res.status(500).json({ error: 'Failed to generate checkout URL.' });
    }

    return res.status(200).json({ checkoutUrl });
  } catch (err: any) {
    console.error('Checkout creation endpoint encountered an error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}

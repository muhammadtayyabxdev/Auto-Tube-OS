import { createCheckout, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Ensure LemonSqueezy is initialized with the API key
const apiKey = process.env.LEMONSQUEEZY_API_KEY;
if (apiKey) {
  lemonSqueezySetup({ apiKey });
} else {
  console.warn('LEMONSQUEEZY_API_KEY is not set in environment variables.');
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user using Clerk
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Authentication required. Please sign in.' }, { status: 401 });
    }

    // 2. Fetch user's email using Clerk client
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: 'No email address found for this user.' }, { status: 400 });
    }

    // 3. Parse and validate the request body
    const { plan, billingCycle, redirectUrl } = await request.json();

    if (!plan || (plan !== 'pro' && plan !== 'agency')) {
      return NextResponse.json({ error: "Invalid plan. Must be 'pro' or 'agency'." }, { status: 400 });
    }

    // 4. Map the requested plan to the correct variant ID
    // Let's allow fallback to variantId directly in body, otherwise map from env
    let variantId = '';
    if (plan === 'pro') {
      variantId = process.env.LEMONSQUEEZY_PRO_VARIANT_ID || '';
    } else if (plan === 'agency') {
      variantId = process.env.LEMONSQUEEZY_AGENCY_VARIANT_ID || '';
    }

    if (!variantId) {
      return NextResponse.json({ 
        error: `Variant ID for plan '${plan}' is not configured in env variables.` 
      }, { status: 500 });
    }

    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    if (!storeId) {
      return NextResponse.json({ error: 'LemonSqueezy Store ID is not configured.' }, { status: 500 });
    }

    const liveUrl = process.env.NEXT_PUBLIC_RENDER_URL || 'https://auto-tube-os.onrender.com';
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
      return NextResponse.json({ error: checkout.error.message }, { status: 500 });
    }

    const checkoutUrl = checkout.data?.data?.attributes?.url;

    if (!checkoutUrl) {
      return NextResponse.json({ error: 'Failed to generate checkout URL.' }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl });
  } catch (err: any) {
    console.error('Checkout creation endpoint encountered an error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

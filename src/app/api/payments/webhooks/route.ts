import { createClient } from '@supabase/supabase-js';
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

// Setup Supabase admin client with service role key to bypass database RLS during updates
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const getSupabaseAdmin = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase admin environment variables (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are not set.');
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

// Helper mock function to log sending invoice emails
function sendInvoiceEmail(email: string, invoiceUrl: string, amount: string) {
  console.log(`
=========================================
[BILLING INVOICE EMAIL SENT]
To: ${email}
Amount: ${amount}
Invoice URL: ${invoiceUrl}
Status: Success
=========================================
  `);
}

export async function POST(request: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    console.error('LEMONSQUEEZY_WEBHOOK_SECRET is not configured.');
    return NextResponse.json({ error: 'Webhook secret is not configured on server.' }, { status: 500 });
  }

  try {
    // 1. Get raw request body and signature header
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing x-signature header' }, { status: 400 });
    }

    // 2. Validate webhook signature using timingSafeEqual
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (
      digest.length !== signatureBuffer.length ||
      !crypto.timingSafeEqual(digest, signatureBuffer)
    ) {
      console.warn('Received webhook request with invalid signature.');
      return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
    }

    // 3. Parse and process payload
    const event = JSON.parse(rawBody);
    const eventName = event?.meta?.event_name;
    const customData = event?.meta?.custom_data;
    const userId = customData?.user_id;

    if (!eventName) {
      return NextResponse.json({ error: 'Missing event name in payload.' }, { status: 400 });
    }

    // Acknowledge events without user_id immediately to prevent LemonSqueezy retries
    if (!userId) {
      console.log(`Webhook received event "${eventName}" without custom_data.user_id. Ignoring.`);
      return NextResponse.json({ success: true, message: 'Event ignored: No user_id provided.' });
    }

    console.log(`Processing LemonSqueezy event: "${eventName}" for User: "${userId}"`);

    const supabase = getSupabaseAdmin();
    const clerk = await clerkClient();

    // Map variant ID to plan name
    const variantId = event.data?.attributes?.variant_id?.toString();
    const subscriptionId = event.data?.id?.toString();
    const status = event.data?.attributes?.status;
    const currentPeriodEnd = event.data?.attributes?.renews_at || event.data?.attributes?.ends_at;

    let plan = 'free';
    const proVariantId = process.env.LEMONSQUEEZY_PRO_VARIANT_ID?.toString();
    const agencyVariantId = process.env.LEMONSQUEEZY_AGENCY_VARIANT_ID?.toString();

    if (variantId === proVariantId) {
      plan = 'pro';
    } else if (variantId === agencyVariantId) {
      plan = 'agency';
    }

    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated': {
        console.log(`Syncing plan "${plan}" (status: ${status}) for user ${userId} to Supabase and Clerk.`);

        // Upsert subscription state in Supabase
        const { error: dbError } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            plan,
            variant_id: variantId,
            subscription_id: subscriptionId,
            status,
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

        if (dbError) {
          console.error('Supabase subscription upsert failed:', dbError);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }

        // Deep merge metadata in Clerk
        await clerk.users.updateUserMetadata(userId, {
          publicMetadata: {
            plan,
          },
        });

        console.log(`Successfully completed metadata and database sync for ${userId}.`);
        break;
      }

      case 'subscription_cancelled': {
        console.log(`Subscription ${subscriptionId} cancelled by user ${userId}. Access maintained until period end: ${currentPeriodEnd}`);

        // Update database record status to 'cancelled' (we preserve user plan access until period end)
        const { error: dbError } = await supabase
          .from('subscriptions')
          .update({
            status: 'cancelled',
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (dbError) {
          console.error('Supabase subscription cancellation update failed:', dbError);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }

        // Note: We DO NOT immediately downgrade Clerk publicMetadata plan here.
        // We let them maintain Pro/Agency privileges during their grace period.
        // The downgrade will be handled by the 'subscription_expired' webhook event below.
        break;
      }

      case 'subscription_expired': {
        console.log(`Subscription ${subscriptionId} expired for user ${userId}. Downgrading to free plan.`);

        // Update database subscription status to 'expired' and plan to 'free'
        const { error: dbError } = await supabase
          .from('subscriptions')
          .update({
            plan: 'free',
            status: 'expired',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (dbError) {
          console.error('Supabase subscription expiration downgrade failed:', dbError);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }

        // Update Clerk publicMetadata to 'free'
        await clerk.users.updateUserMetadata(userId, {
          publicMetadata: {
            plan: 'free',
          },
        });

        console.log(`Successfully completed expiration downgrade for ${userId}.`);
        break;
      }

      case 'subscription_payment_success': {
        const billingEmail = event.data?.attributes?.user_email || '';
        const invoiceUrl = event.data?.attributes?.urls?.invoice_url || '';
        const totalAmount = event.data?.attributes?.total_formatted || '$0.00';

        console.log(`Subscription payment success webhook received for ${billingEmail}.`);

        if (billingEmail && invoiceUrl) {
          sendInvoiceEmail(billingEmail, invoiceUrl, totalAmount);
        }
        break;
      }

      default:
        console.log(`Received unhandled event name "${eventName}". Acknowledging event.`);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Webhook endpoint encountered an unhandled error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

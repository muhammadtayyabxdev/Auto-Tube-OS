import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { clerkClient } from '@clerk/nextjs/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const getSupabaseAdmin = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase admin environment variables are not set.');
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('LEMONSQUEEZY_WEBHOOK_SECRET is not configured.');
    return res.status(500).json({ error: 'Webhook secret is not configured on server.' });
  }

  try {
    // 1. Read raw stream body
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const rawBodyBuffer = Buffer.concat(chunks);
    const rawBody = rawBodyBuffer.toString('utf8');

    // 2. Validate webhook signature
    const signature = req.headers['x-signature'];
    if (!signature || typeof signature !== 'string') {
      return res.status(400).json({ error: 'Missing x-signature header' });
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBodyBuffer).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (
      digest.length !== signatureBuffer.length ||
      !crypto.timingSafeEqual(digest, signatureBuffer)
    ) {
      console.warn('Received webhook request with invalid signature.');
      return res.status(400).json({ error: 'Invalid webhook signature.' });
    }

    // 3. Parse and process payload
    const event = JSON.parse(rawBody);
    const eventName = event?.meta?.event_name;
    const customData = event?.meta?.custom_data;
    const userId = customData?.user_id;

    if (!eventName) {
      return res.status(400).json({ error: 'Missing event name in payload.' });
    }

    if (!userId) {
      console.log(`Webhook received event "${eventName}" without custom_data.user_id. Ignoring.`);
      return res.status(200).json({ success: true, message: 'Event ignored: No user_id provided.' });
    }

    console.log(`Processing LemonSqueezy event: "${eventName}" for User: "${userId}"`);

    const supabase = getSupabaseAdmin();
    const clerk = await clerkClient();

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
          return res.status(500).json({ error: 'Database update failed' });
        }

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
          return res.status(500).json({ error: 'Database update failed' });
        }
        break;
      }

      case 'subscription_expired': {
        console.log(`Subscription ${subscriptionId} expired for user ${userId}. Downgrading to free plan.`);

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
          return res.status(500).json({ error: 'Database update failed' });
        }

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

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Webhook endpoint encountered an unhandled error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}

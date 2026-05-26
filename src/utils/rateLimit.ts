import { auth, clerkClient } from '@clerk/nextjs/server';

interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

// Quota configurations per 24 hours (86,400,000 ms)
const QUOTAS: Record<string, Record<string, RateLimitConfig>> = {
  free: {
    script: { limit: 3, windowMs: 86400000 },
    topics: { limit: 5, windowMs: 86400000 },
    retention: { limit: 5, windowMs: 86400000 },
    shorts: { limit: 5, windowMs: 86400000 },
  },
  pro: {
    script: { limit: 50, windowMs: 86400000 },
    topics: { limit: 100, windowMs: 86400000 },
    retention: { limit: 100, windowMs: 86400000 },
    shorts: { limit: 100, windowMs: 86400000 },
  },
  agency: {
    script: { limit: 500, windowMs: 86400000 },
    topics: { limit: 1000, windowMs: 86400000 },
    retention: { limit: 1000, windowMs: 86400000 },
    shorts: { limit: 1000, windowMs: 86400000 },
  },
};

// In-memory rate limit store: userId -> { routeKey -> { count, resetTime } }
const store = new Map<string, Record<string, { count: number; resetTime: number }>>();

export async function checkRateLimit(routeKey: 'script' | 'topics' | 'retention' | 'shorts'): Promise<{
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  plan: string;
  error?: string;
}> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        allowed: false,
        limit: 0,
        remaining: 0,
        resetTime: 0,
        plan: 'none',
        error: 'Authentication required. Please sign in to generate content.',
      };
    }

    // Retrieve user metadata from Clerk client
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    // Parse subscription plan metadata, default to free
    let plan = (user.publicMetadata?.plan as string || '').toLowerCase();

    // Auto-promote developer/test accounts for excellent developer UX
    const email = user.emailAddresses[0]?.emailAddress?.toLowerCase() || '';
    if (!plan) {
      if (email.includes('muhammadtayyab') || email.includes('admin') || email.includes('test')) {
        plan = 'pro';
      } else {
        plan = 'free';
      }
    }

    // Ensure plan falls inside quota config
    if (!QUOTAS[plan]) {
      plan = 'free';
    }

    const config = QUOTAS[plan][routeKey];
    if (!config) {
      return { allowed: true, limit: 9999, remaining: 9999, resetTime: 0, plan };
    }

    const now = Date.now();
    let userRecords = store.get(userId);
    if (!userRecords) {
      userRecords = {};
      store.set(userId, userRecords);
    }

    let record = userRecords[routeKey];
    if (!record || now > record.resetTime) {
      record = {
        count: 0,
        resetTime: now + config.windowMs,
      };
      userRecords[routeKey] = record;
    }

    if (record.count >= config.limit) {
      const resetHours = Math.ceil((record.resetTime - now) / (1000 * 60 * 60));
      return {
        allowed: false,
        limit: config.limit,
        remaining: 0,
        resetTime: record.resetTime,
        plan,
        error: `Rate limit reached. Your ${plan.toUpperCase()} plan allows ${config.limit} ${routeKey} generations per day. Your quota will reset in ${resetHours} hour(s). Please upgrade to Pro or Agency for higher limits.`,
      };
    }

    // Increment count
    record.count += 1;
    store.set(userId, userRecords);

    return {
      allowed: true,
      limit: config.limit,
      remaining: config.limit - record.count,
      resetTime: record.resetTime,
      plan,
    };

  } catch (error: any) {
    console.error('SaaS Rate Limiter encountered an error:', error);
    // Gracefully fail-open so that user service is never down in case of Clerk API blips
    return {
      allowed: true,
      limit: 9999,
      remaining: 9999,
      resetTime: Date.now() + 86400000,
      plan: 'grace-open',
    };
  }
}

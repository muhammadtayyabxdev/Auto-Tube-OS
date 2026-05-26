import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { createClient as createSupabaseClient } from './utils/supabase/middleware';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/affiliate-dashboard(.*)',
  '/emails(.*)',
  '/notifications(.*)',
  '/onboarding(.*)',
  '/script-generator(.*)',
  '/settings(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // 1. Clerk authentication protection for protected routes
  if (isProtectedRoute(req)) await auth.protect();

  // 2. Refresh Supabase session cookies
  return createSupabaseClient(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[\\w]+$|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

import { useAuth as useClerkAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * Hook to enforce authentication status on client-side Next.js pages, bridged with Clerk.
 * @param requireAuth - If true, redirects logged-out users to `/auth`. If false, redirects logged-in users to `/dashboard`.
 */
export function useAuth(requireAuth = true) {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useClerkAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !isLoaded) return;

    if (requireAuth && !isSignedIn) {
      // Guarded page accessed while logged out: redirect to auth
      const currentPath = router.asPath;
      router.replace(`/auth?redirect=${encodeURIComponent(currentPath)}`);
    } else if (!requireAuth && isSignedIn) {
      // Auth page accessed while logged in: redirect to dashboard or redirect target
      const dest = (router.query.redirect as string) || '/dashboard';
      router.replace(dest);
    } else {
      // Authenticated or allowed public view: finish loading
      setLoading(false);
    }
  }, [router, isLoaded, isSignedIn, requireAuth]);

  return { loading: !isLoaded || loading, isLoggedIn: !!isSignedIn };
}


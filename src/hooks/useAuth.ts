import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * Hook to enforce authentication status on client-side Next.js pages.
 * @param requireAuth - If true, redirects logged-out users to `/auth`. If false, redirects logged-in users to `/dashboard`.
 */
export function useAuth(requireAuth = true) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);

      if (requireAuth && !loggedIn) {
        // Guarded page accessed while logged out: redirect to auth
        const currentPath = router.asPath;
        router.replace(`/auth?redirect=${encodeURIComponent(currentPath)}`);
      } else if (!requireAuth && loggedIn) {
        // Auth page accessed while logged in: redirect to dashboard/previous target
        const dest = (router.query.redirect as string) || '/dashboard';
        router.replace(dest);
      } else {
        // Authenticated or allowed public view: finish loading
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, requireAuth]);

  return { loading, isLoggedIn };
}

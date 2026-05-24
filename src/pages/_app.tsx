import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [opacity, setOpacity] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleStart = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpacity(0);
    };

    const handleDone = () => {
      // Small delay so the new page is painted before fading in
      timerRef.current = setTimeout(() => setOpacity(1), 20);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleDone);
    router.events.on('routeChangeError', handleDone);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleDone);
      router.events.off('routeChangeError', handleDone);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>AutoTube OS — The Operating System for Faceless YouTube Creators</title>
        <meta name="description" content="Run your entire YouTube automation workflow from one AI-powered workspace. Replaces ChatGPT, Canva, Notion, and TubeBuddy." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          opacity,
          transition: 'opacity 180ms ease',
          willChange: 'opacity',
          minHeight: '100vh',
        }}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}

import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AutoTube OS — The Operating System for Faceless YouTube Creators</title>
        <meta name="description" content="Run your entire YouTube automation workflow from one AI-powered workspace. Replaces ChatGPT, Canva, Notion, and TubeBuddy." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

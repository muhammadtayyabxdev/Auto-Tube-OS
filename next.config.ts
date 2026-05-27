import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Only proxy API calls in local development to utilize live Vercel keys
    if (process.env.NODE_ENV === 'development') {
      const vercelUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://autotubeos.vercel.app';
      return [
        {
          source: '/api/ai/:path*',
          destination: `${vercelUrl}/api/ai/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;

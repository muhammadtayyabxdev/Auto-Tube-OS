import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Only proxy API calls in local development to utilize live Render keys
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/ai/:path*',
          destination: 'https://auto-tube-os.onrender.com/api/ai/:path*',
        },
      ];
    }
    return [];
  },
};

export default nextConfig;

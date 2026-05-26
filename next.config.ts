import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Only proxy API calls in local development to utilize live Render keys
    if (process.env.NODE_ENV === 'development') {
      const renderUrl = process.env.NEXT_PUBLIC_RENDER_URL || 'https://auto-tube-os.onrender.com';
      return [
        {
          source: '/api/ai/:path*',
          destination: `${renderUrl}/api/ai/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;

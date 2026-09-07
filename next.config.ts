import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async redirects() {
    return [
      { source: "/create", destination: "/boards?create=1", permanent: false },
      { source: "/capture", destination: "/studio?record=1", permanent: false },
    ];
  },
};

export default nextConfig;

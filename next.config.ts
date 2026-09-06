import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/discover", destination: "/", permanent: false },
      { source: "/discover/:path*", destination: "/", permanent: false },
      { source: "/boards", destination: "/", permanent: false },
      { source: "/boards/:path*", destination: "/", permanent: false },
      { source: "/albums", destination: "/", permanent: false },
      { source: "/albums/:path*", destination: "/", permanent: false },
      { source: "/choreography", destination: "/", permanent: false },
      { source: "/choreography/:path*", destination: "/", permanent: false },
      { source: "/studio", destination: "/", permanent: false },
      { source: "/studio/:path*", destination: "/", permanent: false },
      { source: "/create", destination: "/signup", permanent: false },
      { source: "/capture", destination: "/signup", permanent: false },
      { source: "/notifications", destination: "/", permanent: false },
      { source: "/profile", destination: "/", permanent: false },
      { source: "/settings", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;

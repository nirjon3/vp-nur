import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/", destination: "/bn", permanent: false },
      { source: "/:locale/news/:path*", destination: "/:locale/events", permanent: false },
      { source: "/:locale/news", destination: "/:locale/events", permanent: false },
      { source: "/news", destination: "/bn/events", permanent: false },
      { source: "/:locale/publications/:path*", destination: "/:locale", permanent: false },
      { source: "/:locale/publications", destination: "/:locale", permanent: false },
      { source: "/publications", destination: "/bn", permanent: false },
      { source: "/:locale/constituency/:path*", destination: "/:locale", permanent: false },
      { source: "/:locale/constituency", destination: "/:locale", permanent: false },
      { source: "/constituency", destination: "/bn", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);

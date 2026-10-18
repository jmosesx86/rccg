import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // 45 is used for photos behind dark overlays (page headers, hero).
    qualities: [45, 75],
    // Sermon thumbnails from the church's YouTube channel.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/donate", destination: "/give", permanent: true },
      { source: "/ministries/childrens", destination: "/ministries/children", permanent: true },
      { source: "/sermons/details", destination: "/sermons", permanent: true },
      { source: "/events/details", destination: "/events", permanent: true },
      { source: "/blog/post", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

// Dev only: extra hosts allowed to load the dev server (e.g. your phone or LAN IP).
// Set DEV_ORIGINS="172.16.31.21,192.168.1.20" in .env.local. Ignored in production.
const devOrigins = (process.env.DEV_ORIGINS ?? "").split(",").map((o) => o.trim()).filter(Boolean);

const nextConfig: NextConfig = {
  allowedDevOrigins: devOrigins,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

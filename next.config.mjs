import { securityHeaders } from "./lib/security-headers.mjs";
import { permanentRedirects } from "./lib/redirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    // The image optimizer is reachable even when no page uses next/image.
    // Keep it closed to remote hosts and to SVG, which were the RCE paths.
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
    formats: ["image/webp"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100kb",
    },
  },
  async redirects() {
    return permanentRedirects;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders(),
      },
    ];
  },
};

export default nextConfig;

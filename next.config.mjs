import { securityHeaders } from "./lib/security-headers.mjs";
import { siteRedirects } from "./lib/redirects.mjs";

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
      // No server actions are defined. Cap the body if one is added later.
      bodySizeLimit: "100kb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders(),
      },
    ];
  },
  async redirects() {
    return siteRedirects();
  },
};

export default nextConfig;

import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  // All optimized images are trusted local assets under /public; there is no
  // user upload or remote image path, so no `images.remotePatterns` allowlist
  // is configured. This keeps the advisory-affected sharp code (SEC-002,
  // GHSA-f88m-g3jw-g9cj) off any untrusted input. Revisit remote image config —
  // and re-audit sharp reachability — only if remote/user-supplied images are
  // added, or when a supported Next release ships sharp >= 0.35.
  // Consistent canonical URLs — no trailing slash
  trailingSlash: false,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: "default-src 'self'; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; connect-src 'self' https://vitals.vercel-insights.com; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
      ],
    }];
  },
};
export default nextConfig;

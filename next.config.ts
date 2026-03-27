import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
  // Turbopack is the default dev bundler in Next.js 16 — no flag needed.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "omahatreecare.com" },
      { protocol: "https", hostname: "midwestroots.info" },
    ],
  },
  // Consistent canonical URLs — no trailing slash
  trailingSlash: false,
};

// Serwist wraps the config to inject the service-worker plugin.
// Skip in dev so the SW doesn't interfere with Turbopack HMR.
const withSerwistConfig = async (
  phase: string,
  config: NextConfig
): Promise<NextConfig> => {
  if (phase === PHASE_DEVELOPMENT_SERVER) return config;

  const { default: withSerwist } = await import("@serwist/next");
  return withSerwist({
    swSrc: "src/sw.ts",
    swDest: "public/sw.js",
    reloadOnOnline: true,
  })(config);
};

export default async function config(phase: string) {
  return withSerwistConfig(phase, nextConfig);
}

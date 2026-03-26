import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, NetworkFirst, Serwist, StaleWhileRevalidate } from "serwist";

// Workaround: Serwist requires this declaration to be in scope.
declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // ── Tool pages: CacheFirst (core offline use case) ──────────────────
    {
      matcher: ({ url }) =>
        url.pathname === "/tools" || url.pathname.startsWith("/tools/"),
      handler: new CacheFirst({
        cacheName: "tools-pages",
        plugins: [],
      }),
    },
    // ── Tool data files: CacheFirst ─────────────────────────────────────
    {
      matcher: ({ url }) => url.pathname.startsWith("/_next/static/"),
      handler: new CacheFirst({
        cacheName: "next-static",
        plugins: [],
      }),
    },
    // ── Homepage + location pages: NetworkFirst w/ cache fallback ───────
    {
      matcher: ({ url }) =>
        url.pathname === "/" || url.pathname.startsWith("/locations/"),
      handler: new NetworkFirst({
        cacheName: "pages-network-first",
        plugins: [],
      }),
    },
    // ── Everything else: StaleWhileRevalidate ────────────────────────────
    {
      matcher: () => true,
      handler: new StaleWhileRevalidate({
        cacheName: "catch-all",
        plugins: [],
      }),
    },
  ],
});

serwist.addEventListeners();

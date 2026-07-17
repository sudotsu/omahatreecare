import { beforeEach, describe, expect, it, vi } from "vitest";

type Matcher = (arg: { url: URL }) => boolean;

interface RuntimeCachingEntry {
  matcher: Matcher;
  handler: { cacheName: string };
}

interface CapturedConfig {
  skipWaiting: boolean;
  clientsClaim: boolean;
  navigationPreload: boolean;
  runtimeCaching: RuntimeCachingEntry[];
}

let captured: CapturedConfig | null = null;

vi.mock("serwist", () => {
  class MockHandler {
    cacheName: string;
    constructor(config: { cacheName: string }) {
      this.cacheName = config.cacheName;
    }
  }

  return {
    Serwist: vi.fn().mockImplementation((config: CapturedConfig) => {
      captured = config;
      return { addEventListeners: vi.fn() };
    }),
    CacheFirst: MockHandler,
    NetworkFirst: MockHandler,
    StaleWhileRevalidate: MockHandler,
  };
});

function matcherFor(cacheName: string): Matcher {
  const entry = captured?.runtimeCaching.find((r) => r.handler.cacheName === cacheName);
  if (!entry) throw new Error(`No runtimeCaching entry found for cacheName "${cacheName}"`);
  return entry.matcher;
}

describe("src/sw.ts runtime caching configuration", () => {
  beforeEach(async () => {
    captured = null;
    vi.resetModules();
    await import("../sw");
  });

  it("constructs Serwist with the expected top-level options", () => {
    expect(captured).toMatchObject({
      skipWaiting: true,
      clientsClaim: true,
      navigationPreload: true,
    });
  });

  it("matches /field-estimate with the tools-pages CacheFirst handler", () => {
    const matcher = matcherFor("tools-pages");
    expect(matcher({ url: new URL("https://example.com/field-estimate") })).toBe(true);
  });

  it("still matches /tools and /tools/* paths with the tools-pages handler", () => {
    const matcher = matcherFor("tools-pages");
    expect(matcher({ url: new URL("https://example.com/tools") })).toBe(true);
    expect(matcher({ url: new URL("https://example.com/tools/hazard") })).toBe(true);
  });

  it("does not match unrelated or merely similar paths with the tools-pages handler", () => {
    const matcher = matcherFor("tools-pages");
    expect(matcher({ url: new URL("https://example.com/field-estimates") })).toBe(false);
    expect(matcher({ url: new URL("https://example.com/field-estimate/extra") })).toBe(false);
    expect(matcher({ url: new URL("https://example.com/contact") })).toBe(false);
  });

  it("routes /_next/static/ assets through the next-static CacheFirst handler", () => {
    const matcher = matcherFor("next-static");
    expect(matcher({ url: new URL("https://example.com/_next/static/chunk.js") })).toBe(true);
    expect(matcher({ url: new URL("https://example.com/field-estimate") })).toBe(false);
  });

  it("routes the homepage and /locations/ pages through NetworkFirst", () => {
    const matcher = matcherFor("pages-network-first");
    expect(matcher({ url: new URL("https://example.com/") })).toBe(true);
    expect(matcher({ url: new URL("https://example.com/locations/omaha") })).toBe(true);
    expect(matcher({ url: new URL("https://example.com/field-estimate") })).toBe(false);
  });

  it("falls back to the StaleWhileRevalidate catch-all handler for any other path", () => {
    const matcher = matcherFor("catch-all");
    expect(matcher({ url: new URL("https://example.com/anything/at/all") })).toBe(true);
  });
});
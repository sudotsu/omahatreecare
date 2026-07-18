"use client";

import { useEffect } from "react";

const CLEANUP_VERSION_KEY = "midwest-roots:pwa-cleanup:v1";
const RETIRED_CACHE_NAMES = new Set(["field-estimate-page", "tools-pages", "next-static", "pages-network-first", "catch-all"]);

function isRetiredWorker(registration: ServiceWorkerRegistration) {
  return [registration.installing, registration.waiting, registration.active]
    .some((worker) => worker && new URL(worker.scriptURL).pathname === "/sw.js");
}

function isRetiredCache(name: string) {
  return RETIRED_CACHE_NAMES.has(name) || name.startsWith("serwist-precache");
}

/** One-release cleanup for clients previously controlled by the retired PWA. */
export function ServiceWorkerCleanup() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    try {
      if (localStorage.getItem(CLEANUP_VERSION_KEY) === "complete") return;
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }

    const workers = navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.filter(isRetiredWorker).map((registration) => registration.unregister())))
      .then(() => true)
      .catch(() => false);
    const cacheEntries = "caches" in window
      ? caches.keys()
          .then((keys) => Promise.all(keys.filter(isRetiredCache).map((key) => caches.delete(key))))
          .then(() => true)
          .catch(() => false)
      : Promise.resolve(true);

    void Promise.all([workers, cacheEntries]).then((results) => {
      if (!results.every(Boolean)) return;
      try { localStorage.setItem(CLEANUP_VERSION_KEY, "complete"); } catch { /* retry next mount */ }
    }).catch(() => undefined);
  }, []);
  return null;
}

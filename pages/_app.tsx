import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { Footer, Header, StickyMobileCTA } from "../src/components";
import "../src/index.css";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Next.js App Component
 * Adapted from src/main.jsx.backup (Vite React SSG setup)
 *
 * Key migrations:
 * - Vercel Analytics: @vercel/analytics/react (same as Vite)
 * - Speed Insights: @vercel/speed-insights/next (Next.js specific)
 * - Global styles: imported from src/index.css
 * - Dark mode script: moved to _document.tsx
 * - Site chrome: Header, Footer, StickyMobileCTA
 */

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-KX63X3X4";
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const shouldLoadGaDirectly = Boolean(gaMeasurementId) && !Boolean(process.env.NEXT_PUBLIC_GTM_ID);

  useEffect(() => {
    if (!gaMeasurementId) return;

    const handleRouteChange = (url: string) => {
      if (typeof window === "undefined") return;
      if (typeof window.gtag !== "function") return;
      window.gtag("config", gaMeasurementId, { page_path: url });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, gaMeasurementId]);

  useEffect(() => {
    if (!gtmId) return;

    const handleRouteChange = (url: string) => {
      if (typeof window === "undefined") return;
      if (!Array.isArray(window.dataLayer)) return;
      window.dataLayer.push({ event: "pageview", page: url });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, gtmId]);

  // Pages that should not have chrome (special layouts)
  const noChrome = ["/design-system"];
  const shouldShowChrome = !noChrome.includes(router.pathname);

  return (
    <>
      <Head>
        {/* Default meta tags - can be overridden per page */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      {gtmId ? (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}

      {shouldLoadGaDirectly ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', { page_path: window.location.pathname });`}
          </Script>
        </>
      ) : null}

      {shouldShowChrome && <Header />}

      {/* Main content with top padding for fixed header */}
      <main className={shouldShowChrome ? "pt-20" : ""}>
        <Component {...pageProps} />
      </main>

      {shouldShowChrome && <Footer />}
      {shouldShowChrome && <StickyMobileCTA />}

      {/* Vercel Analytics - same as Vite setup */}
      <Analytics />

      {/* Speed Insights - Next.js specific package */}
      <SpeedInsights />
    </>
  );
}

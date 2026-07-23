import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CONTACT, SERVICE_AREAS } from "@/lib/constants";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ServiceWorkerCleanup } from "@/components/ServiceWorkerCleanup";

// Vercel Analytics and Speed Insights fetch scripts from Vercel-only endpoints
// (/_vercel/*). Outside a Vercel deployment those requests 404 and spam the
// console, masking real regressions (OBS-001). Vercel sets VERCEL=1 in its
// build/runtime environment, so only mount them there.
const onVercel = process.env.VERCEL === "1";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#52796f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(CONTACT.siteUrl),
  title: {
    default: "Midwest Roots Tree Services | Omaha Tree Care",
    template: "%s | Midwest Roots Tree Services",
  },
  description:
    "Midwest Roots Tree Services provides local tree-service estimates and homeowner screening tools for Omaha and nearby communities.",
  keywords: [
    "tree service omaha",
    "tree removal omaha",
    "midwest roots tree services",
    "emerald ash borer omaha",
    "tree trimming omaha",
  ],
  authors: [{ name: CONTACT.businessName }],
  creator: CONTACT.businessName,
  publisher: CONTACT.businessName,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CONTACT.siteUrl,
    siteName: CONTACT.businessName,
    title: "Midwest Roots Tree Services | Omaha Tree Care",
    description:
      "Local tree service and preliminary homeowner screening tools for Omaha-area properties.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Midwest Roots Tree Services — Omaha Tree Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Midwest Roots Tree Services | Omaha Tree Care",
    description:
      "Local tree service, planning guidance, and homeowner screening tools for Omaha-area properties.",
    images: ["/images/og-image.jpg"],
    site: "@omahatree",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png" }],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  name: CONTACT.businessName,
  url: CONTACT.siteUrl,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  image: `${CONTACT.siteUrl}/images/og-image.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.streetAddress,
    addressLocality: CONTACT.addressLocality,
    addressRegion: CONTACT.addressRegion,
    postalCode: CONTACT.postalCode,
    addressCountry: CONTACT.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CONTACT.latitude,
    longitude: CONTACT.longitude,
  },
  areaServed: SERVICE_AREAS.map((area) => ({
    "@type": area.type === "City" ? "City" : "Place",
    name: area.name,
    ...(area.sameAs && { sameAs: area.sameAs }),
  })),
  sameAs: [...CONTACT.socialProfiles],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="flex min-h-screen flex-col bg-[#f8f6f1] text-[#3d3027] antialiased">
        <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded bg-white px-4 py-2 font-bold text-forest shadow focus:translate-y-0">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
        {onVercel && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}
        <ServiceWorkerCleanup />
      </body>
    </html>
  );
}

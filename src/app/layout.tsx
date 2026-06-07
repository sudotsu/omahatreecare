import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { CONTACT, SERVICE_AREAS } from "@/lib/constants";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

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
    default: "Midwest Roots Tree Services | Omaha's Certified Arborist",
    template: "%s | Midwest Roots Tree Services",
  },
  description:
    "Midwest Roots Tree Services — certified arborist serving Omaha, Millard, Elkhorn, Papillion, Bellevue, and surrounding areas. Free tree assessments, expert removal, pruning, and health diagnostics.",
  keywords: [
    "tree service omaha",
    "tree removal omaha",
    "certified arborist omaha",
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
    title: "Midwest Roots Tree Services | Omaha's Certified Arborist",
    description:
      "Expert tree care for Omaha homeowners. Free diagnostic tools, hazard assessments, and professional service from a certified arborist.",
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
    title: "Midwest Roots Tree Services | Omaha's Certified Arborist",
    description:
      "Expert tree care for Omaha homeowners. Free assessments, professional removal, pruning, and diagnostics.",
    images: ["/images/og-image.jpg"],
    site: "@omahatree",
  },
  manifest: "/manifest.json",
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
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "07:00",
    closes: "21:00",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#f8f6f1] text-[#3d3027] antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

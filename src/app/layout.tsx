import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { CONTACT } from "@/lib/constants";

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
    default: "Omaha Tree Care | Free Tree Diagnostic Tools",
    template: "%s | Omaha Tree Care",
  },
  description:
    "Free tree health diagnostic tools and expert care resources for Omaha homeowners. Hazard assessment, species ID, cost estimator, and more.",
  keywords: [
    "tree care omaha",
    "tree removal omaha",
    "tree trimming omaha",
    "tree health assessment",
    "emerald ash borer omaha",
    "winter tree prep omaha",
  ],
  authors: [{ name: CONTACT.businessName }],
  creator: CONTACT.businessName,
  publisher: CONTACT.businessName,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CONTACT.siteUrl,
    siteName: "Omaha Tree Care",
    title: "Omaha Tree Care | Free Tree Diagnostic Tools",
    description:
      "Free tree health diagnostic tools and expert care resources for Omaha homeowners.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Omaha Tree Care — Free Diagnostic Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omaha Tree Care | Free Tree Diagnostic Tools",
    description:
      "Free tree health diagnostic tools and expert care resources for Omaha homeowners.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="flex min-h-screen flex-col bg-[#f8f6f1] text-[#3d3027] antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

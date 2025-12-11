
// src/components/tool/ToolSEO.jsx
// Drop-in SEO + JSON-LD for omahatreecare.com/tools
import React from "react";
import { Helmet } from "react-helmet-async";
import { CONTACT, SERVICE_AREAS } from "../../constants";

/**
 * parseRange("$400 - $3,500+") -> { low: 400, high: 3500, hasPlus: true }
 */
function parseRange(str) {
  if (!str) return null;
  const nums = (str.match(/[\d,]+/g) || []).map(s => Number(s.replace(/,/g, "")));
  if (!nums.length) return null;
  const low = nums[0];
  const high = nums.length > 1 ? nums[1] : nums[0];
  const hasPlus = /\+/.test(str);
  return { low, high, hasPlus };
}

/**
 * Build OfferCatalog JSON-LD from `services` [{ name, description, priceRange, typical }]
 */
function buildOfferCatalogLD(services) {
  const items = services.map(s => {
    const pr = parseRange(s.priceRange);
    const aggregateOffer = pr
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: pr.low,
          highPrice: pr.high
        }
      : undefined;

    return {
      "@type": "Offer",
      url: `${CONTACT.siteUrl}/services`,
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description
      },
      ...(aggregateOffer ? { aggregateOffer } : {})
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Tree Services & Price Ranges",
    url: `${CONTACT.siteUrl}/tools`,
    itemListElement: items
  };
}

function buildLocalBusinessLD(offerCatalog) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: CONTACT.businessName,
    url: CONTACT.siteUrl,
    telephone: CONTACT.phoneRaw || CONTACT.phone,
    email: CONTACT.email,
    image: [`${CONTACT.siteUrl}/og-image.jpg`],
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.streetAddress || CONTACT.address,
      addressLocality: CONTACT.addressLocality || "Omaha",
      addressRegion: CONTACT.addressRegion || "NE",
      postalCode: CONTACT.postalCode || "68104",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.latitude || 41.2565,
      longitude: CONTACT.longitude || -95.9345
    },
    // Area served – mapped from SERVICE_AREAS
    areaServed: SERVICE_AREAS.map(p => ({
      "@type": p.type === "City" ? "City" ? "City" : "Place",
      name: p.name,
      geo: { "@type": "GeoCoordinates", latitude: p.latitude, longitude: p.longitude },
      sameAs: p.sameAs
    })),
    hasOfferCatalog: offerCatalog,
    sameAs: CONTACT.socialProfiles || []
  };
}

export default function ToolSEO({ services }) {
  const title = "Tree Service Price Ranges & DIY Diagnostic | Omaha Tree Care";
  const description =
    "Free tree service pricing guide for Omaha and nearby cities. Estimate costs for removal, trimming, stump grinding, and more. Get a free quote today.";

  const offerCatalog = buildOfferCatalogLD(services || []);
  const localBusiness = buildLocalBusinessLD(offerCatalog);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${CONTACT.siteUrl}/`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${CONTACT.siteUrl}/tools`
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${CONTACT.siteUrl}/tools`} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${CONTACT.siteUrl}/tools`} />
      <meta property="og:image" content={`${CONTACT.siteUrl}/og-image.jpg`} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <script type="application/ld+json">{JSON.stringify(offerCatalog)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
    </Helmet>
  );
}

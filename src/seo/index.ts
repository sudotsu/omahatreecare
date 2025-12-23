/**
 * Centralized SEO utilities
 * Single source of truth for all meta tags, canonical URLs, and JSON-LD schema
 */

import { CONTACT, SERVICE_AREAS, SITE_URL } from "../constants";

// ============================================================================
// Types
// ============================================================================

export interface ServiceSEO {
  title: string;
  metaDescription: string;
  canonical: string;
  jsonLd: Record<string, unknown>;
}

export interface LocationSEO {
  title: string;
  metaDescription: string;
  canonical: string;
  jsonLd: Record<string, unknown>;
}

export interface PageSEO {
  title: string;
  metaDescription: string;
  canonical: string;
  jsonLd?: Record<string, unknown>;
}

// ============================================================================
// Helper: Local Business Schema
// ============================================================================

function getLocalBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: CONTACT.businessName,
    telephone: CONTACT.phone,
    email: CONTACT.email,
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "21:00",
    },
    priceRange: "$$",
    sameAs: CONTACT.socialProfiles,
  };
}

// ============================================================================
// Services
// ============================================================================

export function getServiceSEO(service: {
  title: string;
  slug: string;
  meta_desc: string;
}): ServiceSEO {
  const title = `${service.title} | ${CONTACT.businessName}`;
  const canonical = `${SITE_URL}/services/${service.slug}`;

  return {
    title,
    metaDescription: service.meta_desc,
    canonical,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: service.title,
      description: service.meta_desc,
      provider: getLocalBusinessSchema(),
      areaServed: {
        "@type": "City",
        name: "Omaha",
        "@id": "https://en.wikipedia.org/wiki/Omaha,_Nebraska",
      },
    },
  };
}

// ============================================================================
// Locations - City Hub
// ============================================================================

export function getCityHubSEO(
  city: string,
  cityName: string,
  neighborhoods: string[],
): LocationSEO {
  const title = `Tree Service in ${cityName}, NE | ${CONTACT.businessName}`;
  const neighborhoodNames = neighborhoods
    .slice(0, 3)
    .map((n) =>
      n
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    )
    .join(", ");

  const metaDescription = `Top-rated tree removal and trimming in ${cityName}, Nebraska. Serving all neighborhoods including ${neighborhoodNames}. Free estimates: ${CONTACT.phone}.`;
  const canonical = `${SITE_URL}/locations/${city}`;

  return {
    title,
    metaDescription,
    canonical,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Tree Services in ${cityName}`,
      description: metaDescription,
      provider: getLocalBusinessSchema(),
      areaServed: {
        "@type": "City",
        name: cityName,
      },
    },
  };
}

// ============================================================================
// Locations - Neighborhood
// ============================================================================

export function getNeighborhoodSEO(
  city: string,
  cityName: string,
  neighborhood: string,
  neighborhoodName: string,
  data: {
    meta_snippet: string;
    dominant_trees: string;
    geo: { lat: number; lng: number };
  },
): LocationSEO {
  const title = `Tree Service ${neighborhoodName}, ${cityName} NE | ${CONTACT.businessName}`;
  const metaDescription = `Tree service in ${neighborhoodName}: ${data.meta_snippet} We handle ${data.dominant_trees} common in ${cityName}. Call ${CONTACT.phone}`;
  const canonical = `${SITE_URL}/locations/${city}/${neighborhood}`;

  return {
    title,
    metaDescription,
    canonical,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Tree Services in ${neighborhoodName}, ${cityName}`,
      description: metaDescription,
      provider: getLocalBusinessSchema(),
      areaServed: {
        "@type": "Place",
        name: neighborhoodName,
        geo: {
          "@type": "GeoCoordinates",
          latitude: data.geo.lat,
          longitude: data.geo.lng,
        },
      },
    },
  };
}

// ============================================================================
// Special Pages
// ============================================================================

export function getEmergencySEO(): PageSEO {
  const title = "24/7 Emergency Tree Service Omaha | Storm Damage Removal";
  const metaDescription = `Urgent tree removal and storm damage cleanup in Omaha. 24-hour emergency response for hazardous trees. Call ${CONTACT.phone} immediately.`;
  const canonical = `${SITE_URL}/emergency-tree-service-omaha`;

  return {
    title,
    metaDescription,
    canonical,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      name: "Midwest Roots Emergency Tree Service",
      serviceType: "Emergency Tree Removal",
      provider: getLocalBusinessSchema(),
      areaServed: {
        "@type": "City",
        name: "Omaha",
      },
    },
  };
}

export function getConsultationSEO(): PageSEO {
  const title = "Tree Consultation Omaha - Professional Assessment Before DIY | Midwest Roots";
  const metaDescription = `Get a professional tree risk assessment in Omaha before you DIY. Expert advice on safety, pruning vs removal, and storm risks. Call ${CONTACT.phone}.`;
  const canonical = `${SITE_URL}/tree-consultation-omaha`;

  return {
    title,
    metaDescription,
    canonical,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Tree Consultation Service",
      description: metaDescription,
      provider: getLocalBusinessSchema(),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free consultation",
      },
    },
  };
}

export function getToolsSEO(): PageSEO {
  const title = "Tree Health Diagnostic Tool | Midwest Roots";
  const metaDescription =
    "Free AI-powered tree health assessment tool. Check storm risk, identify diseases, and get instant recommendations for your Omaha trees.";
  const canonical = `${SITE_URL}/tools`;

  return {
    title,
    metaDescription,
    canonical,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Tree Health Diagnostic Tool",
      description: metaDescription,
      url: canonical,
      applicationCategory: "UtilityApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };
}

// ============================================================================
// Generic Pages (Locations Index, Services Index, etc.)
// ============================================================================

export function getLocationsIndexSEO(): PageSEO {
  const title = `Service Areas | ${CONTACT.businessName}`;
  const metaDescription = `Professional tree services across Omaha and surrounding areas. We serve Omaha, Millard, Elkhorn, Gretna, Papillion, Bellevue, Bennington, Ralston and more.`;
  const canonical = `${SITE_URL}/locations`;

  return {
    title,
    metaDescription,
    canonical,
  };
}

export function getServicesIndexSEO(): PageSEO {
  const title = `Our Services | ${CONTACT.businessName}`;
  const metaDescription = `Professional tree services in Omaha: removal, trimming, health assessment, and winter prep. Expert care for your trees. Call ${CONTACT.phone}.`;
  const canonical = `${SITE_URL}/services`;

  return {
    title,
    metaDescription,
    canonical,
  };
}

export function getHomeSEO(): PageSEO {
  const title = "Omaha Tree Care | Winter Defense & Tree Removal | Midwest Roots";
  const metaDescription =
    "Free tree diagnostic tools for Omaha homeowners. Assess storm risk, get winter prep estimates, and access expert tree care resources. Serving Dundee, Millard, & Elkhorn.";
  const canonical = SITE_URL;

  return {
    title,
    metaDescription,
    canonical,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: CONTACT.businessName,
      description: "Professional tree care services and free diagnostic tools for Omaha homeowners",
      image: [`${SITE_URL}/images/og-image.jpg`],
      url: SITE_URL,
      telephone: CONTACT.phone,
      email: CONTACT.email,
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "21:00",
      },
      sameAs: CONTACT.socialProfiles,
      areaServed: SERVICE_AREAS.map((area) => ({
        "@type": area.type,
        name: area.name,
        geo: {
          "@type": "GeoCoordinates",
          latitude: area.latitude,
          longitude: area.longitude,
        },
        sameAs: area.sameAs,
      })),
    },
  };
}

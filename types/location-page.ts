/**
 * LocationData Interface
 *
 * Defines the structure for hyper-local neighborhood landing pages.
 * This interface supports:
 * - LocalBusiness Schema (coordinates, zipCodes, areaServed)
 * - Service Schema (services array with availability)
 * - FAQPage Schema (commonProblems transformed in component)
 * - "Resident" persona signals (landmarks, tips, vernacular)
 *
 * Data Strategy:
 * - Keep data simple and human-editable
 * - Transform to complex schema structures in components
 * - Support both "Emergency Distress" and "Routine Research" user states
 */

export interface LocationData {
  /**
   * Core identity and routing information.
   * Essential for URL generation and Schema.org business location data.
   */
  identifiers: {
    /** The human-readable name of the neighborhood (e.g., "Dundee"). */
    neighborhoodName: string;
    /** The city name where the neighborhood is located (e.g., "Omaha"). */
    cityName: string;
    /** The ISO state code (e.g., "NE"). */
    stateCode: string;
    /** URL-safe version of the neighborhood name used for routing. */
    slug: string;
    /** Array of ZIP codes within the neighborhood. Critical for 'areaServed' Schema. */
    zipCodes: string[];
    /** Precise geographic location for GeoCoordinates Schema. */
    coordinates: {
      /** Latitude coordinate. */
      latitude: number;
      /** Longitude coordinate. */
      longitude: number;
    };
  };

  /**
   * Search Engine Optimization metadata.
   * Directly maps to <head> tags for ranking and social sharing.
   */
  seo: {
    /** The <title> tag content. Weighted heavily by search engines. */
    metaTitle: string;
    /** The meta description for SERP snippets. */
    metaDescription: string;
  };

  /**
   * UI-facing content for the landing page.
   * Focuses on keyword-rich headings and clear value propositions.
   */
  content: {
    /** The main H1 title. Typically includes neighborhood and primary service keywords. */
    heroTitle: string;
    /** Detailed introductory text following the H1. */
    heroDescription: string;
    /** The core service highlighted for this location (e.g., "Emergency Tree Removal"). */
    primaryServiceFocus: string;
  };

  /**
   * List of services offered in this specific neighborhood.
   * Allows for granular control over service availability per area.
   */
  services: {
    /** Human-readable service name. */
    name: string;
    /** URL slug to link to the dedicated service page. */
    slug: string;
    /** Flag to toggle availability if a service isn't offered in this specific zone. */
    isAvailable: boolean;
  }[];

  /**
   * The "Resident" Persona Signals.
   * Differentiates the site from generic national competitors by demonstrating deep local knowledge.
   */
  residentSignals: {
    /** Recognizable local landmarks (e.g., parks, schools) to build trust. */
    localLandmarks: string[];
    /** Practical, local-only advice (e.g., parking tips for crews). */
    proximityTips: string[];
    /** Local terms or area nicknames used by residents (e.g., "Happy Hollow"). */
    localVernacular: string[];
  };

  /**
   * Answer Engine Optimization (AEO) content.
   * Structured as Q&A pairs to target voice search and FAQPage Schema.
   */
  aeoContent: {
    /** List of frequently asked questions regarding tree care in this neighborhood. */
    commonProblems: {
      /** The specific question a resident might ask. */
      question: string;
      /** The expert answer explaining the local context. */
      answer: string;
    }[];
  };
}

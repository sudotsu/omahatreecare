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
  // Core Identity & Routing
  identifiers: {
    neighborhoodName: string; // e.g., "Dundee"
    cityName: string;         // e.g., "Omaha"
    stateCode: string;        // e.g., "NE"
    slug: string;             // e.g., "dundee" (URL-safe)
    zipCodes: string[];       // e.g., ["68132"] - Critical for AreaServed Schema
    coordinates: {            // Critical for GeoCoordinates Schema
      latitude: number;       // e.g., 41.2565
      longitude: number;      // e.g., -95.9345
    };
  };

  // SEO Metadata (Head tags)
  seo: {
    metaTitle: string;        // e.g., "Tree Service in Dundee Omaha | Emergency & Routine Care"
    metaDescription: string;  // e.g., "Professional tree removal, trimming, and emergency service in Dundee..."
  };

  // Page Content (UI)
  content: {
    heroTitle: string;        // H1 - heavily weighted for keywords
    heroDescription: string;  // Intro paragraph below H1
    primaryServiceFocus: string; // e.g., "Emergency Tree Removal" - Used for H1 context
  };

  // Service Links & Schema Data
  services: {
    name: string;             // e.g., "Stump Grinding"
    slug: string;             // e.g., "stump-grinding" - Links to /services/[slug]
    isAvailable: boolean;     // Some neighborhoods might not get all services
  }[];

  // The "Resident" Persona Signals
  // These demonstrate deep local knowledge ("Resident, not Tourist")
  residentSignals: {
    localLandmarks: string[]; // e.g., ["Memorial Park", "Dundee Elementary"]
    proximityTips: string[];  // e.g., ["We park behind the library on 50th - meters are free"]
    localVernacular: string[];// e.g., ["Happy Hollow", "The Dell"]
  };

  // AEO Content (The "Reference Librarian")
  // Simple structure - transformed to FAQPage Schema in component
  aeoContent: {
    commonProblems: {
      question: string;       // e.g., "Why are so many oak trees dying in Dundee?"
      answer: string;         // e.g., "Dundee's mature bur oaks are experiencing..."
    }[];
  };
}

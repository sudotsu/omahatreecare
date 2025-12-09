/**
 * Site-wide constants for Omaha Tree Care
 * Centralized configuration for contact info, branding, and common values
 */

export const CONTACT = {
  phone: '(402) 812-3294',
  phoneRaw: '+14028123294',
  email: 'andrew@omahatreecare.com', // UPDATED
  businessName: 'Midwest Roots Tree Services',
  siteUrl: 'https://omahatreecare.com',

  // Helper string for internal use (Safe to keep)
  address: '5634 Corby St # 1, Omaha, NE 68104-4128',

  // Physical address (Keep these specific fields for Schema.org and SEO)
  streetAddress: '5634 Corby St # 1',
  addressLocality: 'Omaha',
  addressRegion: 'NE',
  postalCode: '68104-4128',
  addressCountry: 'US',

  // Geo coordinates (for maps and local SEO)
  latitude: 41.28431,
  longitude: -96.00133,

  // Social profiles (for Schema.org sameAs)
  socialProfiles: [
    'https://x.com/omahatree', // ADDED
    'https://midwestroots.info',
    'https://facebook.com/midwestrootsomaha',
    'https://www.linkedin.com/company/midwestrootsomaha/',
    'https://maps.google.com/?cid=2577349893469380478'
  ]
}

// Service area cities with geo coordinates (for Schema.org areaServed)
export const SERVICE_AREAS = [
  {
    type: 'City',
    name: 'Omaha',
    latitude: 41.2565,
    longitude: -95.9345,
    sameAs: 'https://en.wikipedia.org/wiki/Omaha,_Nebraska'
  },
  {
    type: 'Place',
    name: 'Dundee',
    latitude: 41.2623,
    longitude: -95.9903,
    sameAs: 'https://en.wikipedia.org/wiki/Dundee–Happy_Hollow_Historic_District'
  },
  {
    type: 'Place',
    name: 'Millard',
    latitude: 41.2034,
    longitude: -96.1264,
    sameAs: 'https://en.wikipedia.org/wiki/Millard,_Omaha'
  },
  {
    type: 'Place',
    name: 'Elkhorn',
    latitude: 41.2861,
    longitude: -96.2364,
    sameAs: 'https://en.wikipedia.org/wiki/Elkhorn,_Omaha'
  },
  {
    type: 'City',
    name: 'Gretna',
    latitude: 41.1400,
    longitude: -96.2397,
    sameAs: 'https://en.wikipedia.org/wiki/Gretna,_Nebraska'
  },
  {
    type: 'City',
    name: 'Papillion',
    latitude: 41.1547,
    longitude: -96.0422,
    sameAs: 'https://en.wikipedia.org/wiki/Papillion,_Nebraska'
  },
  {
    type: 'City',
    name: 'Bellevue',
    latitude: 41.1364,
    longitude: -95.8908,
    sameAs: 'https://en.wikipedia.org/wiki/Bellevue,_Nebraska'
  },
  {
    type: 'City',
    name: 'Bennington',
    latitude: 41.3647,
    longitude: -96.1578,
    sameAs: 'https://en.wikipedia.org/wiki/Bennington,_Nebraska'
  },
  {
    type: 'City',
    name: 'Ralston',
    latitude: 41.2064,
    longitude: -96.0447,
    sameAs: 'https://en.wikipedia.org/wiki/Ralston,_Nebraska'
  }
]

export const COLORS = {
  primary: '#52796f',      // Muted green
  accent: '#c1666b',       // Terracotta
  background: '#f8f6f1',   // Cream
  text: '#3d3027',         // Dark brown
  textLight: '#6b5d54',    // Medium brown
  textLighter: '#8b8175'   // Light brown
}

export const TRUST_SIGNALS = {
  certification: 'Certified Arborist Standards',
  certificationShort: 'ISA Certified'
}

export const BUSINESS_HOURS = {
  schedule: 'Mo-Su 07:00-21:00', // Updated for Schema
  display: 'Daily 7am - 9pm'     // Updated for Humans
}
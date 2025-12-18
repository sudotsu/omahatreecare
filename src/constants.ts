/**
 * Site-wide constants for Omaha Tree Care
 * Centralized configuration for contact info, branding, and common values
 * Single Source of Truth (SSOT) for all SEO and schema.org data
 */

export const SITE_URL = 'https://omahatreecare.com' as const

export const CONTACT = {
  phone: '(402) 812-3294',
  phoneRaw: '+14028123294',
  email: 'andrew@omahatreecare.com',
  businessName: 'Midwest Roots Tree Services',
  siteUrl: SITE_URL,

  // Physical address for Schema.org
  streetAddress: '5634 Corby St # 1',
  addressLocality: 'Omaha',
  addressRegion: 'NE',
  postalCode: '68104-4128',
  addressCountry: 'US',

  // Geo coordinates for maps and local SEO
  latitude: 41.28431,
  longitude: -96.00133,

  // Social profiles for Schema.org sameAs
  socialProfiles: [
    'https://x.com/omahatree',
    'https://midwestroots.info',
    'https://facebook.com/midwestrootsomaha',
    'https://www.linkedin.com/company/midwestrootsomaha/',
    'https://maps.google.com/?cid=2577349893469380478',
  ],
} as const

// Business hours for Schema.org
export const BUSINESS_HOURS = {
  schedule: 'Mo-Su 07:00-21:00', // Schema.org format
  display: 'Daily 7am - 9pm', // Human-readable
} as const

// Trust signals
export const TRUST_SIGNALS = {
  certification: 'Certified Arborist Standards',
  certificationShort: 'ISA Certified',
} as const

// Service areas with geo coordinates for Schema.org areaServed
export interface ServiceArea {
  type: 'City' | 'Place'
  name: string
  latitude: number
  longitude: number
  sameAs: string
}

export const SERVICE_AREAS: readonly ServiceArea[] = [
  {
    type: 'City',
    name: 'Omaha',
    latitude: 41.2565,
    longitude: -95.9345,
    sameAs: 'https://en.wikipedia.org/wiki/Omaha,_Nebraska',
  },
  {
    type: 'Place',
    name: 'Dundee',
    latitude: 41.2623,
    longitude: -95.9903,
    sameAs: 'https://en.wikipedia.org/wiki/Dundee–Happy_Hollow_Historic_District',
  },
  {
    type: 'Place',
    name: 'Millard',
    latitude: 41.2034,
    longitude: -96.1264,
    sameAs: 'https://en.wikipedia.org/wiki/Millard,_Omaha',
  },
  {
    type: 'Place',
    name: 'Elkhorn',
    latitude: 41.2861,
    longitude: -96.2364,
    sameAs: 'https://en.wikipedia.org/wiki/Elkhorn,_Omaha',
  },
  {
    type: 'City',
    name: 'Gretna',
    latitude: 41.1400,
    longitude: -96.2397,
    sameAs: 'https://en.wikipedia.org/wiki/Gretna,_Nebraska',
  },
  {
    type: 'City',
    name: 'Papillion',
    latitude: 41.1547,
    longitude: -96.0422,
    sameAs: 'https://en.wikipedia.org/wiki/Papillion,_Nebraska',
  },
  {
    type: 'City',
    name: 'Bellevue',
    latitude: 41.1364,
    longitude: -95.8908,
    sameAs: 'https://en.wikipedia.org/wiki/Bellevue,_Nebraska',
  },
  {
    type: 'City',
    name: 'Bennington',
    latitude: 41.3647,
    longitude: -96.1578,
    sameAs: 'https://en.wikipedia.org/wiki/Bennington,_Nebraska',
  },
  {
    type: 'City',
    name: 'Ralston',
    latitude: 41.2064,
    longitude: -96.0447,
    sameAs: 'https://en.wikipedia.org/wiki/Ralston,_Nebraska',
  },
] as const

// Brand colors
export const COLORS = {
  primary: '#52796f',
  accent: '#c1666b',
  background: '#f8f6f1',
  text: '#3d3027',
  textLight: '#6b5d54',
  textLighter: '#8b8175',
} as const

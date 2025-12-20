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

// Brand colors (logo-derived - see VISUAL-BRANDING-GUIDE.md)
export const COLORS = {
  // Primary forest green (from Primary Badge Logo)
  primary: '#4a6d5a',
  primaryDark: '#3d5a4d',
  primaryHover: '#2f4639',

  // Emergency red/orange (from Emergency Logo)
  emergencyRed: '#d32f2f',
  emergencyOrange: '#fb8c00',

  // Cream backgrounds (from logo backgrounds)
  cream: '#f5efe0',
  creamLight: '#fdfcfa',

  // Sage/olive secondary (from Worker Logos)
  sage: '#6b7c63',

  // Legacy mappings (deprecated - use Tailwind tokens instead)
  accent: '#d32f2f',      // Emergency red
  background: '#f5efe0',  // Cream
  text: '#1c1917',        // Neutral-900
  textLight: '#57534e',   // Neutral-600
  textLighter: '#a8a29e', // Neutral-400
} as const

// Logo assets (see VISUAL-BRANDING-GUIDE.md for usage rules)
export const LOGOS = {
  // Primary Brand Logo (Green Badge)
  primary: '/images/logos/primary-green-badge.webp',
  primarySvg: '/images/logos/primary-green-badge.svg',

  // Emergency Logo (Red/Orange)
  emergency: '/images/logos/emergency-red-orange.png',
  emergencySvg: '/images/logos/emergency-red-orange.svg',

  // Alternate Worker/Olive Logo
  worker: '/images/logos/worker-olive-sage.webp',
  workerSvg: '/images/logos/worker-olive-sage.svg',

  // Simplified tree icon (favicons)
  icon: '/images/logos/tree-icon-simplified.png',
  iconSvg: '/images/logos/tree-icon-simplified.svg',

  // Favicon paths
  favicon16: '/favicon-16x16.png',
  favicon32: '/favicon-32x32.png',
  favicon64: '/favicon-64x64.png',
  faviconIco: '/favicon.ico',

  // Apple touch icon
  appleTouchIcon: '/apple-touch-icon.png',

  // Open Graph image
  ogImage: '/og-image.png',
} as const

// Logo usage contexts (see VISUAL-BRANDING-GUIDE.md)
export const LOGO_USAGE = {
  // Use Primary Green Badge for:
  standard: [
    'header',
    'footer',
    'invoices',
    'estimates',
    'social-media',
    'email-signatures',
    'standard-ctas',
  ],

  // Use Emergency Red/Orange for:
  emergency: [
    'emergency-banners',
    '24-7-callouts',
    'storm-damage-alerts',
    'emergency-ctas',
    'emergency-landing-pages',
  ],

  // Use Worker/Olive for:
  physical: [
    'merchandise',
    'truck-decals',
    'crew-uniforms',
    'tool-ui',
    'job-site-signage',
  ],
} as const

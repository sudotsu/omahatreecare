/**
 * Site-wide constants — TypeScript port of src/constants.js
 */

export const CONTACT = {
  phone:           '(402) 812-3294',
  phoneRaw:        '+14028123294',
  email:           'andrew@omahatreecare.com',
  businessName:    'Midwest Roots Tree Services',
  siteUrl:         'https://omahatreecare.com',

  address:         '5634 Corby St # 1, Omaha, NE 68104-4128',
  streetAddress:   '5634 Corby St # 1',
  addressLocality: 'Omaha',
  addressRegion:   'NE',
  postalCode:      '68104-4128',
  addressCountry:  'US',

  latitude:        41.28431,
  longitude:       -96.00133,

  socialProfiles: [
    'https://x.com/omahatree',
    'https://midwestroots.info',
    'https://facebook.com/midwestrootsomaha',
    'https://www.linkedin.com/company/midwestrootsomaha/',
    'https://maps.google.com/?cid=2577349893469380478'
  ]
} as const;

export interface ServiceArea {
  type: 'City' | 'Place';
  name: string;
  latitude: number;
  longitude: number;
  sameAs: string;
}

export const SERVICE_AREAS: ServiceArea[] = [
  { type: 'City',  name: 'Omaha',      latitude: 41.2565, longitude: -95.9345, sameAs: 'https://en.wikipedia.org/wiki/Omaha,_Nebraska' },
  { type: 'Place', name: 'Dundee',     latitude: 41.2623, longitude: -95.9903, sameAs: 'https://en.wikipedia.org/wiki/Dundee–Happy_Hollow_Historic_District' },
  { type: 'Place', name: 'Millard',    latitude: 41.2034, longitude: -96.1264, sameAs: 'https://en.wikipedia.org/wiki/Millard,_Omaha' },
  { type: 'Place', name: 'Elkhorn',    latitude: 41.2861, longitude: -96.2364, sameAs: 'https://en.wikipedia.org/wiki/Elkhorn,_Omaha' },
  { type: 'City',  name: 'Gretna',     latitude: 41.1400, longitude: -96.2397, sameAs: 'https://en.wikipedia.org/wiki/Gretna,_Nebraska' },
  { type: 'City',  name: 'Papillion',  latitude: 41.1547, longitude: -96.0422, sameAs: 'https://en.wikipedia.org/wiki/Papillion,_Nebraska' },
  { type: 'City',  name: 'Bellevue',   latitude: 41.1364, longitude: -95.8908, sameAs: 'https://en.wikipedia.org/wiki/Bellevue,_Nebraska' },
  { type: 'City',  name: 'Bennington', latitude: 41.3647, longitude: -96.1578, sameAs: 'https://en.wikipedia.org/wiki/Bennington,_Nebraska' },
  { type: 'City',  name: 'Ralston',    latitude: 41.2064, longitude: -96.0447, sameAs: 'https://en.wikipedia.org/wiki/Ralston,_Nebraska' },
];

/**
 * Brand color values for JS consumers (canvas, chart libs, dynamic style
 * computations like Navigation scroll-state). CSS is the primary source of
 * truth — these values are mirrored in src/app/globals.css @theme as
 * --color-forest, --color-gold, etc. and consumed via Tailwind token classes.
 * Do not use these to set inline hex values in JSX — use the Tailwind tokens.
 */
export const COLORS = {
  forest:      '#11261B',  // --color-forest
  forestDeep:  '#0d1a0f',  // --color-forest-deep
  gold:        '#FFB800',  // --color-gold
  cream:       '#F7F6F2',  // --color-cream
  stone:       '#EDECEA',  // --color-stone
  primary:     '#52796f',  // --color-primary (teal, legacy)
  accent:      '#c1666b',  // --color-accent (terracotta)
  text:        '#3d3027',
  textLight:   '#6b5d54',
  textLighter: '#8b8175',
} as const;

export const TRUST_SIGNALS = {
  certification:      'Certified Arborist Standards',
  certificationShort: 'ISA Certified',
} as const;

export const BUSINESS_HOURS = {
  schedule: 'Mo-Su 07:00-21:00',
  display:  'Daily 7am - 9pm',
} as const;

/**
 * Animated trust stats used in the Hero/stats strip.
 * ⚠️  Fill in YEARS_IN_BUSINESS and TREES_SERVICED before launch —
 *     they are not present in the existing source and must come from Andrew.
 */
export const STATS = [
  { end: 500,  suffix: '+', label: 'Trees Serviced'       },
  { end: 3,    suffix: '+', label: 'Years in Omaha'       },
  { end: 150,  suffix: '+', label: 'Risk Assessments Run' },
] as const;

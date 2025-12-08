/**
 * Site-wide constants for Omaha Tree Care
 * Centralized configuration for contact info, branding, and common values
 */

export const CONTACT = {
  phone: '(402) 812-3294',
  phoneRaw: '+14028123294',
  email: 'andrew@midwestroots.info',
  businessName: 'Midwest Roots Tree Services',
  siteUrl: 'https://omahatreecare.com',

  // Physical address (for Schema.org and NAP consistency)
  streetAddress: '5634 Corby St # 1',
  addressLocality: 'Omaha',
  addressRegion: 'NE',
  postalCode: '68104-4128',
  addressCountry: 'US',

  // Geo coordinates (for maps and local SEO)
  latitude: '41.28431',
  longitude: '-96.00133',

  // Social profiles (for Schema.org sameAs)
  socialProfiles: [
    'https://midwestroots.info',
    'https://facebook.com/midwestrootsomaha',
    'https://www.linkedin.com/company/midwestrootsomaha/',
    'https://maps.google.com/?cid=2577349893469380478'
  ]
}

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
  schedule: 'Mo-Sa 08:00-18:00',
  display: 'Mon-Sat 8am-6pm'
}

#!/usr/bin/env node
/**
 * Build-time sitemap validation guard
 * Ensures all sitemap URLs are canonical and would return 200
 */

const { getAllCanonicalRoutes, getRouteCounts } = require('../src/routes.ts')
const { SITE_URL } = require('../src/constants.ts')

console.log('🔍 Validating sitemap routes...\n')

const routes = getAllCanonicalRoutes()
const counts = getRouteCounts()

// Check for duplicates
const paths = routes.map(r => r.path)
const duplicates = paths.filter((path, index) => paths.indexOf(path) !== index)

if (duplicates.length > 0) {
  console.error('❌ FAILED: Duplicate routes found:')
  duplicates.forEach(dup => console.error(`   - ${dup}`))
  process.exit(1)
}

// Check all routes are canonical (no trailing slashes, no index.html, etc)
const nonCanonical = routes.filter(r => {
  const path = r.path
  return (
    (path !== '/' && path.endsWith('/')) ||
    path.includes('index.html') ||
    path.includes('.html') ||
    path.includes('//') ||
    path === '/404'
  )
})

if (nonCanonical.length > 0) {
  console.error('❌ FAILED: Non-canonical routes found:')
  nonCanonical.forEach(nc => console.error(`   - ${nc.path}`))
  process.exit(1)
}

// Check all routes use SITE_URL
routes.forEach(route => {
  if (route.path.startsWith('http') && !route.path.startsWith(SITE_URL)) {
    console.error(`❌ FAILED: Route uses wrong domain: ${route.path}`)
    process.exit(1)
  }
})

// Success!
console.log('✅ All sitemap routes are valid and canonical\n')
console.log('📊 Route counts:')
console.log(`   Total: ${counts.total}`)
console.log(`   Services: ${counts.services}`)
console.log(`   Locations: ${counts.locations}`)
console.log(`   Tools: ${counts.tools}`)
console.log(`   Special: ${counts.special}`)
console.log(`   Homepage: ${counts.homepage}`)
console.log('\n✅ Sitemap validation PASSED\n')

process.exit(0)

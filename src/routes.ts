/**
 * Canonical Route Source of Truth
 * Single source for all routing and sitemap generation
 */

import locationsData from './data/locations.json'
import servicesData from './data/services.json'
import { SITE_URL } from './constants'

export interface RouteDefinition {
  path: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

/**
 * Generate all canonical routes
 * This is the SINGLE SOURCE OF TRUTH for routing
 */
export function getAllCanonicalRoutes(): RouteDefinition[] {
  const routes: RouteDefinition[] = []

  // Homepage
  routes.push({
    path: '/',
    changefreq: 'weekly',
    priority: 1.0,
  })

  // Services
  routes.push({
    path: '/services',
    changefreq: 'monthly',
    priority: 0.9,
  })

  Object.keys(servicesData).forEach((slug) => {
    routes.push({
      path: `/services/${slug}`,
      changefreq: 'monthly',
      priority: 0.9,
    })
  })

  // Locations
  routes.push({
    path: '/locations',
    changefreq: 'monthly',
    priority: 0.9,
  })

  Object.keys(locationsData).forEach((city) => {
    routes.push({
      path: `/locations/${city}`,
      changefreq: 'monthly',
      priority: 0.8,
    })

    const neighborhoods = locationsData[city as keyof typeof locationsData]
    neighborhoods.forEach((neighborhood) => {
      routes.push({
        path: `/locations/${city}/${neighborhood}`,
        changefreq: 'monthly',
        priority: 0.8,
      })
    })
  })

  // Tools
  routes.push({
    path: '/tools',
    changefreq: 'weekly',
    priority: 0.7,
  })

  // Special pages
  routes.push({
    path: '/emergency-tree-service-omaha',
    changefreq: 'monthly',
    priority: 0.9,
  })

  routes.push({
    path: '/tree-consultation-omaha',
    changefreq: 'monthly',
    priority: 0.8,
  })

  return routes
}

/**
 * Get absolute URLs for all canonical routes
 */
export function getAllCanonicalURLs(): string[] {
  return getAllCanonicalRoutes().map((route) => `${SITE_URL}${route.path}`)
}

/**
 * Get route counts by type
 */
export function getRouteCounts() {
  const routes = getAllCanonicalRoutes()

  return {
    total: routes.length,
    services: routes.filter((r) => r.path.startsWith('/services')).length,
    locations: routes.filter((r) => r.path.startsWith('/locations')).length,
    tools: routes.filter((r) => r.path === '/tools').length,
    special: routes.filter((r) =>
      ['/emergency-tree-service-omaha', '/tree-consultation-omaha'].includes(r.path)
    ).length,
    homepage: 1,
  }
}

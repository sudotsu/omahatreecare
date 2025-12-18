import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'
import locationsData from './src/data/locations.json'
import servicesData from './src/data/services.json'

/**
 * Normalize services.json into a flat array of service objects.
 * Handles common shapes:
 * - Array: [{ slug: "tree-removal" }, ...]
 * - Object with array property: { services: [...] } or { items: [...] }
 * - Object of categories: { "core": [...], "winter": [...] }
 * - Object keyed by slug: { "tree-removal": { slug: "tree-removal", ... }, ... }
 */
const normalizeServices = (data) => {
  if (Array.isArray(data)) return data

  if (data && typeof data === 'object') {
    if (Array.isArray(data.services)) return data.services
    if (Array.isArray(data.items)) return data.items

    // Flatten object values; if values are arrays, flatten them; if objects, keep them.
    const vals = Object.values(data)
    const flattened = vals.flatMap((v) => (Array.isArray(v) ? v : [v]))
    return flattened.filter(Boolean)
  }

  return []
}

// Generate Location Routes
const generateLocationRoutes = () => {
  const routes = []
  Object.keys(locationsData).forEach((city) => {
    routes.push(`/locations/${city}`)
    locationsData[city].forEach((neighborhood) => {
      routes.push(`/locations/${city}/${neighborhood}`)
    })
  })
  return routes
}

// Generate Service Routes (robust)
const generateServiceRoutes = () => {
  const services = normalizeServices(servicesData)

  const routes = services
    .map((service) => {
      // accept common field names
      const slug =
        service?.slug ||
        service?.path ||
        service?.url ||
        service?.id ||
        service?.handle

      if (!slug) return null

      // ensure leading slash and avoid double slashes
      const cleaned = String(slug).startsWith('/') ? String(slug) : `/${slug}`
      return cleaned.replace(/\/{2,}/g, '/')
    })
    .filter(Boolean)

  return routes
}

// Static Routes
const staticRoutes = [
  '/',
  '/tools',
  '/locations',
  '/tree-consultation-omaha',
  '/emergency-tree-service-omaha',
  '/404'
]

// Master route list (dedupe + exclude 404 from sitemap)
const allRoutes = [
  ...staticRoutes,
  ...generateLocationRoutes(),
  ...generateServiceRoutes()
]
  .filter((route) => route !== '/404')
  .filter((route, index, self) => self.indexOf(route) === index)

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://omahatreecare.com',
      dynamicRoutes: allRoutes,
      readable: true,
      robots: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/404']
        }
      ]
    })
  ],
  ssgOptions: {
    // IMPORTANT: prevents the race where your app JS can run before the hash is defined
    script: 'sync',
    formatting: 'minify',
    includedRoutes() {
      return allRoutes
    }
  }
})

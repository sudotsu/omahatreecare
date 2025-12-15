import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Sitemap from 'vite-plugin-sitemap'; // <--- The new plugin
import locationsData from './src/data/locations.json';
import servicesData from './src/data/services.json';

// 1. Generate Location Routes (Existing Logic)
const generateLocationRoutes = () => {
  const routes = []
  Object.keys(locationsData).forEach(city => {
    routes.push(`/locations/${city}`)
    locationsData[city].forEach(neighborhood => {
      routes.push(`/locations/${city}/${neighborhood}`)
    })
  })
  return routes
}

// 2. Generate Service Routes (New Logic)
const generateServiceRoutes = () => {
  const routes = []
  // This assumes your services.json is an array of service objects
  servicesData.forEach(service => {
    routes.push(`/${service.slug}`)
  })
  return routes
}

// 3. Define Static Routes (Existing Logic)
const staticRoutes = [
  '/',
  '/tools',
  '/locations',
  '/tree-consultation-omaha',
  '/emergency-tree-service-omaha',
  '/404',
]

// 4. MASTER LIST: Combine everything into one source of truth
// Filter out 404 and deduplicate routes
const allRoutes = [
  ...staticRoutes,
  ...generateLocationRoutes(),
  ...generateServiceRoutes()
]
  .filter(route => route !== '/404') // Exclude 404 page from sitemap
  .filter((route, index, self) => self.indexOf(route) === index) // Remove duplicates

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // NEW: sitemap generation plugin
    Sitemap({
      hostname: 'https://omahatreecare.com',
      // Use our master route list
      dynamicRoutes: allRoutes,
      // Explicitly exclude 404 from sitemap
      readable: true,
      robots: [{
        userAgent: '*',
        allow: '/',
        disallow: ['/404']
      }]
    })
  ],
  // EXISTING: Generates HTML files using the Master List
  ssgOptions: {
    script: 'sync',
    formatting: 'minify',
    includedRoutes(paths) {
      // We ignore the default 'paths' guess and force our Master List
      // This ensures HTML and XML always match perfectly.
      return allRoutes
    }
  }
})

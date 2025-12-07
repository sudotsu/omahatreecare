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

// 2. Generate Service Routes (Existing Logic)
const generateServiceRoutes = () => {
  const routes = []
  Object.keys(servicesData).forEach(serviceId => {
    routes.push(`/services/${serviceId}`)
  })
  return routes
}

// 3. Define Static Routes (Manual pages)
const staticRoutes = [
  '/',
  '/tools',
  '/locations',
  '/emergency-tree-service-omaha',
  '/tree-consultation-omaha'
]

// 4. MASTER LIST: Combine everything into one source of truth
const allRoutes = [
  ...staticRoutes,
  ...generateLocationRoutes(),
  ...generateServiceRoutes()
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // NEW: Generates sitemap.xml using the Master List
    Sitemap({
      hostname: 'https://omahatreecare.com',
      dynamicRoutes: allRoutes,
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
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths) {
      // We ignore the default 'paths' guess and force our Master List
      // This ensures HTML and XML always match perfectly.
      return allRoutes
    }
  }
})
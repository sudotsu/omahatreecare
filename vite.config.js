import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import locationsData from './src/data/locations.json'
import servicesData from './src/data/services.json'; // <-- NEW: Import services data

// Generate all location routes programmatically (existing logic)
const generateLocationRoutes = () => {
  const routes = []

  Object.keys(locationsData).forEach(city => {
    // Add city hub page (e.g., /locations/millard)
    routes.push(`/locations/${city}`)

    // Add all neighborhood pages (e.g., /locations/${city}/${neighborhood}`)
    locationsData[city].forEach(neighborhood => {
      routes.push(`/locations/${city}/${neighborhood}`)
    })
  })

  return routes
}

// NEW FUNCTION: Generate all service routes programmatically
const generateServiceRoutes = () => {
  const routes = []

  // Loops through 'tree-removal', 'tree-trimming', etc.
  Object.keys(servicesData).forEach(serviceId => {
    // Generates static paths like /services/tree-removal
    routes.push(`/services/${serviceId}`)
  })

  return routes
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths) {
      // 1. Existing paths (home, tools)
      // 2. All location pages
      // 3. All NEW service pages <--- This is the fix
      return [...paths, ...generateLocationRoutes(), ...generateServiceRoutes()]
    }
  }
})
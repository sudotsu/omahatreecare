import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import locationsData from './src/data/locations.json'

// Generate all location routes programmatically
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths) {
      // Generate all location pages + existing routes
      return [...paths, ...generateLocationRoutes()]
    }
  }
})

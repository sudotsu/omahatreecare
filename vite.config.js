import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'

// City list used for SSG expansion
const cities = [
  'omaha', 'millard', 'elkhorn', 'gretna', 'papillion',
  'bellevue', 'ralston', 'bennington', 'lavista',
  'chalco', 'valley', 'waterloo'
]

// THESE MUST MATCH keys in CostEstimator.jsx
const services = [
  'tree-removal',
  'tree-trimming',
  'stump-grinding',
  'emergency-tree-service'
]

export default defineConfig({
  plugins: [
    react(),
    Pages()
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      generateSitemap({
        hostname: 'https://omahatreecare.com',
        readable: true,
        outDir: 'dist',
        generateRobotsTxt: false
      })
    },
    includedRoutes() {
      const allRoutes = [
        '/',
        '/contact',
        '/about',
        '/tools',
        '/accessibility',
        ...cities,
        ...services
      ]

      return allRoutes.flatMap((route) => {
        if (cities.includes(route)) return `/locations/${route}`
        if (services.includes(route)) return `/services/${route}`
        return route
      })
    }
  }
})

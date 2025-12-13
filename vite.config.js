import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import generateSitemap from 'vite-ssg-sitemap';

// 1. DATA LISTS
const cities = [
  'omaha', 'millard', 'elkhorn', 'gretna', 'papillion',
  'bellevue', 'ralston', 'bennington', 'lavista',
  'chalco', 'valley', 'waterloo'
];

// NOTE: These slugs must EXACTLY match the keys in CostEstimator.jsx
const services = [
  'tree-removal',
  'tree-trimming',
  'stump-grinding',
  'commercial-tree-services',
  'plant-health-care'
];

export default defineConfig({
  plugins: [
    react(),
    Pages(),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      generateSitemap({
        hostname: 'https://omahatreecare.com',
        readable: true,
        outDir: 'dist',        // Explicit output directory
        generateRobotsTxt: false // STOP it from overwriting your existing robots.txt
      })
    },
    includedRoutes(paths, routes) {
      const allRoutes = [
        '/',
        '/contact',
        '/about',
        '/tools',
        '/accessibility',
        ...cities,
        ...services
      ];

      return allRoutes.flatMap(route => {
        // A. Handle City Pages
        if (cities.includes(route)) return `/locations/${route}`;

        // B. Handle Service Pages (Critical Fix)
        if (services.includes(route)) return `/services/${route}`;

        // C. Standard Pages
        return route;
      });
    }
  }
})
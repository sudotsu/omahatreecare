# Omaha Tree Care - Professional Tree Service Website

A professional tree care website for Midwest Roots Tree Service in Omaha, Nebraska. Built with Next.js 14 for optimal SEO, performance, and user experience.

## Live Site

**Production URL:** https://omahatreecare.com

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Runtime:** React 18
- **Styling:** Tailwind CSS 3
- **Analytics:** Vercel Analytics + Speed Insights
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Dark Mode:** Tailwind CSS dark mode with localStorage persistence

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Project Structure

```
├── pages/                      # Next.js pages (using App Router pattern)
│   ├── index.tsx               # Homepage
│   ├── services/               # Service pages
│   ├── locations/              # Location-based pages
│   └── emergency-tree-service-omaha.tsx
├── src/
│   ├── components/             # React components
│   ├── data/                   # JSON data (services, locations)
│   ├── constants.ts            # Site-wide constants
│   └── index.css               # Global styles
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
└── vercel.json                 # Vercel deployment config
```

## Key Features

- **SEO Optimized:** Dynamic meta tags, sitemap, canonical URLs
- **Accessibility:** WCAG 2.1 AA compliant
- **Performance:** Lighthouse scores 95+ across all metrics
- **Mobile First:** Responsive design for all devices
- **Dark Mode:** System preference detection with manual toggle
- **Local SEO:** City and neighborhood-specific pages

## Deployment

Deployed on Vercel with automatic deployments from the `main` branch.

## Documentation

See the `docs/` folder for detailed migration notes and architecture documentation.

---

**Note:** This project was recently migrated from Vite to Next.js. Some legacy documentation files may reference Vite - these are outdated and can be ignored.

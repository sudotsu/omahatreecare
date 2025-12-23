# Omaha Tree Care - Professional Tree Service Website

A hyper-local SEO-optimized tree care website for Midwest Roots Tree Services in Omaha, Nebraska. Built with Next.js 14 Pages Router following "Resident, not Tourist" local SEO strategy.

## Live Site

**Production URL:** <https://omahatreecare.com>

## Technology Stack

- **Framework:** Next.js 14.2.35 (Pages Router, SSG)
- **Language:** TypeScript 5.3.3 (strict mode)
- **Runtime:** React 18.2.0
- **Styling:** Tailwind CSS 3.4.0 with custom design system
- **Analytics:** Vercel Analytics + Speed Insights
- **Icons:** Lucide React
- **Deployment:** Vercel (automatic from `main` branch)

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production (46 routes with SSG)
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Project Structure

```text
├── pages/                              # Next.js Pages Router
│   ├── _app.tsx                        # App wrapper with site chrome
│   ├── _document.tsx                   # HTML document
│   ├── index.tsx                       # Homepage
│   ├── services/
│   │   ├── index.tsx                   # Services index
│   │   └── [slug].tsx                  # Individual service pages (4)
│   ├── locations/
│   │   ├── index.tsx                   # Locations index
│   │   ├── [city]/
│   │   │   ├── index.tsx               # City hub pages (8)
│   │   │   ├── [neighborhood].tsx      # Hyper-local neighborhood pages (24)
│   │   │   └── [neighborhood].legacy.tsx  # Legacy template
│   ├── emergency-tree-service-omaha.tsx
│   ├── tree-consultation-omaha-old.tsx
│   ├── tools.tsx
│   ├── sitemap.xml.tsx                 # Dynamic sitemap
│   └── robots.txt.tsx                  # Dynamic robots.txt
├── src/
│   ├── components/
│   │   ├── primitives/                 # Design system (.tsx only)
│   │   ├── Header.tsx                  # Fixed top navigation
│   │   ├── Footer.tsx                  # Site footer
│   │   └── StickyMobileCTA.tsx         # Sticky mobile CTA
│   ├── data/
│   │   ├── neighborhoods/              # Hyper-local JSON content
│   │   │   └── omaha-dundee.json       # Example resident page data
│   │   ├── services.json               # Service catalog
│   │   └── locations.json              # City/neighborhood structure
│   ├── constants.ts                    # NAP, contact, business hours
│   ├── routes.ts                       # Canonical route definitions
│   └── index.css                       # Global styles + Tailwind
├── types/
│   └── location-page.ts                # LocationData interface
├── public/                             # Static assets
├── docs/                               # Architecture documentation
├── MASTER-PLAYBOOK.md                  # Development checkpoint tracker
├── tailwind.config.js                  # Design system tokens
└── tsconfig.json                       # TypeScript strict config
```

## Key Features

### Hyper-Local SEO Strategy
- **46 SSG routes:** Homepage, 4 services, 8 cities, 24 neighborhoods, + special pages
- **Neighborhood pages:** Hyper-local content with resident signals (landmarks, proximity tips, local vernacular)
- **Schema.org markup:** LocalBusiness, FAQPage, AreaServed with HQ address + dynamic service areas
- **Answer Engine Optimization (AEO):** Natural language Q&A for voice search

### Design System
- **Blue-collar trustworthy:** Concrete grays (90%), green accents (10%), safety orange for emergencies
- **TypeScript-only:** Strict mode, all components typed, 0 build errors
- **14 primitives:** Container, Section, Button, Card, Badge, Alert, Input, Select, Textarea, Checkbox, Radio, FieldError, FormRow, Divider, Grid, Accordion, Modal
- **Dual-state UX:** Emergency distress (70% call CTAs) + routine research (30% quote CTAs)

### Performance & Accessibility
- **WCAG 2.1 AA compliant:** 44x44px touch targets, color contrast, keyboard navigation
- **Motion respect:** `prefers-reduced-motion` support
- **Build time:** 30-60 seconds for all routes
- **Zero internal 404s:** Validated with linkinator

## Architecture Highlights

### Hybrid Data Loading (Phase 4)

Neighborhood pages use try/catch import strategy:


```typescript
try {
  const filePath = `../../../src/data/neighborhoods/${city}-${neighborhood}.json`
  data = require(filePath) as LocationData
  console.log(`✅ Loaded real data for ${city}-${neighborhood}`)
} catch (error) {
  console.log(`⚠️  No data file for ${city}-${neighborhood}, using mock data`)
  data = mockLocation
}
```

**Benefit:** Add one JSON file at a time, builds never break, gradual migration from mock to real content.

### Single Source of Truth
- **Contact info:** `src/constants.ts` (NAP, hours, geo coords)
- **Routes:** `src/routes.ts` (canonical paths, sitemap priorities)
- **Services:** `src/data/services.json` (title, slug, descriptions)
- **Locations:** `src/data/locations.json` (city/neighborhood hierarchy)

### Schema.org Best Practices
- **ONE HQ address:** `5634 Corby St, Omaha NE 68104` across all pages
- **Dynamic areaServed:** Neighborhood-specific ZIP codes per page
- **Avoids doorway page penalty:** Business identity (address/geo) separate from service area

## Documentation

Comprehensive docs in `/docs` folder:
- **01-MIGRATION-SUMMARY.md:** Vite → Next.js Pages Router migration
- **02-DESIGN-SYSTEM-IMPLEMENTATION.md:** Tokens + primitives
- **03-SITE-CHROME-AND-CONVERSION.md:** Header, Footer, mobile CTA
- **04-TYPESCRIPT-MIGRATION.md:** Strict TypeScript-only approach
- **05-CURRENT-STATE-AND-NEXT-STEPS.md:** Status + roadmap

**Development tracker:** `MASTER-PLAYBOOK.md` (checkpoint-based progress)

## Development Status

### ✅ Complete (Phases 1-4)
- Phase 1: LocationData interface defined
- Phase 2: Dual-state UX implemented (emergency + research modes)
- Phase 3: Resident page template built
- Phase 4: Hybrid data loading + real Dundee content
- Strategic Audit: All 4 SEO pillars pass

### 🚧 Next Up
- Visual appeal enhancements (upcoming prompt series)
- Content scaling for remaining 23 neighborhoods
- Real crew photos for trust sections

## Build & Deploy

```bash
# Development
npm run dev                    # http://localhost:3000

# Production build
npm run build                  # Generates 46 static routes
npm run start                  # Preview production build

# Expected output:
# ✓ Compiled successfully
# ✓ Generating static pages (46/46)
```

**Deployment:** Automatic via Vercel on push to `main` branch.

## Contributing

This is a production site for Midwest Roots Tree Services. Development uses checkpoint-based workflow tracked in `MASTER-PLAYBOOK.md`.

---

**Note:** This project migrated from Vite to Next.js (Dec 2024). Legacy files in `src/components-legacy/` are excluded from builds.

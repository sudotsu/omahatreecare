# Migration Summary: Vite → Next.js Pages Router

## Overview
This document summarizes the migration from a Vite-based React SPA to Next.js 14 with Pages Router, completed as the foundation for a local SEO-optimized tree service website.

## What Was Migrated

### From (Original Stack)
- **Framework**: Vite 6.4.1 with React 18.2.0
- **Routing**: React Router DOM (client-side only)
- **Deployment**: Vercel (static export)
- **Structure**: Single-page app with component-based routing
- **Location**: All source in `src/` directory

### To (Current Stack)
- **Framework**: Next.js 14.2.35 with Pages Router
- **Routing**: File-based routing in `pages/` directory
- **Deployment**: Vercel (SSG + SSR capabilities)
- **Structure**: Multi-page SSG site with dynamic routes
- **TypeScript**: Strict TypeScript-only (no .jsx/.js allowed)

## Directory Structure Changes

### Before (Vite)
```
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Router setup
│   ├── routes.jsx            # Route definitions
│   ├── pages/                # Page components
│   ├── components-legacy/    # React components
│   └── data/                 # JSON data files
├── public/                   # Static assets
└── index.html                # HTML entry
```

### After (Next.js)
```
├── pages/                    # Next.js pages (file-based routing)
│   ├── _app.tsx              # App wrapper (site chrome)
│   ├── _document.tsx         # HTML document
│   ├── index.tsx             # Homepage (/)
│   ├── services/
│   │   ├── index.tsx         # /services
│   │   └── [slug].tsx        # /services/tree-removal, etc.
│   ├── locations/
│   │   ├── index.tsx         # /locations
│   │   ├── [city]/
│   │   │   ├── index.tsx     # /locations/omaha
│   │   │   └── [neighborhood].tsx  # /locations/omaha/dundee
│   ├── emergency-tree-service-omaha.tsx
│   ├── tree-consultation-omaha.tsx
│   ├── tools.tsx
│   ├── sitemap.xml.tsx       # Dynamic sitemap
│   └── robots.txt.tsx        # Dynamic robots.txt
├── src/
│   ├── components/           # NEW: Design system + chrome
│   │   ├── primitives/       # Design system primitives (.tsx)
│   │   ├── Header.tsx        # Site header
│   │   ├── Footer.tsx        # Site footer
│   │   └── StickyMobileCTA.tsx
│   ├── components-legacy/    # OLD: React Router components (.jsx)
│   ├── constants.ts          # Centralized config (NAP, contact)
│   ├── routes.ts             # Canonical route source of truth
│   ├── seo/                  # SEO utilities (prepared for next phase)
│   └── data/                 # JSON data (unchanged)
├── public/                   # Static assets (unchanged)
└── tsconfig.json             # TypeScript configuration
```

## Key Architectural Changes

### 1. Routing System
**Before (React Router):**
- Client-side routing with `<BrowserRouter>`
- Routes defined in `src/routes.jsx`
- Manual route configuration

**After (Next.js):**
- File-based routing (files in `pages/` = routes)
- Automatic code splitting per route
- SSG with `getStaticProps` and `getStaticPaths`

### 2. Data Fetching
**Before:**
- Import JSON directly in components
- All data loaded client-side

**After:**
- `getStaticProps` for page-level data
- `getStaticPaths` for dynamic routes
- Build-time data fetching (SSG)

### 3. SEO & Meta Tags
**Before:**
- React Helmet or manual meta tags
- Limited SEO control

**After:**
- Next.js `<Head>` component per page
- Automatic sitemap generation from `src/routes.ts`
- Dynamic robots.txt
- Ready for Schema.org structured data

### 4. Build Process
**Before:**
```bash
vite build  # Client-side bundle
```

**After:**
```bash
next build  # Static generation of all pages
# Output: .next/ with pre-rendered HTML
```

## Canonical Route Structure

All routes are defined in **`src/routes.ts`** (single source of truth):

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage |
| `/services` | Static | Services index |
| `/services/[slug]` | Dynamic SSG | Individual service pages (4 services) |
| `/locations` | Static | Locations index |
| `/locations/[city]` | Dynamic SSG | City hub pages (8 cities) |
| `/locations/[city]/[neighborhood]` | Dynamic SSG | Neighborhood pages (24 neighborhoods) |
| `/emergency-tree-service-omaha` | Static | Emergency service landing |
| `/tree-consultation-omaha` | Static | Consultation/quote form |
| `/tools` | Static | Tree care tools gateway |
| `/sitemap.xml` | Dynamic | Auto-generated from routes.ts |
| `/robots.txt` | Dynamic | SEO directives |

**Total pages built:** 45 pages (42 in sitemap + 3 system pages)

## Migration Benefits

### Performance
- **SSG**: All pages pre-rendered at build time
- **Code splitting**: Automatic per-route
- **Image optimization**: Next.js Image component ready
- **Faster TTI**: HTML served immediately, hydrates progressively

### SEO
- **Pre-rendered HTML**: Search engines see full content
- **Dynamic sitemap**: Auto-updates from route definitions
- **Structured data ready**: Schema.org integration prepared
- **Canonical URLs**: Enforced through routing system

### Developer Experience
- **TypeScript strict mode**: Type safety across entire codebase
- **File-based routing**: Intuitive, less configuration
- **Hot reload**: Fast development iteration
- **Build validation**: Sitemap validator ensures route consistency

## Breaking Changes from Vite

### 1. Imports
**Before:**
```jsx
import { Link } from 'react-router-dom';
```

**After:**
```tsx
import Link from 'next/link';
```

### 2. Navigation
**Before:**
```jsx
<Link to="/services">Services</Link>
```

**After:**
```tsx
<Link href="/services">Services</Link>
```

### 3. Component File Extensions
**Before:** `.jsx` allowed
**After:** **TypeScript only** - `.tsx` required for all components

### 4. Data Fetching
**Before:**
```jsx
import servicesData from './data/services.json';

export const ServicesPage = () => {
  return <div>{servicesData.map(...)}</div>;
};
```

**After:**
```tsx
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const servicesData = await import('./data/services.json');
  return { props: { services: servicesData } };
};

export default function ServicesPage({ services }) {
  return <div>{services.map(...)}</div>;
}
```

## Migration Timeline

This migration was completed as part of a larger redesign project:

1. **Phase 0**: Initial Next.js setup + route migration
2. **Phase 1**: Design system tokens + primitives (COMPLETE)
3. **Phase 2**: Site chrome + conversion rails (COMPLETE)
4. **Phase 3**: Page templates (PENDING - next up)
5. **Phase 4**: Deterministic SEO system (PLANNED)

## Current Status

✅ **Complete:**
- Next.js Pages Router setup
- All canonical routes migrated
- TypeScript strict mode enforced
- Design system primitives implemented
- Site chrome (header, footer, mobile CTA)
- Build passing with 0 errors
- 0 internal 404s (validated with linkinator)

🚧 **In Progress:**
- Page templates need content (currently minimal)

📋 **Planned:**
- Deterministic SEO system implementation
- Schema.org structured data
- Content population from design brief

## Files to Reference

- **Route definitions**: `src/routes.ts`
- **TypeScript config**: `tsconfig.json`
- **Build config**: `next.config.js` (if exists, else uses defaults)
- **Design system**: `src/components/primitives/`
- **Constants**: `src/constants.ts` (NAP, contact info, business data)

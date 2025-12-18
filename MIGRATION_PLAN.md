# MIGRATION PLAN - Next.js Migration

**Date**: 2025-12-17
**Branch**: condescending-brattain
**Original Goal**: Ensure all routes are canonical, SEO-complete, and sitemap-accurate
**Current Goal**: Migrate from Vite React SSG to Next.js Pages Router with TypeScript

---

## Implementation Notes - Step 1/7: Next.js Baseline

**Date Completed**: 2025-12-17
**Status**: ✅ COMPLETE - Build passing

### Versions Installed

- **Next.js**: 14.2.18 (Pages Router)
- **React**: 18.2.0
- **TypeScript**: 5.7.2
- **Tailwind CSS**: 3.4.18
- **Node Types**: 20.17.10

### Files Created

**Next.js Core:**
- `pages/_app.tsx` - Global app wrapper with Analytics & Speed Insights
- `pages/_document.tsx` - HTML document with GTM, dark mode script, fonts, and global schema
- `pages/index.tsx` - Placeholder homepage
- `next.config.js` - Route generation logic adapted from vite.config.js (with service route fix)
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint config with legacy file exclusions

**Updated:**
- `package.json` - Next.js dependencies and scripts
- `tailwind.config.js` - Updated content paths for Next.js
- `postcss.config.js` - Changed to CommonJS exports
- `.gitignore` - Added Next.js build directories

### Files Archived

- `src/components/` → `src/components-legacy/` (for reference during port)
- `vite.config.js` → `vite.config.js.backup`
- `src/main.jsx` → `src/main.jsx.backup`

### Files Preserved (Unchanged)

- `src/data/services.json`
- `src/data/locations.json`
- `src/data/neighborhoodData.json`
- `public/images/` (all images)
- All `.md` documentation files

### Key Migrations

1. **Route Generation Logic**: Extracted from `vite.config.js.backup` and adapted to Next.js format in `next.config.js`
   - Fixed service route bug: Now correctly generates `/services/{slug}` instead of `/{slug}`
   - Location route generation preserved
   - Static routes list maintained

2. **Global Setup**: Migrated from `src/main.jsx.backup`
   - Vercel Analytics: `@vercel/analytics/react` (same package)
   - Speed Insights: `@vercel/speed-insights/next` (Next.js specific)
   - Dark mode initialization: Moved to `_document.tsx` (blocking script)

3. **HTML Head Elements**: Extracted from `index.html`
   - GTM script (head and noscript)
   - Dark mode initialization script
   - Google Fonts (preconnect + stylesheet)
   - FAQPage schema (global)
   - HowTo schema (global)
   - SeoJuice script

4. **Security Headers**: Migrated from `vercel.json` to `next.config.js`
   - X-Content-Type-Options
   - X-Frame-Options
   - X-XSS-Protection
   - Referrer-Policy
   - Permissions-Policy

5. **Redirects**: Migrated from `vercel.json` to `next.config.js`
   - `/home` → `/` (301)
   - `/index.html` → `/` (301)

### Build Verification

**npm install output:**
```
added 395 packages, and audited 396 packages in 30s
```

**npm run build output:**
```
✓ Compiled successfully
✓ Generating static pages (3/3)
Route (pages)                             Size     First Load JS
┌ ○ /                                     1.61 kB        84.1 kB
├   /_app                                 0 B            82.5 kB
└ ○ /404                                  180 B          82.7 kB
○  (Static)  prerendered as static content
```

### Notes & Decisions

1. **ESLint**: Configured to ignore legacy files (`src/components-legacy/`, `src/pages/**/*.jsx`) to prevent build errors
2. **Output Mode**: Set to `standalone` in `next.config.js` for Vercel deployment compatibility
3. **Fonts**: Moved to `_document.tsx` per Next.js best practices (warning resolved)
4. **GTM Warning**: Left as-is (using dangerouslySetInnerHTML); migration to `next/script` can be done later if needed
5. **Legacy Components**: Preserved in `src/components-legacy/` for reference during content porting

### Next Steps

- Step 2/7: Port service pages
- Step 3/7: Port location pages
- Step 4/7: Port special pages (emergency, consultation)
- Step 5/7: Port tools page
- Step 6/7: Generate sitemap
- Step 7/7: Run acceptance tests

---

## Original Inventory (Pre-Migration)

## Route Inventory Table

### Services Routes

| URL | Source File(s) | Canonical? | Notes |
|-----|---------------|------------|-------|
| `/services/tree-removal` | ServiceTemplate.jsx (dynamic) + services.json | **YES** | Primary canonical pattern |
| `/services/tree-trimming` | ServiceTemplate.jsx (dynamic) + services.json | **YES** | Primary canonical pattern |
| `/services/tree-health-assessment` | ServiceTemplate.jsx (dynamic) + services.json | **YES** | Primary canonical pattern |
| `/services/winter-tree-prep` | ServiceTemplate.jsx (dynamic) + services.json | **YES** | Primary canonical pattern |

**Current Status**: All service routes follow `/services/:serviceId` pattern.

---

### Location Routes

#### City Hubs (8 cities)

| URL | Source File(s) | Canonical? | Notes |
|-----|---------------|------------|-------|
| `/locations/omaha` | CityHub.jsx (dynamic) + locations.json | **YES** | City hub pattern |
| `/locations/millard` | CityHub.jsx (dynamic) + locations.json | **YES** | City hub pattern |
| `/locations/elkhorn` | CityHub.jsx (dynamic) + locations.json | **YES** | City hub pattern |
| `/locations/gretna` | CityHub.jsx (dynamic) + locations.json | **YES** | City hub pattern |
| `/locations/ralston` | CityHub.jsx (dynamic) + locations.json | **YES** | City hub pattern |
| `/locations/papillion` | CityHub.jsx (dynamic) + locations.json | **YES** | City hub pattern |
| `/locations/bellevue` | CityHub.jsx (dynamic) + locations.json | **YES** | City hub pattern |
| `/locations/bennington` | CityHub.jsx (dynamic) + locations.json | **YES** | City hub pattern |

#### Neighborhood Pages (29 neighborhoods)

| URL | Source File(s) | Canonical? | Notes |
|-----|---------------|------------|-------|
| `/locations/omaha/dundee` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/omaha/benson` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/omaha/florence` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/omaha/midtown` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/omaha/aksarben` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/omaha/westside` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/omaha/north-omaha` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/omaha/south-omaha` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/millard/old-millard` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/millard/harvey-oaks` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/millard/oak-hills` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/millard/millard-highlands` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/elkhorn/the-ridges` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/elkhorn/pacific-springs` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/elkhorn/skyline-ranches` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/elkhorn/indian-creek` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/gretna/tiburon` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/gretna/aspen-creek` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/gretna/buffalo-creek` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/ralston/mockingbird-hills` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/papillion/shadow-lake` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/papillion/eagle-hills` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/bellevue/fontenelle-hills` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |
| `/locations/bennington/newport-landing` | LocationTemplate.jsx + neighborhoodData.json | **YES** | Neighborhood pattern |

#### Location Index

| URL | Source File(s) | Canonical? | Notes |
|-----|---------------|------------|-------|
| `/locations` | Locations.jsx | **YES** | Directory page for all locations |

**Current Status**: All location routes follow `/locations/:city` and `/locations/:city/:neighborhood` patterns.

---

### Special/Marketing Routes

| URL | Source File(s) | Canonical? | Notes |
|-----|---------------|------------|-------|
| `/emergency-tree-service-omaha` | EmergencyTreeService.jsx | **YES** | Standalone emergency page |
| `/tree-consultation-omaha` | TreeConsultation.jsx | **YES** | Standalone consultation page |

**Current Status**: These are standalone marketing pages with keyword-rich URLs.

---

### Tools Routes

| URL | Source File(s) | Canonical? | Notes |
|-----|---------------|------------|-------|
| `/tools` | ToolsPage.jsx | **YES** | React-based diagnostic tool |

**Note**: Legacy `/public/tools/index.html` exists but is NOT routed or in sitemap. This is standalone diagnostic HTML.

---

### Static/Core Routes

| URL | Source File(s) | Canonical? | Notes |
|-----|---------------|------------|-------|
| `/` | HomePage.jsx | **YES** | Site homepage |
| `/404` | (fallback) | **YES** | Error page (excluded from sitemap) |

---

### Existing Redirects (vercel.json)

| Source | Destination | Type | Notes |
|--------|-------------|------|-------|
| `/home` | `/` | 301 permanent | Prevents duplicate home routes |
| `/index.html` | `/` | 301 permanent | Prevents HTML file access |

---

## Canonical Rules (Explicit)

### Services
- **Pattern**: `/services/<slug>`
- **Examples**: `/services/tree-removal`, `/services/tree-trimming`
- **Source**: `services.json` (keyed by slug)
- **Template**: `ServiceTemplate.jsx`

### Locations
- **City Hub Pattern**: `/locations/<city>`
  - Example: `/locations/omaha`
  - Source: `locations.json` (city keys)
  - Template: `CityHub.jsx`

- **Neighborhood Pattern**: `/locations/<city>/<neighborhood>`
  - Example: `/locations/omaha/dundee`
  - Source: `locations.json` (neighborhood array) + `neighborhoodData.json` (content)
  - Template: `LocationTemplate.jsx`

- **Directory Pattern**: `/locations`
  - Source: `Locations.jsx`
  - Purpose: Hub page listing all cities

### Tools
- **Pattern**: `/tools`
- **Source**: `ToolsPage.jsx` (React component)
- **Note**: Legacy `/public/tools/index.html` is NOT canonical, not routed

### Special Pages
- **Emergency**: `/emergency-tree-service-omaha` (keyword-rich URL)
- **Consultation**: `/tree-consultation-omaha` (keyword-rich URL)

### Core
- **Homepage**: `/`
- **404**: `/404` (excluded from sitemap)

---

## Redirect Map Draft

### Current Redirects (Already Implemented)
- `/home` → `/` (301)
- `/index.html` → `/` (301)

### Legacy/Non-Canonical URLs Discovered
**None found** - all current routes are canonical.

### Potential Future Redirects (Not Currently Needed)
If marketing materials or old links surface, consider:
- `/services.html` → `/locations` (if services listing page is created)
- `/locations.html` → `/locations`
- `/emergency` → `/emergency-tree-service-omaha`
- `/consultation` → `/tree-consultation-omaha`

---

## Content Source Map

| Content Type | Source File(s) | Format | Notes |
|--------------|----------------|--------|-------|
| **Service Definitions** | `src/data/services.json` | JSON object keyed by slug | Contains title, hero text, benefits, meta desc |
| **City/Neighborhood Lists** | `src/data/locations.json` | JSON object keyed by city | Arrays of neighborhood slugs |
| **Neighborhood Content** | `src/data/neighborhoodData.json` | JSON object keyed by neighborhood | Detailed content: vibe, trees, issues, risks, geo coords |
| **Business Constants** | `src/constants.js` (implied) | JavaScript constants | Phone, email, address, URLs |
| **Marketing Copy** | Inline in page components | JSX | Hero sections, CTAs, educational content |
| **Tool Screens** | `src/components/tool/screens/*.jsx` | React components | Diagnostic tool UI |

---

## SEO Source Map

| SEO Element | Generation Location | Implementation Details |
|-------------|---------------------|------------------------|
| **Page Title** | Per-page component | Set via `<Head><title>` from vite-react-ssg |
| **Meta Description** | Per-page component | Set via `<Head><meta name="description">` |
| **Canonical URL** | Per-page component | Set via `<Head><link rel="canonical">` |
| **OpenGraph Tags** | Per-page component | OG title, description, type, url, image in `<Head>` |
| **Twitter Card** | Per-page component | Twitter card meta tags in `<Head>` |
| **JSON-LD Schema** | Per-page component | Inline `<script type="application/ld+json">` in `<Head>` |
| **Sitemap Generation** | `vite.config.js` | `vite-plugin-sitemap` with dynamic routes |
| **Robots.txt** | `vite.config.js` | Configured in sitemap plugin |

### Schema Types by Route

| Route Pattern | Schema Type(s) | Notes |
|---------------|----------------|-------|
| `/` | LocalBusiness | Full business data with geo, hours, services |
| `/services/*` | Service, BreadcrumbList, Organization | Service-specific schema |
| `/locations/:city` | Service, LocalBusiness | City hub with service areas |
| `/locations/:city/:neighborhood` | Service, BreadcrumbList, LocalBusiness | Neighborhood-specific with geo coordinates |
| `/emergency-tree-service-omaha` | EmergencyService | 24/7 availability emphasized |
| `/tree-consultation-omaha` | Service | Consultation-specific schema |
| `/tools` | LocalBusiness | Tool page with business info |

---

## Route Generation Logic (vite.config.js)

### Current Implementation

```javascript
// Static routes (lines 69-76)
const staticRoutes = [
  '/',
  '/tools',
  '/locations',
  '/tree-consultation-omaha',
  '/emergency-tree-service-omaha',
  '/404'
]

// Dynamic generation (lines 32-41)
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

// Dynamic generation (lines 44-66)
const generateServiceRoutes = () => {
  const services = normalizeServices(servicesData)
  const routes = services.map(service => {
    const slug = service?.slug || service?.id // fallback logic
    return slug ? `/${slug}` : null
  }).filter(Boolean)
  return routes
}

// Master list (lines 79-85)
const allRoutes = [
  ...staticRoutes,
  ...generateLocationRoutes(),
  ...generateServiceRoutes()
]
  .filter((route) => route !== '/404')
  .filter((route, index, self) => self.indexOf(route) === index)
```

### Known Issues
1. ⚠️ **Service route generation**: Currently uses `normalizeServices()` which returns objects from `services.json`, then extracts slugs. However, the routes are NOT prefixed with `/services/` in the generation logic (line 60 only adds leading slash, not `/services/`).

2. ✅ **Location route generation**: Correctly generates both city hubs and neighborhood routes.

3. ✅ **Deduplication**: Properly deduplicates routes and excludes `/404` from sitemap.

---

## Issues Requiring Attention

### 🚨 CRITICAL: Service Route Generation Bug

**Problem**: `vite.config.js` line 44-66 (`generateServiceRoutes()`) does NOT prepend `/services/` to service slugs.

**Current Behavior**:
- Returns routes like `/tree-removal` instead of `/services/tree-removal`
- This may cause sitemap to contain incorrect URLs
- Routes in `routes.jsx` use `/services/:serviceId` pattern (line 54-57)

**Impact**:
- Sitemap may contain 4 incorrect service URLs
- These URLs would 404 (no route matches `/tree-removal` without `/services/` prefix)
- SEO crawlers would encounter broken links

**Required Fix**:
In `vite.config.js` line 60, change:
```javascript
const cleaned = String(slug).startsWith('/') ? String(slug) : `/${slug}`
```
To:
```javascript
const cleaned = `/services/${slug}`
```

---

## Step 1 Preview: Files to Change

Based on this inventory, **Step 1** (fixing route generation) will modify:

1. **vite.config.js** (line 60)
   - Fix service route generation to prepend `/services/`
   - Ensure sitemap contains correct canonical URLs

2. **Verification**: Run `npm run build` and inspect:
   - `dist/sitemap.xml` - should contain `/services/*` URLs
   - `dist/services/tree-removal/index.html` - should exist
   - No orphaned `/tree-removal/index.html` files

---

## Summary (10 Bullets)

1. ✅ **4 service routes** follow `/services/:slug` pattern (canonical)
2. ✅ **8 city hub routes** follow `/locations/:city` pattern (canonical)
3. ✅ **29 neighborhood routes** follow `/locations/:city/:neighborhood` pattern (canonical)
4. ✅ **1 location directory** at `/locations` (canonical)
5. ✅ **2 special marketing pages** with keyword-rich URLs (canonical)
6. ✅ **1 tools page** at `/tools` (canonical, replaces legacy HTML)
7. ✅ **All pages have complete SEO metadata** (title, description, canonical, OG, JSON-LD)
8. ✅ **No legacy/non-canonical routes discovered** in current routing
9. 🚨 **Critical bug**: `vite.config.js` service route generation missing `/services/` prefix
10. ✅ **Existing redirects** handle `/home` and `/index.html` correctly

---

## Next Steps (Not Executed Yet)

**Gate**: Awaiting approval to proceed with Step 1.

**Step 1**: Fix service route generation in `vite.config.js` and verify build output.

**Validation**: Use `ACCEPTANCE_TESTS.md` checklist after fix is applied.

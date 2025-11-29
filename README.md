# Omaha Tree Care - Free Diagnostic Tools

A professional tree care diagnostic platform for Omaha homeowners. Built with React, Vite, and Static Site Generation (SSG) for optimal SEO and performance.

## Live Site

**Production URL:** https://omahatreecare.com

## What This Is

A free tree diagnostic tool suite that helps Omaha homeowners:
- Assess tree hazards using ISA (International Society of Arboriculture) standards
- Identify tree species and care needs
- Diagnose common tree problems, pests, and diseases
- Understand DIY vs. professional tree care
- Get cost estimates for tree services in Omaha

## Technology Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **SSG:** vite-react-ssg (Static Site Generation)
- **Routing:** React Router v6 (data API)
- **Styling:** Tailwind CSS 3
- **Analytics:** Vercel Analytics
- **Icons:** Lucide React
- **Dark Mode:** Tailwind CSS dark mode with localStorage persistence

## Architecture

### Static Site Generation (SSG)

This site uses **vite-react-ssg** to pre-render pages at build time:
- **Pre-rendered routes:** `/` and `/tools`
- **Build output:** Static HTML files in `dist/` folder
- **Benefits:**
  - Instant page loads
  - Perfect SEO (crawlable HTML)
  - No server required
  - Optimal performance scores

### Key Files

```
├── src/
│   ├── main.jsx              # ViteReactSSG entry point
│   ├── routes.jsx            # Route configuration (data API)
│   ├── App.jsx               # Root component wrapper
│   ├── pages/
│   │   ├── HomePage.jsx      # Landing page
│   │   └── ToolsPage.jsx     # Tree diagnostic tools
│   └── components/
│       └── tool/
│           ├── TreeDiagnostic.jsx        # Main tool component
│           └── screens/
│               ├── Home.jsx              # Tool selection
│               ├── SpeciesIdentifier.jsx # Species ID tool
│               ├── HazardAssessment.jsx  # Risk assessment tool
│               ├── CommonAilments.jsx    # Problem diagnosis tool
│               ├── DIYvsProGuide.jsx     # DIY vs Pro guide
│               └── CostEstimator.jsx     # Cost estimation tool
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

**Prerequisites:**
- Node.js 18+ (download from https://nodejs.org)
- npm (comes with Node.js)

### 2. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build with pre-rendered HTML in the `dist/` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with vite-react-ssg |
| `npm run build` | Build for production with SSG |
| `npm run preview` | Preview production build locally |

## Available Tools

### 1. Species Identifier
Helps homeowners identify tree species and learn care requirements specific to Omaha's climate.

### 2. Hazard Assessment
Uses ISA arborist standards to calculate tree risk based on:
- Root & trunk condition
- Branch structure
- Tree health
- Target assessment (proximity to structures)

**Risk Levels:** Low, Moderate, High, Extreme (scored 1-16)

### 3. Common Problems
Diagnoses tree ailments including:
- Diseases (Oak Wilt, Dutch Elm Disease, etc.)
- Pests (Emerald Ash Borer, bagworms, etc.)
- Environmental stress
- Nutrient deficiencies

### 4. DIY vs Professional
Helps homeowners decide what they can safely do themselves vs. when to call a professional arborist.

### 5. Cost Estimator
Provides realistic price ranges for:
- Tree removal
- Pruning/trimming
- Stump grinding
- Emergency services
- Treatment programs

## Features

### Dark Mode
- Toggle between light and dark themes
- Preference saved to localStorage
- Synced across all tool screens
- SSR-safe (hydration mismatch protection)

### SEO Optimization
- Pre-rendered static HTML for both routes
- Comprehensive meta tags and OpenGraph data
- Structured data (LocalBusiness, FAQPage, HowTo schemas)
- Omaha-specific keywords and content
- Google Fonts preloaded

### Performance
- Lazy-loaded components
- Optimized Tailwind CSS (purged in production)
- Minimal JavaScript bundle
- Static HTML for instant page loads

**Expected Lighthouse Scores:**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

## Deployment

### Deploying to Vercel (Recommended)

**Option 1: Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

**Option 2: GitHub Integration**
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Vercel auto-detects Vite configuration
4. Click "Deploy"

### Custom Domain Setup

In Vercel dashboard:
1. Go to Project Settings > Domains
2. Add `omahatreecare.com` and `www.omahatreecare.com`
3. Update DNS records at your domain registrar:
   - Add CNAME record: `@` → `cname.vercel-dns.com`
   - Add CNAME record: `www` → `cname.vercel-dns.com`

DNS propagation takes 1-24 hours.

## Configuration

### Vite Config (`vite.config.js`)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**Note:** ViteReactSSG is invoked via CLI (`vite-react-ssg dev/build`), not as a plugin.

### Routes Config (`src/routes.jsx`)

```javascript
export const routes = [
  {
    path: '/',
    element: <HomePage />,
    entry: 'src/pages/HomePage.jsx',
  },
  {
    path: '/tools',
    element: <ToolsPage />,
    entry: 'src/pages/ToolsPage.jsx',
  },
];
```

To add more pre-rendered routes, add them to this array.

## Development Notes

### React Router Version
This project uses **React Router v6** (not v7) for compatibility with vite-react-ssg. Do not upgrade to v7 without migrating away from vite-react-ssg.

### Build Process
1. `npm run build` runs `vite-react-ssg build`
2. SSG pre-renders routes defined in `src/routes.jsx`
3. Output: `dist/index.html` and `dist/tools.html`
4. Static assets in `dist/assets/`

### Dark Mode Implementation
Dark mode uses Tailwind's `dark:` prefix with class-based switching:
- `document.documentElement.classList.add('dark')` activates dark mode
- Preference stored in `localStorage.darkMode`
- `mounted` state prevents SSR hydration mismatch

## Recent Changes

### December 2024 - SSG Implementation
- ✅ Migrated from custom HTML injection to proper SSG
- ✅ Implemented vite-react-ssg for pre-rendering
- ✅ Converted to React Router v6 data API
- ✅ Pre-rendering both `/` and `/tools` routes

### Bug Fixes (Latest)
- ✅ Fixed HazardAssessment navigation stuck at 1/4
- ✅ Fixed dark mode toggle not working
- ✅ Fixed dark mode localStorage persistence
- ✅ Removed non-functional "Expert Advice" tool
- ✅ Fixed duplicate CSS classes (dark: prefixes)

## SEO Keywords Implemented

Omaha-specific tree care keywords optimized for local search:
- "Omaha tree care"
- "tree hazard assessment Omaha"
- "tree removal cost Omaha"
- "Emerald Ash Borer treatment Omaha"
- Service area cities: Bellevue, Papillion, La Vista, Gretna, Elkhorn

## Contact & Support

**Business:** Midwest Roots Tree Services
**Phone:** (402) 812-3294
**Email:** andrew@midwestroots.info
**Website:** https://midwestroots.info

## License

Proprietary - Midwest Roots Tree Services © 2024

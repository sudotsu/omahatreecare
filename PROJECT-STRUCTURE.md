# Project Structure

## File Organization

```
winter-defense/
│
├── 📄 Documentation
│   ├── README.md                   ← Full technical documentation
│   ├── QUICK-START.md              ← Getting started guide
│   ├── DEPLOYMENT-CHECKLIST.md     ← Pre-launch checklist
│   ├── PROJECT-STRUCTURE.md        ← This file
│   ├── EMAILJS-SETUP.md           ← Contact form configuration
│   └── IMAGE-OPTIMIZATION-GUIDE.md ← Image optimization tips
│
├── 📦 Configuration Files
│   ├── package.json                ← Dependencies & npm scripts
│   ├── package-lock.json          ← Locked dependency versions
│   ├── vite.config.js              ← Vite build configuration
│   ├── tailwind.config.js          ← Tailwind CSS customization
│   ├── postcss.config.js           ← PostCSS plugins
│   ├── vercel.json                 ← Vercel deployment config
│   └── .gitignore                  ← Git ignore rules
│
├── 📄 HTML Entry Point
│   └── index.html                  ← HTML shell with meta tags & structured data
│
├── 📁 src/                         ← Source code directory
│   │
│   ├── 🎨 Core Files
│   │   ├── main.jsx                ← ViteReactSSG entry point
│   │   ├── routes.jsx              ← Route configuration (data API)
│   │   ├── App.jsx                 ← Root component wrapper
│   │   └── index.css               ← Global styles & Tailwind directives
│   │
│   ├── 📁 pages/                   ← Page-level components
│   │   ├── HomePage.jsx            ← Landing page (/)
│   │   └── ToolsPage.jsx           ← Tree diagnostic tools page (/tools)
│   │
│   └── 📁 components/              ← Reusable components
│       └── tool/                   ← Tree diagnostic tool suite
│           ├── TreeDiagnostic.jsx  ← Main tool container (screen routing, dark mode)
│           └── screens/            ← Individual tool screens
│               ├── Home.jsx        ← Tool selection menu (5 cards)
│               ├── SpeciesIdentifier.jsx  ← Species identification tool
│               ├── HazardAssessment.jsx   ← ISA tree risk assessment
│               ├── CommonAilments.jsx     ← Disease/pest diagnosis
│               ├── DIYvsProGuide.jsx      ← DIY vs professional guide
│               └── CostEstimator.jsx      ← Cost estimation tool
│
└── 📁 public/                      ← Static assets (served as-is)
    ├── vite.svg                    ← Vite icon
    └── images/                     ← Image assets
        ├── README.md               ← Image upload instructions
        ├── andrew.png              ← About section photo
        └── hero-winter-wide.png    ← Hero background image

📁 dist/                            ← Production build output (generated)
├── index.html                      ← Pre-rendered homepage
├── tools.html                      ← Pre-rendered tools page (404)
└── assets/                         ← Hashed CSS/JS bundles
```

## Key Files Explained

### 🔥 Files You'll Edit Frequently

#### `src/pages/HomePage.jsx`
**Purpose:** Landing page content
**Contains:**
- Hero section with CTA
- Benefits/features
- Call-to-action for free tools
- SEO-optimized content

#### `src/components/tool/screens/` (5 files)
**Purpose:** Individual diagnostic tools
**Tools:**
1. **Home.jsx** - Tool selection screen with 5 cards
2. **HazardAssessment.jsx** - ISA-standard tree risk calculator
3. **SpeciesIdentifier.jsx** - Tree species ID and care guide
4. **CommonAilments.jsx** - Disease and pest diagnosis
5. **DIYvsProGuide.jsx** - When to DIY vs hire pros
6. **CostEstimator.jsx** - Tree service cost ranges

#### `src/components/tool/TreeDiagnostic.jsx`
**Purpose:** Main diagnostic tool wrapper
**Features:**
- Screen routing (home → individual tools)
- Dark mode toggle and persistence
- Header with back button
- Footer with contact info

### ⚙️ Configuration Files

#### `src/main.jsx`
**Purpose:** Application entry point
**Architecture:** ViteReactSSG setup
```javascript
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

export const createRoot = ViteReactSSG(
  { routes },
  ({ router, isClient }) => {
    // SSG setup
  },
)
```

#### `src/routes.jsx`
**Purpose:** Route configuration for SSG
**Pre-rendered routes:**
```javascript
export const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/tools', element: <ToolsPage /> },
]
```

#### `vite.config.js`
**Purpose:** Vite build configuration
**Note:** ViteReactSSG runs via CLI, not as a plugin
```javascript
export default defineConfig({
  plugins: [react()],
})
```

#### `package.json`
**Key scripts:**
```json
{
  "scripts": {
    "dev": "vite-react-ssg dev",
    "build": "vite-react-ssg build",
    "preview": "vite preview"
  }
}
```

#### `tailwind.config.js`
**Purpose:** Tailwind CSS customization
**Features:**
- Custom colors (amber/green palette)
- Dark mode: 'class' strategy
- Content paths for purging

#### `index.html`
**Purpose:** HTML shell and SEO metadata
**Contains:**
- Meta tags (description, keywords, OG tags)
- Structured data (LocalBusiness, FAQPage, HowTo)
- Google Fonts preconnect
- Analytics scripts

### 📁 Directory Purposes

#### `/src/pages/`
Page-level components that represent distinct routes.
- Each file = one route in the app
- Wrapped by `<App>` component
- Pre-rendered to static HTML at build time

#### `/src/components/tool/`
Tree diagnostic tool suite.
- `TreeDiagnostic.jsx` = container/router
- `screens/` = individual tool implementations
- All tools share dark mode state

#### `/public/`
Static assets served directly.
- No processing or hashing
- Referenced as `/filename.ext` in code
- Images, fonts, robots.txt, etc.

#### `/dist/` (generated)
Production build output.
- Created by `npm run build`
- Contains pre-rendered HTML + hashed assets
- Ready for deployment to Vercel/Netlify

## Data Flow

### Static Site Generation (SSG)
1. `npm run build` runs `vite-react-ssg build`
2. Reads routes from `src/routes.jsx`
3. Renders each route to static HTML
4. Outputs `dist/index.html` and `dist/tools.html`
5. Bundles React code for hydration

### Client-Side Hydration
1. Browser loads pre-rendered HTML
2. React JavaScript loads
3. React "hydrates" the static HTML
4. App becomes interactive

### Tool Navigation Flow
1. User visits `/tools` → loads `ToolsPage.jsx`
2. `ToolsPage` renders `TreeDiagnostic` component
3. `TreeDiagnostic` manages `currentScreen` state
4. Renders appropriate screen component (Home, HazardAssessment, etc.)
5. Tools can navigate back to Home via `setScreen('home')`

### Dark Mode Flow
1. `TreeDiagnostic` initializes from `localStorage.darkMode`
2. Toggle button calls `setDarkMode(!darkMode)`
3. useEffect adds/removes `dark` class on `<html>`
4. useEffect saves preference to localStorage
5. All screens use `dark:` Tailwind classes for styling

## npm Commands Reference

| Command | Script | Description |
|---------|--------|-------------|
| `npm install` | - | Install all dependencies |
| `npm run dev` | `vite-react-ssg dev` | Start dev server with SSG |
| `npm run build` | `vite-react-ssg build` | Build with SSG pre-rendering |
| `npm run preview` | `vite preview` | Preview production build |

## Component Hierarchy

```
ViteReactSSG
└── Routes
    ├── / (HomePage)
    │   └── Landing page content
    │
    └── /tools (ToolsPage)
        └── TreeDiagnostic
            ├── Header (back button, title, dark mode toggle)
            ├── Main Content
            │   ├── Home (tool selection)
            │   ├── SpeciesIdentifier
            │   ├── HazardAssessment
            │   ├── CommonAilments
            │   ├── DIYvsProGuide
            │   └── CostEstimator
            └── Footer (contact info)
```

## State Management

### Global State
- **Dark mode:** Managed in `TreeDiagnostic.jsx` via useState + localStorage
- **No Redux/Context:** Simple prop passing is sufficient

### Local State
- **currentScreen:** Which tool screen is active (in `TreeDiagnostic.jsx`)
- **Tool-specific state:** Each tool manages its own form data/progress

## Styling Architecture

### Tailwind CSS
- Utility-first approach
- JIT (Just-In-Time) compilation
- Dark mode via `dark:` prefix
- Custom colors in `tailwind.config.js`

### Global Styles
- Defined in `src/index.css`
- Minimal custom CSS
- Tailwind directives (@tailwind base, components, utilities)

### Component Styles
- Inline Tailwind classes
- Responsive breakpoints: sm, md, lg, xl
- Animations via Tailwind utility classes

## Build Output

### Development (`npm run dev`)
- Vite dev server on http://localhost:5173
- Hot module replacement (HMR)
- Source maps enabled
- No pre-rendering (client-side only)

### Production (`npm run build`)
- Pre-rendered HTML for `/` and `/tools`
- Minified and hashed assets
- Optimized Tailwind CSS (purged)
- Gzipped bundles
- Output in `dist/` folder

## SEO Structure

### Meta Tags (in `index.html`)
- Title, description, keywords
- OpenGraph tags for social sharing
- Canonical URL
- Robots directives

### Structured Data (in `index.html`)
- LocalBusiness schema
- FAQPage schema (6 common questions)
- HowTo schema (risk assessment guide)

### Pre-rendered HTML
- Both `/` and `/tools` pre-rendered
- Full content visible to crawlers
- No JavaScript required for initial render

## Development Workflow

1. **Start dev server:** `npm run dev`
2. **Edit files:** Changes auto-reload in browser
3. **Test tools:** Navigate to `/tools` and test each diagnostic tool
4. **Build:** `npm run build` to test SSG
5. **Preview:** `npm run preview` to test production build
6. **Deploy:** Push to Vercel or run `vercel` CLI

## Common File Locations

| Task | File(s) |
|------|---------|
| Update landing page content | `src/pages/HomePage.jsx` |
| Edit diagnostic tools | `src/components/tool/screens/*.jsx` |
| Change tool routing | `src/components/tool/TreeDiagnostic.jsx` |
| Add new route | `src/routes.jsx` + create page in `src/pages/` |
| Update SEO meta tags | `index.html` |
| Change colors/theme | `tailwind.config.js` |
| Add global styles | `src/index.css` |
| Upload images | `public/images/` |
| Configure build | `vite.config.js` |

## Pro Tips

✅ Keep `npm run dev` running while developing
✅ Use browser DevTools (F12) to debug
✅ Test dark mode toggle on all tool screens
✅ Check mobile responsiveness in DevTools device mode
✅ Run `npm run build` before deploying to catch SSG errors
✅ Use VS Code with Tailwind IntelliSense extension
✅ Keep component files focused (single responsibility)

## Questions?

Refer to specific documentation files:
- Technical details → `README.md`
- Getting started → `QUICK-START.md`
- Deployment → `DEPLOYMENT-CHECKLIST.md`
- Contact forms → `EMAILJS-SETUP.md`

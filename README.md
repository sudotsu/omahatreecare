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

After the build finishes, a **head injector** script automatically runs to normalize SEO tags across every generated HTML file:
- Rewrites/creates canonical URLs for each page
- Synthesizes meta descriptions (min 80 chars, max 155) when missing or too short
- Enforces Open Graph tags (title/description/url/image) using the final canonical
- Cleans up any `vite.svg` favicon references and ensures `/favicon.ico` is present
- Leaves existing JSON-LD `<script type="application/ld+json">` blocks untouched

### 4. Preview Production Build

```bash
npm run preview
```

### 5. Postbuild Head Injector (manual run)

The head injector can be invoked independently when you need to re-process built HTML without rebuilding assets:

```bash
node scripts/head-injector.mjs
```

**Inputs & assumptions:**
- Processes all `*.html` under `./dist`
- Uses `https://omahatreecare.com` as the site base for canonical URLs
- Idempotent: running multiple times will not duplicate tags

### Head Injector Details & Smoke Tests

The injector is designed to be safe to rerun and to clean up any pre-existing head issues. Every `npm run build` automatically triggers the script and logs a short summary to the console:

- Total HTML pages processed
- Pages missing descriptions after processing (expected: 0)
- Remaining references to `vite.svg` (expected: 0)

**What the injector enforces:**
- Canonical URLs per page (root `/`, `/tools`, and nested paths)
- Meta descriptions (synthesized from the first `<h1>` when missing/short and clamped to 155 chars)
- Open Graph tags (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`)
- Favicon hygiene (removes `vite.svg`, guarantees `/favicon.ico` exists)
- Leaves existing `<script type="application/ld+json">` blocks untouched

**Smoke test after a build:**
1. Run `npm run build` (injector runs automatically).
2. Inspect a few HTML outputs in `dist/` (e.g., `dist/index.html`, `dist/tools.html`, `dist/services/<slug>.html`). Confirm:
   - A single canonical link exists with the expected URL.
   - There is exactly one meta description with a meaningful 80–155 character summary.
   - OG tags exist for title/description/url/image and match the canonical/description values.
   - Favicon link points to `/favicon.ico` and no `vite.svg` reference appears in network logs.
   - JSON-LD blocks (e.g., on `/tools`) remain unchanged.
3. If you spot duplicate meta tags in older HTML outputs, rerun the injector manually (`node scripts/head-injector.mjs`); it replaces existing canonical/description/OG entries rather than adding new ones.

**Tip:** When adding new static pages, no extra configuration is required—the injector derives canonicals and OG metadata from filenames and titles. For unusual routes or custom OG images, adjust the script selectors in `scripts/head-injector.mjs`.

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with vite-react-ssg |
| `npm run build` | Build for production with SSG |
| `npm run preview` | Preview production build locally |

## Contributing

- Before opening a pull request, run `npm run build` to ensure the postbuild head injector completes successfully and produces clean SEO tags in `dist/`.
- Include a brief summary of pages checked (root, tools, and at least one nested page) so reviewers know the injector output was spot-checked.
- Commit your changes and create a PR using the provided workflow so the automated head normalization runs in CI contexts too.

### Pull request checklist

- Confirm your branch is up to date with `work` (or the target release branch) and that `git status` is clean before pushing.
- Write a concise summary that mentions any pages you spot-checked after the head injector ran so reviewers understand coverage.
- Include the command log for the build (showing the injector summary) in the PR description under a **Testing** section.
- If the GitHub UI is unavailable, you can still open a PR from the CLI with your preferred tool; the repo assumes feature work branches off `work` and targets `work` unless otherwise noted.

### Creating a PR from the CLI (when the UI is unavailable)

When the GitHub UI is down or inaccessible, you can still publish your branch and open a PR via the CLI:

1. Push your branch: `git push origin <branch-name>`
2. Use your preferred tool to open the PR (examples):
   - GitHub CLI: `gh pr create --base work --head <branch-name> --fill`
   - Hub: `hub pull-request -b work -h <branch-name>`
3. Include the build log (showing the postbuild head injector summary) and note which pages you spot-checked in the PR description.
4. Share the PR link in your update so reviewers can access it even if the UI was unstable when you created it.

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
@@ -204,50 +275,55 @@ export default defineConfig({
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

### Pushing branches to GitHub via CLI
- Add the remote without the trailing `.git` suffix: `git remote add work https://github.com/sudotsu/OmahaTreeCare`
- Push the current branch (example: `work`) to the shared branch name: `git push work HEAD:codex/locate-pr-link-or-commit-sha`
- If credentials are requested, ensure your GitHub token/SSH key is available in the environment before retrying.

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

### December 2025 - SSG Implementation
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


# Tools Page SEO Upgrade (Drop-in)

**Files to add/change**
1. Add this new file: `src/components/tool/ToolSEO.jsx` (provided).
2. In `src/components/tool/screens/CostEstimator.jsx`, change `const services = [...]` to `export const services = [...]`.
3. In `src/components/tool/TreeDiagnostic.jsx`:
   - `import ToolSEO from "./ToolSEO";`
   - `import { services } from "./screens/CostEstimator";`
   - Render `<ToolSEO services={services} />` near the top of the returned JSX (e.g., right under `<header>`).

**Also ensure**
- App root is wrapped by `<HelmetProvider>` from `react-helmet-async`:
  ```jsx
  import { HelmetProvider } from "react-helmet-async";
  // in your root (e.g., main.jsx)
  <HelmetProvider>
    <App />
  </HelmetProvider>
  ```
- Install the lib: `npm i react-helmet-async`

**What you get**
- Canonical + OG tags for `/tools`
- JSON-LD:
  - `BreadcrumbList` (Home → Tools)
  - `OfferCatalog` (each service with `AggregateOffer` low/high USD)
  - `LocalBusiness` with `hasOfferCatalog` and `areaServed` pulled from your constants

**Optional UX tweaks**
- Add a city/ZIP selector to apply a small multiplier (e.g., ±10%) to the shown range.
- Add a sticky mobile CTA (“Call”, “Text”, “Free Quote”) visible throughout the tool.

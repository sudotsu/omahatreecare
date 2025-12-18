# Site Chrome & Conversion Rails

## Overview
Site-wide chrome components were implemented to provide consistent navigation, branding, and conversion opportunities across all pages.

## Components Implemented

### 1. Header (`src/components/Header.tsx`)

**Location**: Fixed top navigation, always visible
**Styling**: White background with shadow on scroll

#### Desktop Navigation
```
[Logo/Brand]  Services▼  Service Areas  Tools  Free Consultation  [Emergency] [Call Now]
```

**Features:**
- **Logo**: Links to homepage, shows business name + tagline
- **Services dropdown**: Hover menu with all 4 services + "All Services" link
- **Scroll behavior**: Adds shadow/backdrop blur when scrolled
- **Emergency CTA**: Orange button (alert color) with AlertTriangle icon
- **Phone CTA**: Primary green button with phone number

#### Mobile Navigation
- Hamburger menu (Menu icon → X when open)
- Full-screen dropdown overlay
- Services as expandable section
- Two CTAs at bottom:
  - Emergency Service (orange, full width)
  - Call button (green, full width)

#### TypeScript Interface
```tsx
export const Header: React.FC = () => { ... }
```

**Routes linked:**
- `/` (logo)
- `/services` (dropdown + main link)
- `/services/[slug]` (tree-removal, tree-trimming, tree-health-assessment, winter-tree-prep)
- `/locations` (Service Areas)
- `/tools` (Tools)
- `/tree-consultation-omaha` (Free Consultation)
- `/emergency-tree-service-omaha` (Emergency button)
- `tel:${CONTACT.phoneRaw}` (Call button)

### 2. Footer (`src/components/Footer.tsx`)

**Location**: Bottom of every page (except /design-system)

#### Structure (4 columns on desktop, stacked on mobile)

**Column 1 (2-col span): NAP Block**
```
Midwest Roots Tree Services
📍 5634 Corby St # 1, Omaha, NE 68104-4128
📞 (402) 812-3294
✉️ andrew@omahatreecare.com
🕐 Daily 7am - 9pm
```

**Column 2: Services**
- All Services (link to /services)
- Tree Removal
- Tree Trimming
- Tree Health Assessment
- Winter Tree Prep

**Column 3: Service Areas**
- All Locations (link to /locations)
- Omaha, NE
- Millard, NE
- Elkhorn, NE
- Papillion, NE
- Bellevue, NE
- Gretna, NE

**Column 4: (Removed - reduced to 3 columns)**

#### Additional Links Row
- Emergency Service (alert-400 color, prominent)
- Free Consultation
- Tree Care Tools

#### Copyright
- Dynamic year
- Business name

**Purpose:**
- **NAP consistency**: Critical for local SEO
- **Internal linking**: Canonical service/location links
- **Trust signals**: Full contact info, business hours
- **Conversion**: Multiple CTA paths

### 3. StickyMobileCTA (`src/components/StickyMobileCTA.tsx`)

**Location**: Fixed bottom on mobile only (`lg:hidden`)
**Z-index**: 40 (above content, below modals)

#### Layout
```
[Call Now]  [Get Estimate]
  Primary     Secondary
```

**Features:**
- Two-button grid (50/50 split)
- Call Now: `tel:` link, phone icon, primary green
- Get Estimate: Links to `/tree-consultation-omaha`, file icon, steel gray
- Safe area padding for notched phones
- Border-top for visual separation
- White background with shadow

**Purpose:**
- Always-accessible conversion on mobile
- Thumb-friendly positioning
- No UI obstruction (buttons are contained)

## Site-Wide Layout (_app.tsx)

The chrome is integrated in `pages/_app.tsx`:

```tsx
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Exclude chrome from special pages
  const noChrome = ['/design-system'];
  const shouldShowChrome = !noChrome.includes(router.pathname);

  return (
    <>
      <Head>...</Head>

      {shouldShowChrome && <Header />}

      <main className={shouldShowChrome ? 'pt-20' : ''}>
        <Component {...pageProps} />
      </main>

      {shouldShowChrome && <Footer />}
      {shouldShowChrome && <StickyMobileCTA />}

      <Analytics />
      <SpeedInsights />
    </>
  );
}
```

**Key points:**
- Main content has `pt-20` (80px) to account for fixed header
- Chrome excluded from /design-system only
- Analytics/Speed Insights included globally

## Conversion Pathways

### Primary Conversions
1. **Emergency Service**
   - Header: Orange button (desktop + mobile)
   - Footer: Prominent link
   - Direct to `/emergency-tree-service-omaha`

2. **Phone Call**
   - Header: Green button (desktop + mobile)
   - Mobile CTA: Always visible
   - Footer: NAP block
   - `tel:(402) 812-3294`

3. **Free Consultation**
   - Header: Top nav link
   - Mobile CTA: "Get Estimate" button
   - Footer: Additional links row
   - Direct to `/tree-consultation-omaha`

### Secondary Conversions
1. **Service pages**: Header dropdown + Footer links
2. **Location pages**: Header "Service Areas" + Footer links
3. **Tools**: Header link + Footer link

## Design Decisions

### Colors
- **Header**: White (trust, clean)
- **Footer**: Dark (neutral-900, grounds the page)
- **Emergency button**: Orange (alert-500, urgency)
- **Primary CTA**: Green (primary-500, brand action)
- **Secondary CTA**: Steel (steel-600, less prominent)

### Typography
- **Logo**: Bold, large (xl/2xl), tight leading
- **Nav links**: Semibold, small, uppercase tracking
- **Footer headings**: Small caps, uppercase, wider tracking
- **Footer body**: Small, readable

### Spacing
- **Header padding**: py-3 scrolled, py-4 default
- **Footer padding**: py-12 top, py-8 bottom
- **Mobile CTA**: p-3 (12px padding)

### Accessibility
- **Focus states**: Visible 2px ring on all interactive elements
- **ARIA labels**: Hamburger menu has aria-label, aria-expanded
- **Semantic HTML**: `<header>`, `<footer>`, `<nav>`, `<main>`
- **Keyboard nav**: All links/buttons tabbable
- **Screen readers**: Icons have aria-hidden, labels on buttons

## Mobile Considerations

### Header
- Hamburger menu at 1024px breakpoint (lg:)
- Full-width mobile menu overlay
- Close button (X icon) in same position as hamburger
- Services as collapsible section (no nested dropdowns)

### Footer
- Stacks to single column < 768px
- Maintains link hierarchy
- Touch-friendly tap targets (min 44px)

### Sticky CTA
- Only shows < 1024px
- 60px height (2 buttons + padding)
- Pages need `pb-20` or similar to prevent content occlusion

## Brand Consistency

### Contact Information (CONTACT constant)
All contact info pulled from `src/constants.ts`:
```ts
export const CONTACT = {
  phone: '(402) 812-3294',
  phoneRaw: '+14028123294',
  email: 'andrew@omahatreecare.com',
  businessName: 'Midwest Roots Tree Services',
  streetAddress: '5634 Corby St # 1',
  addressLocality: 'Omaha',
  addressRegion: 'NE',
  postalCode: '68104-4128',
  // ... business hours, geo coords, etc.
}
```

**Why centralized:**
- Single source of truth for NAP (critical for local SEO)
- Easy to update across entire site
- Used in Schema.org data (future)
- Consistent formatting

### Service/Location Links
All navigation links use canonical URLs from `src/routes.ts` or hardcoded constants. Never:
- Link to non-existent pages
- Use relative paths inconsistently
- Create duplicate content paths

## Performance

### Header
- CSS transitions only (transform, opacity)
- Minimal JavaScript (state for menu open/close, scroll detection)
- No layout shift on scroll (height changes smoothly)

### Footer
- Static content, pre-rendered
- No client-side data fetching
- Icons from lucide-react (tree-shakeable)

### Sticky CTA
- Fixed position (no reflow)
- Hidden on desktop (no bundle bloat)
- Safe-area padding (CSS env() variables)

## Testing Notes

### Build Validation
- Build passes with no TypeScript errors
- All links resolve (0 internal 404s)

### Link Integrity
Crawl verified all internal links return 200:
- Header navigation: ✓
- Footer links: ✓
- Mobile CTA links: ✓
- Dropdown menu links: ✓

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Android)
- Requires JavaScript for menu interaction (graceful degradation not implemented)

## Future Enhancements

### Planned (Not Yet Implemented)
- [ ] Breadcrumbs (for SEO + UX)
- [ ] Mega menu for services (if service count grows)
- [ ] "Back to top" button on long pages
- [ ] Sticky header on scroll-up (hide on scroll-down)
- [ ] Dark mode toggle (design system supports it)

### Analytics Integration
Currently tracking (Vercel Analytics):
- Page views
- Click events (should add UTM tracking)
- Core Web Vitals

**Recommended additions:**
- Event tracking on CTAs (phone, consultation, emergency)
- Conversion funnel (page view → CTA click → form submit)
- Service/location page engagement

## Debugging

### Header Not Showing
- Check `router.pathname` not in `noChrome` array
- Verify import in `_app.tsx`
- Check for CSS z-index conflicts

### Mobile CTA Covering Content
- Add `pb-20` or `pb-24` to page/section
- Check safe-area-inset-bottom support

### Footer Links 404ing
- Verify route exists in `pages/` directory
- Check `src/routes.ts` for canonical path
- Run linkinator crawler

### Dropdown Not Opening (Desktop)
- Check `onMouseEnter`/`onMouseLeave` handlers
- Verify `isServicesOpen` state
- CSS `pt-2` creates hover bridge (don't remove)

## Integration with Design System

All chrome components use design system primitives:
- **Header**: Uses `Button` primitive for CTAs
- **Footer**: Uses spacing/typography tokens
- **Sticky CTA**: Uses `Button` primitive

**Benefit**: Consistent styling, type safety, easy theme changes

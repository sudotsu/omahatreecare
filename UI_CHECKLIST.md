# UI IMPLEMENTATION CHECKLIST
**Midwest Roots Tree Service — Quality Assurance**

## Accessibility Checklist

### Keyboard Navigation
- [ ] All interactive elements focusable via Tab key
- [ ] Tab order follows logical reading order
- [ ] Focus indicators visible (2px outline, primary color)
- [ ] No keyboard traps (can tab out of all components)
- [ ] Skip-to-content link present at top of page
- [ ] Modal dialogs trap focus and return focus on close
- [ ] Dropdown menus navigable with arrow keys
- [ ] Form submission possible with Enter key
- [ ] Escape key closes modals and dropdowns

### Screen Reader Support
- [ ] All images have descriptive alt text (or alt="" if decorative)
- [ ] Icon-only buttons have aria-label attributes
- [ ] Form inputs have associated label elements
- [ ] Error messages announced via aria-live regions
- [ ] Page landmarks defined (nav, main, aside, footer)
- [ ] Headings follow logical hierarchy (no skipped levels)
- [ ] Link text descriptive (avoid "click here")
- [ ] ARIA roles used correctly (don't override semantic HTML)
- [ ] Dynamic content changes announced (loading states, etc.)
- [ ] Tables have proper th/td structure with scope attributes

### Color & Contrast
- [ ] Body text meets 4.5:1 contrast ratio
- [ ] Large text (18px+/24px+) meets 3:1 contrast ratio
- [ ] Interactive elements meet 3:1 contrast ratio
- [ ] Focus indicators meet 3:1 contrast ratio against background
- [ ] Information not conveyed by color alone (use icons, text)
- [ ] Links distinguishable from surrounding text (not just color)
- [ ] Dark mode maintains same contrast ratios

### Visual & Motion
- [ ] Text resizable up to 200% without loss of functionality
- [ ] No horizontal scrolling at 320px width
- [ ] Touch targets minimum 44x44px (48x48px preferred)
- [ ] prefers-reduced-motion respected (disable animations)
- [ ] No auto-playing videos or audio
- [ ] No content flashes more than 3 times per second
- [ ] Tooltips appear on hover AND focus

### Forms
- [ ] All inputs have visible, persistent labels
- [ ] Required fields marked (visually and with aria-required)
- [ ] Error messages specific and associated with field (aria-describedby)
- [ ] Success messages announced to screen readers
- [ ] Autocomplete attributes used where appropriate
- [ ] Multi-step forms indicate progress
- [ ] Submit button disabled state has aria-disabled
- [ ] Phone number fields accept various formats

### Testing Tools
- [ ] Run axe DevTools (0 violations)
- [ ] Run Lighthouse accessibility audit (95+ score)
- [ ] Test with screen reader (NVDA on Windows, VoiceOver on Mac)
- [ ] Test keyboard-only navigation
- [ ] Validate HTML (no errors)

---

## Performance Checklist

### Images
- [ ] All images compressed (target <200kb per image)
- [ ] Modern formats used (WebP with JPG/PNG fallback)
- [ ] Responsive images via srcset or Vercel Image Optimization
- [ ] Hero images preloaded (priority fetch)
- [ ] Below-fold images lazy-loaded
- [ ] Image dimensions specified (width/height to prevent CLS)
- [ ] Alt text provided for all content images
- [ ] Icons served as SVG (not icon fonts or PNGs)
- [ ] Before/after images optimized (often largest assets)

### Fonts
- [ ] Web fonts preloaded in <head>
- [ ] font-display: swap used to prevent FOIT
- [ ] Variable font used (fewer requests than multiple weights)
- [ ] Only necessary weights/styles loaded
- [ ] Self-hosted OR Google Fonts with preconnect

### JavaScript
- [ ] Critical JS inlined or preloaded
- [ ] Non-critical scripts deferred
- [ ] EmailJS script loaded asynchronously
- [ ] Vercel Analytics loaded asynchronously
- [ ] No render-blocking scripts in <head>
- [ ] Third-party scripts loaded with async/defer
- [ ] Bundle size analyzed (target <200kb total JS)
- [ ] Code splitting used for route-based chunks
- [ ] Tree-shaking enabled (Vite does this by default)

### CSS
- [ ] Critical CSS inlined (above-fold styles)
- [ ] Unused Tailwind classes purged in production
- [ ] No @import statements (use bundler)
- [ ] Autoprefixer used for vendor prefixes
- [ ] Minified in production build

### Core Web Vitals
- [ ] LCP under 2.5s (test on 3G throttling)
- [ ] FID under 100ms (minimal JavaScript execution)
- [ ] CLS under 0.1 (no layout shifts)
- [ ] INP under 200ms (input responsiveness)
- [ ] TTFB under 800ms (server response time)

### Loading Strategy
- [ ] Hero section renders without JavaScript
- [ ] Content visible before full interactivity
- [ ] Loading states for async content (forms, etc.)
- [ ] Skeleton screens or spinners for slow loads
- [ ] Graceful degradation if JS fails

### Caching & Delivery
- [ ] Static assets have long cache headers (1 year)
- [ ] HTML has short cache or no-cache (for updates)
- [ ] Vercel Edge Network enabled
- [ ] Compression enabled (gzip/brotli)
- [ ] No unnecessary redirects (check 301/302 chains)

### Testing Tools
- [ ] Lighthouse Performance audit (95+ score)
- [ ] PageSpeed Insights (green scores)
- [ ] WebPageTest (3G Fast test under 5s fully loaded)
- [ ] Chrome DevTools Coverage (check unused code)
- [ ] Network tab analysis (check waterfall for blocking)

### Mobile Performance
- [ ] Test on real devices (iPhone, Android mid-tier)
- [ ] Responsive images serve appropriate sizes
- [ ] Touch interactions smooth (no lag)
- [ ] Avoid heavy animations on mobile

---

## SEO Checklist

### On-Page Basics
- [ ] Unique, descriptive title tag on every page (50-60 chars)
- [ ] Title format: "[Service] in [City] | Midwest Roots Tree Service"
- [ ] Meta description on every page (150-160 chars, includes CTA)
- [ ] One H1 per page (includes primary keyword + location)
- [ ] Logical heading hierarchy (H1 → H2 → H3, no skips)
- [ ] URL structure clean and descriptive (no ?id=123)
- [ ] Canonical tags set (avoid duplicate content)
- [ ] Robots.txt allows indexing of public pages
- [ ] XML sitemap generated and submitted to Search Console

### Content Quality
- [ ] Primary keyword in first 100 words
- [ ] Keyword variations used naturally (not stuffed)
- [ ] Content answers user intent (matches search query)
- [ ] Unique content per page (no thin/duplicate pages)
- [ ] Minimum 300 words on service/location pages
- [ ] Internal links use descriptive anchor text (not "click here")
- [ ] External links open in new tab (rel="noopener noreferrer")

### Local SEO
- [ ] NAP (Name, Address, Phone) consistent across site
- [ ] NAP in footer on every page
- [ ] City/state mentioned in content naturally
- [ ] Service area pages created for each city
- [ ] Neighborhood pages link back to city hub pages
- [ ] Google Business Profile claimed and optimized
- [ ] Local schema markup implemented (see below)
- [ ] "Near me" search intent addressed in content

### Technical SEO
- [ ] HTTPS enabled (SSL certificate)
- [ ] Mobile-friendly (passes Google Mobile-Friendly Test)
- [ ] Page speed optimized (see Performance section)
- [ ] 404 page exists and is helpful
- [ ] No broken links (check with Screaming Frog or similar)
- [ ] Redirects set up for any moved/deleted pages
- [ ] Hreflang tags if serving multiple languages (N/A for now)
- [ ] Structured data validates with Google Rich Results Test

### Open Graph & Social
- [ ] og:title meta tag
- [ ] og:description meta tag
- [ ] og:image meta tag (1200x630px image)
- [ ] og:type meta tag (website)
- [ ] og:url meta tag (canonical URL)
- [ ] twitter:card meta tag (summary_large_image)
- [ ] Social share image designed and optimized

---

## Schema Markup Checklist

### LocalBusiness Schema (All Pages)
```json
Required fields:
- [ ] @type: "LocalBusiness" or "ProfessionalService"
- [ ] name: "Midwest Roots Tree Service"
- [ ] image: Logo URL
- [ ] telephone: "(402) XXX-XXXX"
- [ ] address: Street, city, state, ZIP
- [ ] priceRange: "$$ - $$$" or equivalent
- [ ] areaServed: Array of cities/regions
- [ ] openingHours: If available
- [ ] sameAs: Social media profile URLs
```

### Service Schema (Service Pages)
```json
Required fields:
- [ ] @type: "Service"
- [ ] name: Service name (e.g., "Tree Removal")
- [ ] provider: Reference to LocalBusiness
- [ ] areaServed: Cities where offered
- [ ] description: 1-2 sentence service description
- [ ] serviceType: Standardized service category
```

### Review/AggregateRating Schema (If Reviews Exist)
```json
Required fields:
- [ ] @type: "AggregateRating"
- [ ] ratingValue: Average rating (e.g., 4.8)
- [ ] reviewCount: Total number of reviews
- [ ] bestRating: "5"
- [ ] worstRating: "1"
Note: Only add if you have real reviews (no fake data)
```

### BreadcrumbList Schema (All Interior Pages)
```json
Required fields:
- [ ] @type: "BreadcrumbList"
- [ ] itemListElement: Array of breadcrumb items
  - [ ] Each item has position, name, item (URL)
```

### FAQPage Schema (FAQ Sections)
```json
Required fields:
- [ ] @type: "FAQPage"
- [ ] mainEntity: Array of Question objects
  - [ ] Each Question has name (question text)
  - [ ] Each Question has acceptedAnswer with text
```

### ImageObject Schema (Before/After Images)
```json
Required fields:
- [ ] @type: "ImageObject"
- [ ] url: Image URL
- [ ] caption: Description of work shown
- [ ] width: Image width in pixels
- [ ] height: Image height in pixels
```

### Organization Schema (Homepage)
```json
Required fields:
- [ ] @type: "Organization"
- [ ] name: Company name
- [ ] logo: Logo URL (square, 512x512px+)
- [ ] url: Homepage URL
- [ ] contactPoint: Phone, contactType: "customer service"
- [ ] sameAs: Social profile URLs
```

### Schema Validation
- [ ] All schema validates at schema.org validator
- [ ] No errors in Google Rich Results Test
- [ ] No warnings in Search Console (Enhancements section)

---

## AI Overview & GEO Optimization Checklist

### Featured Snippet Targeting
- [ ] "What is [service]?" sections on service pages
- [ ] Clear, concise definitions (40-60 words)
- [ ] Formatted as paragraphs, lists, or tables
- [ ] Answer positioned early on page (above fold)
- [ ] H2 heading posed as question (e.g., "What is Tree Removal?")

### List/Table Optimization
- [ ] Process steps in numbered lists
- [ ] Pricing guides in table format (if applicable)
- [ ] Comparison tables (e.g., service types)
- [ ] "How to" instructions in ordered lists
- [ ] "Pros and cons" in bulleted lists

### Entity & Semantic Optimization
- [ ] Company name mentioned consistently
- [ ] Location entities clear (city, state, neighborhoods)
- [ ] Service entities standardized (use industry terms)
- [ ] Related entities mentioned (tree species, tools, etc.)
- [ ] Natural language questions answered (who, what, when, where, why)

### Content Depth
- [ ] Service pages minimum 500 words
- [ ] City hub pages minimum 400 words
- [ ] Homepage minimum 300 words (not counting footer)
- [ ] Unique content per location page (not templated)
- [ ] Covers user intent fully (no thin content)

### Internal Linking Patterns
- [ ] Hub pages link to all spoke pages
- [ ] Spoke pages link back to hub
- [ ] Related service cross-links (e.g., removal → stump grinding)
- [ ] Location pages interlinked (city → neighborhoods)
- [ ] Anchor text varied and descriptive
- [ ] No orphan pages (all pages reachable from nav/footer)
- [ ] Link depth: All pages reachable within 3 clicks from homepage

### E-E-A-T Signals (Experience, Expertise, Authority, Trust)
- [ ] About page with team bios (Andrew's experience)
- [ ] Certifications displayed (ISA, insurance)
- [ ] Years in business mentioned
- [ ] Real customer testimonials with names/locations
- [ ] Before/after photo gallery (real projects)
- [ ] Educational content (blog, tools, guides)
- [ ] Contact information prominent
- [ ] Privacy policy and terms of service pages

---

## Pre-Launch Final Checks

### Content Audit
- [ ] No Lorem Ipsum placeholder text
- [ ] No fake statistics or claims (see DESIGN_BRIEF.md rules)
- [ ] Phone number is real and correct
- [ ] Email address is real and monitored
- [ ] EmailJS credentials configured
- [ ] Social media links point to real profiles
- [ ] Service area cities are accurate
- [ ] All images have real content (no stock placeholders)
- [ ] Copyright year in footer is current

### Functional Testing
- [ ] All forms submit successfully
- [ ] Email notifications received (EmailJS test)
- [ ] All internal links work (no 404s)
- [ ] All external links work and open in new tab
- [ ] Mobile menu opens and closes
- [ ] Dark mode toggle works (if implemented)
- [ ] Contact buttons initiate calls on mobile
- [ ] Emergency CTA phone link works
- [ ] All CTAs lead to correct destinations

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, iOS and macOS)
- [ ] Edge (latest)
- [ ] Samsung Internet (Android)
- [ ] Test on at least 3 different screen sizes (mobile, tablet, desktop)

### Analytics & Tracking
- [ ] Vercel Analytics installed
- [ ] Google Analytics installed (if using)
- [ ] Google Tag Manager configured (if using)
- [ ] Conversion tracking set up (form submissions)
- [ ] Google Search Console verified
- [ ] Sitemap submitted to Search Console
- [ ] Bing Webmaster Tools verified (optional but recommended)

### Legal & Compliance
- [ ] Privacy policy page exists
- [ ] Terms of service page exists
- [ ] Cookie consent banner (if using tracking cookies)
- [ ] Contact information accurate
- [ ] Business license/insurance info accurate (if displayed)

### Performance Final Check
- [ ] Run Lighthouse on 5 key pages (home, 2 services, 1 city, contact)
- [ ] All pages score 90+ on Performance
- [ ] All pages score 95+ on Accessibility
- [ ] All pages score 95+ on Best Practices
- [ ] All pages score 100 on SEO
- [ ] Test on throttled connection (3G)

---

## Ongoing Monitoring (Post-Launch)

### Weekly
- [ ] Check Search Console for errors
- [ ] Monitor form submission notifications
- [ ] Review Vercel Analytics for traffic patterns
- [ ] Check for broken links

### Monthly
- [ ] Review Google Business Profile insights
- [ ] Check keyword rankings (Google Search Console)
- [ ] Audit Core Web Vitals (Search Console → Experience)
- [ ] Review top landing pages (which are performing)
- [ ] Check for crawl errors or schema warnings

### Quarterly
- [ ] Content refresh (update stats, add new testimonials)
- [ ] Re-run Lighthouse audits
- [ ] Competitor analysis (what are others doing?)
- [ ] Expand to new service area pages if needed
- [ ] Add new blog content

---

**End of UI Checklist**

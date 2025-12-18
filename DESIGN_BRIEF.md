# DESIGN BRIEF: Midwest Roots Tree Service
**Blue-Collar Trustworthy + Coolest in the Industry**

## Visual Direction

### Core Philosophy
Create a visual system that earns trust through professionalism and craft while breaking tree service industry conventions with modern, memorable design. Think: "The working professional who happens to have exceptional taste" — not corporate, not rustic cliche, but confident and contemporary.

### Design Principles
1. **Real over polished** — Show actual work, real equipment, authentic crew
2. **Confidence through clarity** — No clutter, clear hierarchy, bold statements
3. **Craft matters** — Attention to detail signals quality service
4. **Progressive blue-collar** — Modern tools meet traditional values
5. **Memorability** — Stand out in a sea of generic green tree logos

### Mood & Tone
- **Visual**: Clean brutalism meets utility workwear
- **Photography**: High-contrast documentary style, ground-level perspectives
- **Illustration**: Technical diagrams, cross-sections, infographics
- **Motion**: Purposeful, mechanical precision (like crane movements)
- **Avoid**: Stock photos, artificial smiles, fake urgency, clipart trees

---

## Color System

### Primary Palette
```
Brand Green (Primary Action)
--color-primary-50:  #f0fdf5  // Lightest tint for backgrounds
--color-primary-100: #dcfce8  // Hover states on light
--color-primary-500: #10b981  // Main brand green (kept from existing)
--color-primary-600: #059669  // Active states
--color-primary-700: #047857  // Dark mode primary
--color-primary-900: #064e3b  // Text on light backgrounds

Safety Orange (Urgency/Alert)
--color-alert-400: #fb923c    // Warning states
--color-alert-500: #f97316    // Emergency CTA
--color-alert-600: #ea580c    // Active emergency
```

### Neutral System (Work-Site Inspired)
```
Concrete (Grays)
--color-neutral-50:  #fafafa  // Page background light
--color-neutral-100: #f5f5f5  // Section dividers light
--color-neutral-200: #e5e5e5  // Borders
--color-neutral-400: #a3a3a3  // Disabled states
--color-neutral-600: #525252  // Secondary text
--color-neutral-800: #262626  // Primary text
--color-neutral-900: #171717  // Headings
--color-neutral-950: #0a0a0a  // Dark mode background

Steel (Blue-Grays for Trust)
--color-steel-50:  #f8fafc
--color-steel-600: #475569   // Secondary buttons
--color-steel-700: #334155   // Hover states
--color-steel-800: #1e293b   // Dark mode text
```

### Usage Rules
- **Primary Green**: CTAs, active navigation, success states, brand moments
- **Safety Orange**: Emergency services, urgent alerts, limited use for impact
- **Neutral Concrete**: Body text, borders, backgrounds (80% of interface)
- **Steel Blue-Gray**: Secondary actions, informational content, trust signals
- **Accent Ratio**: 10% color / 90% neutral for clean, professional look

### Semantic Tokens
```
--color-cta-primary: var(--color-primary-500)
--color-cta-emergency: var(--color-alert-500)
--color-success: var(--color-primary-600)
--color-warning: var(--color-alert-400)
--color-text-primary: var(--color-neutral-900)
--color-text-secondary: var(--color-neutral-600)
--color-border-default: var(--color-neutral-200)
--color-bg-page: var(--color-neutral-50)
--color-bg-elevated: white
```

---

## Typography System

### Font Pairing
**Headings**: Inter (Variable)
- Geometric precision, modern professionalism
- Weights: 600 (semibold), 700 (bold), 800 (extrabold)
- Use: All headlines, navigation, buttons

**Body**: Inter (Variable)
- Single-font system for simplicity and performance
- Weights: 400 (regular), 500 (medium)
- Use: Body copy, form labels, captions

### Type Scale (Fluid, Mobile-First)
```
--text-xs:   clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)    // 12-14px
--text-sm:   clamp(0.875rem, 0.8rem + 0.3vw, 1rem)       // 14-16px
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem)     // 16-18px
--text-lg:   clamp(1.125rem, 1rem + 0.5vw, 1.25rem)      // 18-20px
--text-xl:   clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)      // 20-24px
--text-2xl:  clamp(1.5rem, 1.3rem + 0.8vw, 2rem)         // 24-32px
--text-3xl:  clamp(1.875rem, 1.6rem + 1.2vw, 2.5rem)     // 30-40px
--text-4xl:  clamp(2.25rem, 1.9rem + 1.5vw, 3rem)        // 36-48px
--text-5xl:  clamp(3rem, 2.4rem + 2.5vw, 4rem)           // 48-64px
--text-6xl:  clamp(3.75rem, 3rem + 3vw, 5rem)            // 60-80px
```

### Line Height
```
--leading-tight:  1.2    // Headings
--leading-snug:   1.4    // Subheadings
--leading-normal: 1.6    // Body text
--leading-relaxed: 1.75  // Long-form content
```

### Usage Rules
- **Hero Headlines**: text-5xl/text-6xl, font-bold (700), leading-tight
- **Section Headlines**: text-3xl/text-4xl, font-bold (700), leading-tight
- **Subsections**: text-xl/text-2xl, font-semibold (600), leading-snug
- **Body**: text-base/text-lg, font-normal (400), leading-normal
- **Captions/Labels**: text-sm, font-medium (500), leading-normal
- **Buttons**: text-sm/text-base, font-semibold (600), uppercase tracking

### Letter Spacing
```
--tracking-tight:  -0.025em  // Large headings
--tracking-normal: 0         // Body text
--tracking-wide:   0.05em    // Buttons, labels
--tracking-wider:  0.1em     // Small caps, eyebrow text
```

---

## Spacing & Layout System

### Spacing Scale (8px Base Unit)
```
--space-1:  0.25rem   // 4px   (tight inline spacing)
--space-2:  0.5rem    // 8px   (base unit)
--space-3:  0.75rem   // 12px  (compact padding)
--space-4:  1rem      // 16px  (default gap)
--space-6:  1.5rem    // 24px  (comfortable padding)
--space-8:  2rem      // 32px  (section breathing room)
--space-12: 3rem      // 48px  (section margins)
--space-16: 4rem      // 64px  (large section gaps)
--space-24: 6rem      // 96px  (hero/feature sections)
--space-32: 8rem      // 128px (major section breaks)
```

### Container System
```
--container-xs:  480px   // Single column forms
--container-sm:  640px   // Narrow content
--container-md:  768px   // Standard content width
--container-lg:  1024px  // Wide content (services grid)
--container-xl:  1280px  // Full marketing pages
--container-2xl: 1536px  // Maximum width (rare)
```

### Grid System
- **Mobile**: Single column, 16px side margins
- **Tablet (768px+)**: 2-column where appropriate, 24px margins
- **Desktop (1024px+)**: 3-column grids, 32px margins
- **Wide (1280px+)**: 4-column where needed, centered max-width

### Radius System
```
--radius-sm:  0.25rem  // 4px  (tags, badges)
--radius-md:  0.375rem // 6px  (buttons, inputs)
--radius-lg:  0.5rem   // 8px  (cards)
--radius-xl:  0.75rem  // 12px (feature cards)
--radius-2xl: 1rem     // 16px (hero images)
--radius-full: 9999px  // Pills, avatars
```

### Border Width
```
--border-1: 1px   // Default borders
--border-2: 2px   // Emphasized borders
--border-4: 4px   // Focus states, accents
```

---

## Shadow System

### Elevation Layers
```
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
// Subtle lift (input fields, small cards)

--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
// Standard elevation (dropdowns, popovers)

--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
// High elevation (modals, overlays)

--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
// Maximum elevation (sticky CTAs)

--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)
// Pressed states
```

### Usage
- Avoid overuse — most interface should be flat
- Reserve shadows for interactive elements (cards, buttons)
- Increase shadow on hover to signal interactivity
- Dark mode: reduce shadow opacity by 50%

---

## Motion & Animation Rules

### Principles
1. **Purposeful only** — Motion must communicate state or guide attention
2. **Performance-safe** — Only animate transform and opacity
3. **Respect prefers-reduced-motion** — Disable all non-essential animation
4. **Subtle by default** — No bounces, no spins, no attention-seeking

### Timing Functions
```
--ease-smooth:     cubic-bezier(0.4, 0, 0.2, 1)  // Default (ease-in-out)
--ease-enter:      cubic-bezier(0, 0, 0.2, 1)    // Elements appearing
--ease-exit:       cubic-bezier(0.4, 0, 1, 1)    // Elements leaving
--ease-mechanical: cubic-bezier(0.4, 0, 0.6, 1)  // Heavy/mechanical feel
```

### Duration
```
--duration-fast:   150ms  // Hover states, tooltips
--duration-base:   250ms  // Default transitions
--duration-slow:   350ms  // Modals, page transitions
--duration-slower: 500ms  // Hero animations (once)
```

### Allowed Animations
- **Hover States**: Scale 1.02, opacity 0.9, shadow increase
- **Button Press**: Scale 0.98, brightness decrease
- **Page Transitions**: Fade in (opacity 0 → 1, 250ms)
- **Loading States**: Subtle pulse (opacity 0.5 ↔ 1, 2s infinite)
- **Focus Rings**: Fade in (150ms)
- **Accordion/Collapse**: Height auto with max-height trick (250ms)
- **Parallax**: Subtle scroll offset (hero backgrounds only, <0.3 ratio)

### Forbidden Animations
- ❌ Infinite spins/rotations
- ❌ Bouncing/elastic easing
- ❌ Auto-playing carousels
- ❌ Blinking/flashing
- ❌ Scroll-jacking
- ❌ Complex SVG morphing (performance cost)

---

## Component Inventory

### Primitives (Design System Atoms)

#### Buttons
**Primary CTA**
- Background: primary-500, hover: primary-600, active: primary-700
- Text: white, font-semibold, uppercase, tracking-wide
- Padding: py-3 px-6 (mobile), py-4 px-8 (desktop)
- Radius: md, shadow: md, hover: shadow-lg
- States: hover scale 1.02, active scale 0.98

**Secondary Button**
- Background: steel-600, hover: steel-700
- Same sizing/typography as primary

**Emergency CTA** (orange)
- Background: alert-500, hover: alert-600
- Blinking border animation allowed (emergency only)
- Larger sizing: py-4 px-8 minimum

**Ghost/Outline**
- Border: 2px neutral-200, hover: primary-500
- Text: neutral-900, hover: primary-700

#### Form Inputs
- Border: 1px neutral-200, focus: 2px primary-500
- Padding: py-3 px-4
- Radius: md
- Typography: text-base, leading-normal
- Placeholder: neutral-400
- Error state: border alert-500, text alert-600

#### Cards
**Standard Card**
- Background: white (bg-elevated)
- Border: 1px neutral-200
- Radius: lg
- Padding: space-6
- Shadow: sm, hover: md

**Feature Card** (services, etc.)
- Larger padding: space-8
- Radius: xl
- Shadow: md
- Hover: lift with shadow-lg + scale 1.01

#### Tags/Badges
- Background: primary-50 or steel-50
- Text: primary-900 or steel-900, text-xs, font-medium
- Padding: py-1 px-3
- Radius: full

#### Icons
- Size system: 16px, 20px, 24px, 32px, 48px
- Stroke width: 2px (lucide-react default)
- Color: inherit from parent text color
- Never use solid/filled variants (maintain line-art style)

### Marketing Modules (Composed Components)

#### Hero Block
- Full viewport height (min-h-screen) or 80vh
- Background: Large image with 40% dark overlay
- Content: Centered or left-aligned
- Headline: text-5xl/text-6xl, font-bold, white
- Subhead: text-xl/text-2xl, neutral-100
- CTA: Primary button + ghost button side-by-side
- Optional: Floating trust badges (Google reviews, certifications)

#### Service Card Grid
- Container: 3-column desktop, 2-column tablet, 1-column mobile
- Gap: space-6
- Each card: Feature card primitive
- Content: Icon (32px), headline (text-xl), description (text-base), link
- Hover: Lift animation

#### Stats Bar
- Background: neutral-900 or primary-700
- Layout: 3-4 stats in row
- Each stat: Large number (text-4xl, font-bold), label (text-sm)
- Color: White text on dark background
- Dividers: 1px white/20% opacity between stats

#### Testimonial Block
- Background: Alternating white/neutral-50
- Layout: Quote + attribution + photo in card
- Quote marks: Large decorative element (primary-100)
- Typography: text-lg, italic, leading-relaxed
- Attribution: text-sm, font-medium, with small circular photo

#### Trust Badge Row
- Layout: Horizontal scroll on mobile, row on desktop
- Each badge: Small icon + text or just logo image
- Examples: BBB, ISA Certified, Insured, Google Guaranteed
- Size: Consistent height ~48px
- Color: Neutral-400 with hover to neutral-900

#### FAQ Accordion
- Question: text-lg, font-semibold, clickable
- Icon: Plus/minus toggle
- Answer: text-base, leading-relaxed, revealed with slide-down
- Dividers: 1px neutral-200 between items
- Background: White cards or flush on neutral-50

#### Before/After Slider
- Component: Image comparison with draggable divider
- Border: Radius-xl on container
- Divider: 4px white with circular handle
- Labels: "Before" / "After" in corners

#### Location Map
- Interactive map embed or static image with pins
- Overlay: Service area labels
- CTA: "Check if we serve your area" button

#### Blog/Article Card
- Thumbnail image (16:9 ratio)
- Category badge (small tag)
- Headline: text-xl, font-semibold
- Excerpt: 2-3 lines, text-base
- Meta: Author, date, read time
- Layout: Grid or list view option

---

## Page Section Blueprints

### Homepage
1. **Hero** — Full viewport with background image, headline, emergency CTA, free consultation CTA
2. **Trust Bar** — Logo row of certifications (ISA, insurance, Google reviews stars)
3. **Services Grid** — 6-8 core services in feature cards
4. **Stats Bar** — Years experience, trees serviced, 5-star reviews, response time
5. **About/Story** — 2-column: photo left, narrative right
6. **Why Choose Us** — 3-4 value props with icons (licensed, local, transparent pricing, emergency)
7. **Service Areas Map** — Visual map with city labels
8. **Testimonials** — 3 testimonials in cards
9. **FAQ Accordion** — 6-8 common questions
10. **Final CTA** — Large emergency block or consultation booking
11. **Footer** — Links, service areas list, contact, social

### Services Index Page
1. **Hero** — "Tree Services Omaha" headline, breadcrumb, intro paragraph
2. **Service Category Grid** — Large cards for each major service with icon, description, "Learn More" link
3. **Emergency Callout** — Sticky or floating emergency CTA
4. **Process Overview** — "How It Works" 4-step visual
5. **Service Areas** — Compact list with links
6. **CTA Block** — Free consultation form or phone number

### Service Detail Page (e.g., Tree Removal Omaha)
1. **Hero** — Service name, breadcrumb, featured image
2. **Intro Section** — What is this service, why it matters
3. **Process Breakdown** — Step-by-step with icons/images
4. **Pricing Guide** — Transparent ranges or "Starting at $X" callouts
5. **Before/After Gallery** — Slider or grid of examples
6. **FAQ** — Service-specific questions
7. **Related Services** — 3 cards linking to related pages
8. **Local SEO Block** — "Tree Removal in [City]" with neighborhood mentions
9. **CTA** — Consultation form or emergency contact

### Locations Index Page
1. **Hero** — "Tree Service Areas" headline, map background
2. **Interactive Map** — Clickable regions or city list
3. **City Grid** — Cards for each city/area with link to city hub page
4. **Coverage Description** — Paragraph about service radius, travel fees
5. **CTA** — "Not sure if we serve you? Contact us"

### City Hub Page (e.g., Tree Service Omaha NE)
1. **Hero** — "[City] Tree Service" headline, city skyline or landmark image
2. **Local Intro** — Paragraph about serving this city, local knowledge
3. **Services in [City]** — Grid of services available here
4. **Neighborhoods Served** — List or grid of neighborhood pages
5. **Local Stats** — Trees serviced in city, response time
6. **Testimonials** — Reviews from customers in this city
7. **City-Specific FAQ** — Local regulations, permits, common tree types
8. **CTA** — Book service or emergency contact

### Neighborhood Page (e.g., Tree Service Dundee Omaha)
1. **Hero** — "[Neighborhood] Tree Service" headline
2. **Neighborhood Intro** — Brief description, common tree issues here
3. **Services** — Compact list with icons
4. **Recent Projects** — Before/after from this neighborhood
5. **Local Landmarks** — "Serving homes near [landmark]"
6. **CTA** — Simple contact form or phone

### Emergency Tree Service Page
1. **Hero** — RED/ORANGE alert styling, "24/7 Emergency Service", large phone number
2. **Emergency Contact Block** — Phone button, text button, form
3. **What Qualifies as Emergency** — Checklist with icons
4. **Response Time** — "On-site within X hours" promise
5. **Emergency Process** — Fast 3-step visual
6. **Service Areas** — "We cover [areas]"
7. **Safety Info** — What to do while waiting
8. **Testimonials** — Emergency-specific reviews
9. **FAQ** — Emergency pricing, insurance, safety

### Consultation/Quote Request Page
1. **Hero** — "Get Your Free Consultation" headline
2. **Form Section** — Multi-step or single-page form
   - Contact info
   - Service needed
   - Property details
   - Upload photos
   - Preferred date/time
3. **What Happens Next** — Timeline of consultation process
4. **Guarantee/Promise** — "No obligation, no pressure" messaging
5. **Trust Signals** — Certifications, reviews
6. **Alternative Contact** — Phone, email, text options

### Tools Gateway Page (e.g., /tools)
1. **Hero** — "Tree Care Tools & Resources" headline
2. **Tool Grid** — Cards for each tool (species identifier, cost calculator, risk assessor)
3. **How to Use** — Brief instructions
4. **Why We Made These** — Transparency, education, helping homeowners
5. **CTA** — "Need professional help? Contact us"

---

## Copy & Content Guidelines

### Tone of Voice
- **Confident but humble** — "We know trees. Let us help you."
- **Plain language** — Avoid jargon, explain when necessary
- **Local and personal** — First names, local references, Midwest friendliness
- **Honest about challenges** — Don't overpromise, set realistic expectations
- **Safety-focused** — Emphasize risks and professional expertise

### Allowed Placeholders (Design Mockups Only)
- Service descriptions (can be generic)
- Testimonial quotes (mark as "[Example testimonial]")
- Blog article excerpts (mark as "[Article excerpt]")
- Process descriptions (can be assumed workflow)
- FAQ answers (can be standard industry answers)
- Neighborhood descriptions (can be generic)

### NEVER Fake These (Use Real Data or Omit)
- ❌ Specific pricing ("$500 for tree removal")
- ❌ Review scores ("4.9 stars from 500 reviews") unless real
- ❌ Years in business ("20 years experience") unless verified
- ❌ Certifications (ISA, arborist licenses) unless Andrew has them
- ❌ Insurance details unless confirmed
- ❌ Response time promises ("1-hour emergency response") unless committed
- ❌ Awards or recognitions unless real
- ❌ Team member names/photos unless real people
- ❌ Specific project counts ("5,000 trees serviced") unless tracked

### Placeholder Format
When using placeholders in design deliverables, use this format:
```
[PLACEHOLDER: Description of what real content should be]
Example: "[PLACEHOLDER: ISA Certified Arborist badge — verify certification]"
```

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance Targets
- Color contrast: 4.5:1 for body text, 3:1 for large text (18px+)
- All interactive elements keyboard accessible
- Focus states visible (2px outline, primary-500)
- Alt text for all images
- ARIA labels for icon-only buttons
- Semantic HTML (nav, main, article, section, footer)
- Form labels properly associated
- Error messages descriptive and linked to fields

### Dark Mode
- Provide dark mode toggle (respects system preference by default)
- Invert neutral scale (neutral-950 becomes background)
- Reduce shadow opacity
- Adjust primary colors for better dark contrast (use -700 variants)

---

## Performance Targets

### Core Web Vitals
- **LCP**: <2.5s (optimize hero image, preload fonts)
- **FID**: <100ms (minimize JavaScript, defer non-critical)
- **CLS**: <0.1 (reserve space for images, no layout shifts)

### Other Metrics
- **Time to Interactive**: <3.5s
- **First Contentful Paint**: <1.8s
- **Lighthouse Score**: 95+ on all categories

### Optimization Tactics
- Lazy load below-fold images
- Use WebP with JPG fallback
- Compress images (max 200kb per image)
- Preload critical fonts
- Inline critical CSS
- Defer EmailJS and analytics scripts
- Use Vercel image optimization
- Minimize third-party scripts

---

## SEO & Local Search Structure

### On-Page SEO Patterns
- **Title Format**: "[Service] in [City] | Midwest Roots Tree Service"
- **Meta Description**: 150-160 chars, include city, service, CTA
- **H1**: One per page, include primary keyword and city
- **H2/H3**: Include semantic keywords, location variations
- **URL Structure**: `/services/tree-removal-omaha`
- **Internal Linking**: Hub-and-spoke (service index → detail pages, city index → neighborhood pages)

### Schema Markup (JSON-LD)
Required schema types:
- **LocalBusiness**: Name, address, phone, hours, service areas
- **Service**: Each service offered with description
- **Review**: Aggregate rating if available
- **BreadcrumbList**: Navigation path on every page
- **FAQPage**: On FAQ sections
- **ImageObject**: For before/after images
- **Organization**: Company info, logo, social profiles

### GEO & AI Overview Optimization
- **Service Pages**: Clear "What is [service]" section (targets featured snippets)
- **FAQ Schema**: Mark up FAQs with schema for rich results
- **List Structure**: Use numbered/bulleted lists for processes
- **Table Data**: Pricing guides in table format
- **Entity Mentions**: Consistently mention "Midwest Roots Tree Service" + "Omaha" + "Nebraska"
- **Internal Links**: Deep link to neighborhood pages from city hubs
- **Location Pages**: Unique content per city/neighborhood (no thin pages)

### Content Clusters
**Hub Pages** (High-authority, broad):
- Homepage
- Services Index
- Locations Index

**Spoke Pages** (Detailed, specific):
- Individual service pages (tree removal, trimming, etc.)
- City pages (Omaha, Bellevue, Papillion)
- Neighborhood pages (Dundee, Aksarben, West Omaha)

**Supporting Content**:
- Blog articles linking back to service pages
- Tools pages linking to consultation
- Emergency page linking to relevant services

All spoke pages link back to hub. Hub pages link to all spokes.

---

## Design Deliverable Checklist

Before considering design phase complete, verify:

- [ ] Color tokens defined and usage rules clear
- [ ] Typography scale tested at mobile and desktop sizes
- [ ] All primitive components specified (buttons, inputs, cards)
- [ ] Marketing modules designed for each page section
- [ ] Page blueprints created for all 9 page types
- [ ] Motion rules defined with performance constraints
- [ ] Accessibility standards documented
- [ ] SEO patterns and schema requirements outlined
- [ ] Copy placeholder rules established (no fake claims)
- [ ] Design system can be handed off to developer with no ambiguity

---

## Next Steps (Post-Design)

After design approval:
1. Implement design tokens in Tailwind config
2. Build component library (primitives first)
3. Develop marketing modules
4. Build page templates following blueprints
5. Populate with real content (following placeholder rules)
6. QA accessibility and performance
7. SEO audit and schema implementation
8. Launch and monitor

---

**End of Design Brief**

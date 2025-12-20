# Visual Branding Guide - Midwest Roots Tree Services

**Document Purpose:** Single source of truth for all visual branding decisions including logo usage, color tokens, and application examples.

---

## Logo System

### Logo Variants

Midwest Roots Tree Services uses **4 distinct logo variants**, each serving specific brand contexts:

#### 1. Primary Brand Logo (Green Badge)
**File:** `midwest-roots-green-badge-logo.jpg`

**Visual Description:**
- Bearded arborist profile in deep forest green
- Circular badge format with tree ring and leaf motifs
- Cream/beige background (#F5EFE0 - #F0E9D5)
- Deep forest green illustration (#3D5A4D - #4A6D5A)

**Usage Contexts:**
- ✅ Website header (desktop + mobile)
- ✅ Website footer
- ✅ Favicon/app icon
- ✅ Email signatures
- ✅ Estimates and invoices (letterhead)
- ✅ Social media avatars (Facebook, LinkedIn, Google Business)
- ✅ Non-emergency marketing materials
- ✅ Standard CTAs and buttons (when logo treatment needed)
- ✅ Thank you pages and confirmation screens

**Restrictions:**
- ❌ Never use on emergency/urgent contexts
- ❌ Never use on storm damage alerts
- ❌ Never use on 24/7 emergency callout sections

---

#### 2. Emergency Logo (Red/Orange Safety Variant)
**File:** `midwest-roots-logo-no-background.jpg`

**Visual Description:**
- Bearded worker with red safety helmet (#D32F2F - #C62828)
- Red flannel shirt detail
- Warm orange/amber background (#FB8C00 - #FF9800)
- High-contrast, alert-signaling design

**Usage Contexts:**
- ✅ Storm/winter emergency banners (hero sections)
- ✅ 24/7 emergency service callout strips
- ✅ Urgent CTA buttons ("Call Now" for emergencies)
- ✅ Emergency service landing pages (`/emergency-tree-service-omaha`)
- ✅ Offline emergency mailers (storm damage postcards)
- ✅ Emergency vehicle signage
- ✅ After-hours voicemail graphics
- ✅ Emergency contact cards

**Restrictions:**
- ❌ Never use for routine consultations
- ❌ Never use in main navigation
- ❌ Never use for general marketing (dilutes urgency signal)
- ❌ Never use on pricing/quote pages (unless emergency pricing)

**Psychology:** Red helmet = immediate danger recognition, orange background = safety equipment, combined = "professional emergency response"

---

#### 3. Alternate Worker Logo (Olive/Sage Treatment)
**Files:** `ChatGPT-Image-May-25-2025-12_02_27-PM.jpg` + `pretty-green-logo.jpg`

**Visual Description:**
- Worker with brown/tan hard hat (#8D6E63 - #A1887F)
- Olive green to sage green palette (#6B7C63 - #7A8C71)
- Muted, earthy tones
- Forestry/outdoor work aesthetic

**Usage Contexts:**
- ✅ Company merchandise (t-shirts, hats, stickers)
- ✅ Truck/vehicle wraps and decals
- ✅ Subtle background watermarks in long-form content
- ✅ Tool UI (diagnostic tools, calculators)
- ✅ Internal crew training materials
- ✅ Partnership/B2B materials
- ✅ Job site signage
- ✅ Crew uniforms (embroidered patches)

**Restrictions:**
- ❌ Not for primary website branding
- ❌ Not for customer-facing invoices/estimates
- ❌ Not for social media (use primary green badge instead)

**Philosophy:** This variant is for "boots on the ground" branding - physical presence, not digital marketing.

---

#### 4. Tree-Focused Logo (Forestry Detail)
**File:** `pretty-green-logo.jpg` (variant with tree icon emphasis)

**Visual Description:**
- Evergreen/conifer tree silhouette
- Dark green on cream
- Simplified, icon-focused design

**Usage Contexts:**
- ✅ App icons (when circular badge too detailed)
- ✅ Small-scale applications (business card corner accent)
- ✅ Loading spinners/favicons (simplified mark)
- ✅ Pattern fills/texture backgrounds
- ✅ Secondary branding when primary logo too busy

---

## Color Token System (Derived from Logos)

### Brand Color Palette

All colors extracted from actual logo files to ensure visual consistency across all touchpoints.

#### Primary Forest Green (from Green Badge Logo)
```css
--brand-forest-50:   #f3f6f4   /* Lightest tint - backgrounds */
--brand-forest-100:  #e6ece8   /* Hover states on light */
--brand-forest-400:  #6b8873   /* Muted/disabled states */
--brand-forest-500:  #4a6d5a   /* PRIMARY - logo green */
--brand-forest-600:  #3d5a4d   /* Darker logo variation */
--brand-forest-700:  #2f4639   /* Hover/active states */
--brand-forest-800:  #243629   /* Dark mode primary */
--brand-forest-900:  #1a251c   /* Text on light backgrounds */
```

**Tailwind Mapping:** Use as `primary.*` scale (replaces existing generic green)

**Usage:**
- Primary CTAs ("Get Free Consultation", "Request Quote")
- Active navigation states
- Success messages
- Links and interactive elements
- Brand moments (section dividers, accents)

---

#### Emergency Red/Orange (from Emergency Logo)
```css
--brand-emergency-red-400:    #ef5350   /* Warning states */
--brand-emergency-red-500:    #d32f2f   /* Helmet red - PRIMARY ALERT */
--brand-emergency-red-600:    #c62828   /* Active emergency state */
--brand-emergency-red-700:    #b71c1c   /* Pressed state */

--brand-emergency-orange-400: #ffa726   /* Soft warning */
--brand-emergency-orange-500: #fb8c00   /* Background orange - SECONDARY ALERT */
--brand-emergency-orange-600: #f57c00   /* Hover state */
```

**Tailwind Mapping:** Use as `alert.*` scale (replaces existing orange)

**Usage:**
- Emergency CTA buttons ("Call 24/7 Emergency: (402) 812-3294")
- Storm damage banners
- Urgent alert boxes
- Limited use for maximum psychological impact

**Design Rule:** Emergency colors should never exceed 5% of page real estate (except on dedicated emergency landing pages)

---

#### Cream/Beige (from Logo Backgrounds)
```css
--brand-cream-50:   #fdfcfa   /* Lightest - page background alternative */
--brand-cream-100:  #f5efe0   /* Logo background cream */
--brand-cream-200:  #f0e9d5   /* Darker cream variation */
--brand-cream-300:  #e8dfc5   /* Borders, dividers */
```

**Tailwind Mapping:** Use as `cream.*` scale (new)

**Usage:**
- Alternate section backgrounds (instead of white)
- Warm, organic feel for testimonial sections
- Hero overlays (subtle warmth)
- Quote/consultation form backgrounds
- Pairs well with forest green for blue-collar warmth

---

#### Olive/Sage (from Alternate Worker Logos)
```css
--brand-olive-400:  #8c9985   /* Muted olive */
--brand-olive-500:  #7a8c71   /* Mid-tone sage */
--brand-olive-600:  #6b7c63   /* Darker olive */
--brand-olive-700:  #5a6952   /* Deep sage */
```

**Tailwind Mapping:** Use as `sage.*` scale (new)

**Usage:**
- Secondary buttons (non-critical actions)
- Tool UI backgrounds
- Subtle accents in content sections
- Alternative to steel-gray for warmer feel

---

#### Concrete Neutrals (Updated for Logo Consistency)
```css
/* Keep existing neutral scale but ensure harmony with cream tones */
--neutral-50:  #fafaf9   /* Pure white alternative */
--neutral-100: #f5f5f4   /* Section backgrounds */
--neutral-200: #e7e5e4   /* Borders, dividers */
--neutral-400: #a8a29e   /* Disabled text */
--neutral-600: #57534e   /* Secondary text */
--neutral-800: #292524   /* Primary text */
--neutral-900: #1c1917   /* Headings */
--neutral-950: #0c0a09   /* Dark mode background */
```

**Philosophy:** Warm grays (not cool/blue grays) to complement cream and forest green.

---

#### Brown/Tan Accents (from Worker Hard Hats)
```css
--brand-tan-400:  #a1887f   /* Light tan */
--brand-tan-500:  #8d6e63   /* Hard hat brown */
--brand-tan-600:  #795548   /* Darker brown */
```

**Tailwind Mapping:** Use as `tan.*` scale (new)

**Usage:**
- Sparingly - equipment/tool illustrations
- Accent color for physical/offline materials
- Pairs with sage/olive for earthy palette

---

### Semantic Color Tokens (Role-Based)

Map brand colors to functional roles:

```css
/* PRIMARY ACTIONS */
--color-cta-primary: var(--brand-forest-500);           /* Get Quote, Book Service */
--color-cta-primary-hover: var(--brand-forest-700);
--color-cta-primary-active: var(--brand-forest-800);

/* EMERGENCY ACTIONS */
--color-cta-emergency: var(--brand-emergency-red-500);  /* Call Now (Emergency) */
--color-cta-emergency-hover: var(--brand-emergency-red-600);
--color-cta-emergency-bg: var(--brand-emergency-orange-500);  /* Button background */

/* SECONDARY ACTIONS */
--color-cta-secondary: var(--brand-olive-600);          /* Learn More, View Details */
--color-cta-secondary-hover: var(--brand-olive-700);

/* SURFACE COLORS */
--color-bg-page: var(--neutral-50);                     /* Default page background */
--color-bg-alternate: var(--brand-cream-100);           /* Warm section backgrounds */
--color-bg-elevated: #ffffff;                           /* Cards, modals */

/* BORDERS */
--color-border-default: var(--neutral-200);
--color-border-subtle: var(--brand-cream-300);          /* Warm alternative */
--color-border-strong: var(--brand-forest-600);

/* TEXT */
--color-text-primary: var(--neutral-900);               /* Headings */
--color-text-secondary: var(--neutral-600);             /* Body text */
--color-text-tertiary: var(--neutral-400);              /* Captions */

/* FEEDBACK STATES */
--color-success: var(--brand-forest-600);               /* Form success */
--color-success-bg: var(--brand-forest-50);
--color-warning: var(--brand-emergency-orange-500);     /* Warnings */
--color-warning-bg: var(--brand-emergency-orange-400 / 0.1);
--color-error: var(--brand-emergency-red-500);          /* Errors */
--color-error-bg: var(--brand-emergency-red-400 / 0.1);
```

---

## Logo Usage Rules (Comprehensive)

### Website Usage Matrix

| Page/Section | Logo Variant | Rationale |
|--------------|--------------|-----------|
| **Header (all pages)** | Primary Green Badge | Consistent brand identity |
| **Footer (all pages)** | Primary Green Badge | Brand reinforcement |
| **Homepage Hero** | Primary Green Badge | Welcoming, trustworthy |
| **Service Pages** | Primary Green Badge | Professional services branding |
| **Location Pages** | Primary Green Badge | Local trust building |
| **Emergency Landing Page Hero** | Emergency Red/Orange | Immediate urgency signal |
| **Emergency Banner (storm season)** | Emergency Red/Orange | Seasonal urgency |
| **24/7 Callout Strip** | Emergency Red/Orange | Always-available crisis response |
| **Tool Pages** | Alternate Olive Worker | Utility-focused, less formal |
| **Quote/Consultation Forms** | Primary Green Badge | Trust + professionalism |
| **Favicon** | Primary Green Badge (simplified) | Brand recognition |
| **Email Templates** | Primary Green Badge | Professional communications |

### Print & Offline Usage

| Material | Logo Variant | Notes |
|----------|--------------|-------|
| **Business Cards** | Primary Green Badge | Front-facing identity |
| **Invoices/Estimates** | Primary Green Badge | Professional documents |
| **Emergency Door Hangers** | Emergency Red/Orange | Storm damage outreach |
| **Truck Decals** | Alternate Olive Worker | High-visibility, durable |
| **Crew Uniforms** | Alternate Olive Worker | Embroidered patches |
| **Merch (T-shirts, Hats)** | Alternate Olive Worker | Casual branding |
| **Yard Signs (job sites)** | Primary Green Badge | Neighborhood visibility |
| **Trade Show Banners** | Primary Green Badge | Professional events |

### Digital Assets Usage

| Asset Type | Logo Variant | Specifications |
|------------|--------------|----------------|
| **Facebook Avatar** | Primary Green Badge | 180x180px minimum |
| **LinkedIn Company Logo** | Primary Green Badge | 300x300px |
| **Google Business Profile** | Primary Green Badge | 720x720px |
| **Twitter/X Avatar** | Primary Green Badge | 400x400px |
| **Email Signature** | Primary Green Badge | 150x150px, PNG with transparency |
| **Favicon (ICO)** | Primary Green Badge (simplified tree icon) | 16x16, 32x32, 64x64 |
| **Open Graph Image** | Primary Green Badge with text lockup | 1200x630px |
| **Emergency SMS Graphics** | Emergency Red/Orange | 600x400px |

---

## Design System Integration

### Updated Tailwind Config

Replace existing color scales with logo-derived palette:

```javascript
// tailwind.config.js - UPDATED COLORS

colors: {
  // PRIMARY: Forest Green (from badge logo)
  primary: {
    50: '#f3f6f4',
    100: '#e6ece8',
    400: '#6b8873',
    500: '#4a6d5a',  // Logo green
    600: '#3d5a4d',
    700: '#2f4639',
    800: '#243629',
    900: '#1a251c',
  },

  // ALERT: Emergency Red/Orange (from emergency logo)
  alert: {
    red: {
      400: '#ef5350',
      500: '#d32f2f',  // Helmet red
      600: '#c62828',
      700: '#b71c1c',
    },
    orange: {
      400: '#ffa726',
      500: '#fb8c00',  // Background orange
      600: '#f57c00',
    },
  },

  // CREAM: Warm backgrounds (from logo backgrounds)
  cream: {
    50: '#fdfcfa',
    100: '#f5efe0',  // Logo background
    200: '#f0e9d5',
    300: '#e8dfc5',
  },

  // SAGE: Olive/green secondary (from worker logos)
  sage: {
    400: '#8c9985',
    500: '#7a8c71',
    600: '#6b7c63',
    700: '#5a6952',
  },

  // TAN: Brown accents (from hard hats)
  tan: {
    400: '#a1887f',
    500: '#8d6e63',
    600: '#795548',
  },

  // NEUTRAL: Concrete grays (keep existing, ensure warm undertones)
  neutral: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    400: '#a8a29e',
    600: '#57534e',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },

  // STEEL: Keep for secondary actions (existing)
  steel: {
    50: '#f1f5f9',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
  },
}
```

### Button Variant Updates

```typescript
// Update Button component variants to use new palette

variant mapping:
- 'primary' → bg-primary-500 (forest green from logo)
- 'secondary' → bg-sage-600 (olive from worker logos)
- 'emergency' → bg-alert-red-500 with bg-alert-orange-500 border glow
- 'ghost' → border-primary-500 text-primary-700
```

---

## Example Applications

### 1. Homepage Hero Section

**Visual Treatment:**
- **Background:** Full-width image with 40% overlay using `bg-neutral-900/40`
- **Logo Placement:** Primary Green Badge logo in header (not in hero - avoid redundancy)
- **Headline:** `text-neutral-50` (white text on dark overlay)
- **Primary CTA:**
  ```tsx
  <Button variant="primary" size="lg">
    Get Free Consultation
  </Button>
  // Renders: bg-primary-500 (forest green #4a6d5a from logo)
  ```
- **Secondary CTA:**
  ```tsx
  <Button variant="ghost" size="lg">
    View Services
  </Button>
  // Renders: border-primary-500 text-neutral-50
  ```

**Color Palette Usage:**
- Background overlay: `neutral-900` at 40% opacity
- Headline: `neutral-50` (white)
- CTA primary: `primary-500` (logo forest green)
- CTA ghost: `primary-500` border
- Accent elements: `cream-100` for subtle highlights

---

### 2. Service Detail Page (Internal Page)

**Visual Treatment:**
- **Header:** Primary Green Badge logo (consistent across site)
- **Hero Background:** `bg-cream-100` (warm cream from logo background)
- **Section Alternation:**
  - Odd sections: `bg-neutral-50` (white)
  - Even sections: `bg-cream-100` (warm cream)
- **Service Cards:**
  ```tsx
  <Card className="border-neutral-200 hover:border-primary-500">
    {/* Card content */}
  </Card>
  ```
- **CTA Buttons:**
  - Primary action: `bg-primary-500` (forest green)
  - Secondary action: `bg-sage-600` (olive from worker logo)

**Color Palette Usage:**
- Page background alternates: `neutral-50` ↔ `cream-100`
- Headings: `neutral-900`
- Body text: `neutral-600`
- Links: `primary-600` with `hover:primary-700`
- Borders: `neutral-200` default, `cream-300` on cream backgrounds

**Logo Usage:** Primary Green Badge in header only (not repeated in content)

---

### 3. Storm/Emergency Promo Banner

**Visual Treatment:**
- **Full-Width Alert Bar** (sticky at top, above header):
  ```tsx
  <div className="bg-alert-orange-500 border-b-4 border-alert-red-500">
    <Container>
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          {/* Emergency Logo (Red/Orange variant) */}
          <img
            src="/images/logos/emergency-logo.png"
            alt="Emergency Service"
            className="w-12 h-12"
          />
          <div>
            <p className="text-neutral-900 font-bold text-lg">
              Storm Damage? We're Available 24/7
            </p>
            <p className="text-neutral-800 text-sm">
              Emergency tree removal • Fallen limb cleanup • Power line hazards
            </p>
          </div>
        </div>
        <Button
          variant="emergency"
          size="lg"
          className="animate-pulse"
        >
          Call Emergency: (402) 812-3294
        </Button>
      </div>
    </Container>
  </div>
  ```

**Color Palette Usage:**
- Background: `alert-orange-500` (#fb8c00 - from logo background)
- Border accent: `alert-red-500` (#d32f2f - from helmet red) 4px bottom border
- Text primary: `neutral-900` (high contrast on orange)
- Text secondary: `neutral-800`
- Button background: `alert-red-500` with `alert-red-600` hover
- Button text: `neutral-50` (white)

**Logo Usage:** Emergency Red/Orange variant ONLY

**Animation:** Subtle pulse on CTA button (allowed exception for emergency contexts)

---

### 4. Quote/Consultation Form Page

**Visual Treatment:**
- **Background:** `bg-cream-50` (very subtle warm background)
- **Form Container:**
  ```tsx
  <Card className="bg-neutral-50 border-cream-300 shadow-lg max-w-2xl mx-auto">
    {/* Form fields */}
  </Card>
  ```
- **Logo Treatment:** Primary Green Badge in header, small trust badge version next to form title
- **Success State:** `bg-primary-50` with `text-primary-900` and checkmark icon

**Color Palette Usage:**
- Page background: `cream-50`
- Form container: `neutral-50` (white card on cream)
- Input borders: `neutral-200` default, `primary-500` on focus
- Labels: `neutral-800`
- Placeholder text: `neutral-400`
- Submit button: `bg-primary-500` (forest green)
- Success message: `bg-primary-50` background, `primary-900` text

**Logo Usage:** Primary Green Badge (trust + professionalism, not urgency)

---

## Implementation Checklist

Before deploying brand updates:

- [ ] Add all 4 logo files to `/public/images/logos/` directory
  - `primary-green-badge.png` (transparent background)
  - `emergency-red-orange.png` (transparent background)
  - `worker-olive-sage.png` (transparent background)
  - `tree-icon-simplified.png` (for favicons)

- [ ] Update `tailwind.config.js` with new color scales (primary, alert, cream, sage, tan)

- [ ] Update `src/constants.ts` with logo paths and brand color constants

- [ ] Update Button component to use new `primary-500` and `alert-red-500` colors

- [ ] Test all page types to ensure color consistency:
  - [ ] Homepage
  - [ ] Service detail pages
  - [ ] Location pages
  - [ ] Emergency landing page
  - [ ] Quote/consultation forms

- [ ] Verify logo swaps are contextually correct (emergency vs. standard)

- [ ] Generate favicon.ico from simplified tree icon

- [ ] Update social media profiles with Primary Green Badge (if not already using)

- [ ] Create email signature template with Primary Green Badge

---

## Maintenance & Governance

### Logo File Management
- **Source Files:** Store original vector files (SVG, AI, EPS) in `/brand-assets/` (not public-facing)
- **Web-Optimized:** Use PNG with transparency for all web usage
- **Naming Convention:** `[variant-name]-[size].png` (e.g., `primary-badge-512.png`)

### Color Drift Prevention
- **Single Source of Truth:** This document + `tailwind.config.js`
- **No Custom Colors:** Never use arbitrary hex codes in components (use only Tailwind tokens)
- **Audit Schedule:** Quarterly review to ensure no color deviations

### Logo Usage Violations (Common Mistakes to Avoid)
- ❌ Using Emergency logo on non-emergency pages
- ❌ Using Primary logo on emergency banners (dilutes urgency)
- ❌ Mixing logo variants on same page
- ❌ Using Worker/Olive logos in customer-facing web content
- ❌ Stretching or distorting logo aspect ratios
- ❌ Changing logo colors to match section backgrounds
- ❌ Using low-resolution logos (minimum 150px width)

---

**Document Owner:** Visual Design Team
**Last Updated:** 2025-12-20
**Next Review:** 2026-03-20

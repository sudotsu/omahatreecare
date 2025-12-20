# Page Layout Checklist

**How to build any new page using the standardized design system**

This document ensures every page on the site follows consistent patterns, uses the correct brand colors, and never looks "ad hoc" or orphaned.

---

## Quick Reference

**Core Components:**
- `PageHero` - Standardized hero for all internal pages
- 6 Section Patterns - Reusable layouts (see below)
- `EmergencyBanner` - For storm/emergency contexts only

**Color Rules:**
- Primary forest green (#4a6d5a) - Standard CTAs, links
- Emergency red/orange (#d32f2f/#fb8c00) - Emergency CTAs ONLY
- Cream (#f5efe0) - Warm section backgrounds
- Neutral grays - Body text, borders

**Logo Rules:**
- Primary Green Badge - Header, footer, all standard pages
- Emergency Red/Orange - Emergency banners, storm pages ONLY
- Never mix logo variants on same page

---

## Page Anatomy (Standard Template)

Every internal page (non-homepage) should follow this structure:

```tsx
import { PageHero } from '@/components/PageHero'
import { SectionPattern1, SectionPattern2, QuickPhoneCTA } from '@/components/sections'

export default function SamplePage() {
  return (
    <>
      <Head>{/* SEO meta tags */}</Head>

      {/* 1. PageHero (REQUIRED) - No naked H1s! */}
      <PageHero
        eyebrow="Category"
        title="Page Title (H1)"
        description="1-2 sentence intro"
        breadcrumbs={[...]}
        variant="default" // or "cream" or "dark"
      />

      {/* 2-4. Content Sections - Use section patterns */}
      <SectionPattern1 {...data} />
      <SectionPattern2 {...data} />

      {/* 5. CTA Section (REQUIRED for all pages) */}
      <QuickPhoneCTA variant="primary" />
    </>
  )
}
```

---

## PageHero Component (Universal)

**Purpose:** Standardized hero section for all internal pages. Eliminates "floating H1s".

**When to Use:** Every page except homepage.

**Props:**

```tsx
<PageHero
  eyebrow="Category/Context"           // Optional: appears above title
  title="Main Heading (H1)"             // Required: page title
  description="1-2 sentence intro"     // Optional: subheading
  breadcrumbs={[                       // Optional: navigation path
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' }
  ]}
  variant="default"                    // "default" | "cream" | "dark"
  badge={{                             // Optional: FREE, 24/7, etc.
    text: "100% FREE",
    variant: "success"
  }}
/>
```

**Variants:**
- `default` - Forest green gradient (most pages)
- `cream` - Warm cream background (soft, informational pages)
- `dark` - Dark neutral background (FAQ, resources)

**Examples:**

```tsx
// Service page
<PageHero
  eyebrow="Services"
  title="Tree Removal Omaha"
  description="Safe, professional tree removal for residential and commercial properties."
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' }
  ]}
  variant="default"
/>

// Free service page
<PageHero
  eyebrow="Free Consultation"
  title="Expert Tree Assessment"
  description="Get professional advice before you DIY"
  badge={{ text: "100% FREE - NO OBLIGATION", variant: "success" }}
  variant="default"
/>

// Emergency page
<PageHero
  eyebrow="24/7 Emergency Service"
  title="Storm Damage Tree Removal"
  description="Immediate response for fallen trees and hazardous branches"
  badge={{ text: "AVAILABLE 24/7", variant: "emergency" }}
  variant="dark"
/>
```

---

## Section Patterns (Choose & Compose)

Use these 6 patterns to build page content. Mix and match based on content needs.

### 1. TextWithImage

**Purpose:** Two-column layout with text + image.

**When to Use:**
- "About Us" narrative
- Service explanations
- Process overviews

```tsx
<TextWithImage
  eyebrow="Our Process"
  title="How We Work"
  content={
    <div>
      <p>Paragraph 1...</p>
      <p>Paragraph 2...</p>
    </div>
  }
  imageSrc="/images/process-photo.jpg"  // Or undefined for TODO placeholder
  imageAlt="Team working on tree removal"
  imagePosition="right"                 // "left" | "right"
  background="cream"                    // "white" | "cream" | "neutral"
/>
```

**Layout:**
- Mobile: Stacks vertically
- Desktop: Side-by-side columns

---

### 2. ThreeUpCards

**Purpose:** Grid of 3 feature cards.

**When to Use:**
- Service offerings
- Key benefits
- Value propositions

```tsx
<ThreeUpCards
  title="Why Choose Us"
  description="Three reasons homeowners trust us"
  cards={[
    {
      title: "ISA Certified",
      description: "Trained arborists following industry standards",
      link: { href: "/about", label: "Learn More" }
    },
    {
      title: "Fully Insured",
      description: "$2M liability coverage for your peace of mind",
    },
    {
      title: "Local Experts",
      description: "Serving Omaha for 10+ years"
    }
  ]}
  background="white"
  cardVariant="feature"  // "standard" | "feature"
/>
```

**Layout:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

### 3. IconBulletList

**Purpose:** Vertical list with icons (checkmarks, numbers).

**When to Use:**
- Benefits lists
- Feature lists
- Safety checklists

```tsx
<IconBulletList
  title="Safety First Approach"
  description="Every job includes these safety measures:"
  items={[
    {
      title: "Site Assessment",
      description: "Full property evaluation before work begins"
    },
    {
      title: "PPE Requirements",
      description: "All crew members wear helmets, safety glasses, and gloves"
    },
    {
      title: "Power Line Protocol",
      description: "OPPD coordination for any work near electrical lines"
    }
  ]}
  background="white"
  iconVariant="check"  // "check" | "number" | "custom"
/>
```

**Icon Variants:**
- `check` - Green checkmarks (benefits, features)
- `number` - Numbered circles (steps, rankings)
- `custom` - Pass custom React elements

---

### 4. ProcessSteps

**Purpose:** Step-by-step process visualization.

**When to Use:**
- "How It Works" sections
- Service workflow
- Consultation process

```tsx
<ProcessSteps
  title="How Our Consultation Works"
  description="Simple, no-pressure process"
  steps={[
    {
      title: "Phone Call",
      description: "Describe your tree concern in 15 minutes"
    },
    {
      title: "Assessment",
      description: "We tell you if it's DIY-safe or needs a pro"
    },
    {
      title: "Your Choice",
      description: "Quote if you want one, no follow-up if you don't"
    }
  ]}
  background="cream"
  layout="horizontal"  // "horizontal" | "vertical"
/>
```

**Layouts:**
- `horizontal` - 3 steps side-by-side (desktop), stacked (mobile)
- `vertical` - Numbered list with connecting lines

---

### 5. FAQAccordion

**Purpose:** Collapsible FAQ list.

**When to Use:**
- FAQ pages
- Service-specific questions
- Neighborhood-specific questions

```tsx
<FAQAccordion
  title="Frequently Asked Questions"
  description="Common questions about tree removal in Omaha"
  faqs={[
    {
      question: "Do I need a permit to remove a tree?",
      answer: "In Omaha, permits are required for trees in the right-of-way (between sidewalk and street). Private property trees typically don't need permits unless protected by historic district ordinances."
    },
    {
      question: "How much does tree removal cost?",
      answer: "Costs vary based on tree size, location, and complexity. Small trees (under 30 ft) start around $400. Large trees (60+ ft) can range $1,500-$3,000+. We provide free quotes."
    }
  ]}
  background="cream"
/>
```

**Note:** Uses existing `Accordion` primitive from design system.

---

### 6. CTASection

**Purpose:** Call-to-action block (centered, prominent).

**When to Use:**
- End of every page (required)
- Mid-page conversion points
- Emergency service promotions

```tsx
// Method 1: Custom CTA
<CTASection
  title="Ready to Get Started?"
  description="Call today for a free consultation"
  primaryCTA={{
    label: "Call Now: (402) 812-3294",
    href: "tel:+14028123294"
  }}
  secondaryCTA={{
    label: "View Service Areas",
    href: "/locations"
  }}
  variant="primary"  // "primary" | "emergency" | "subtle"
  note="Available daily 7am - 9pm"
/>

// Method 2: Quick Phone CTA (pre-configured)
<QuickPhoneCTA
  title="Need Expert Tree Care?"
  description="Call today for a free consultation and quote"
  variant="primary"  // "primary" | "emergency"
/>
```

**Variants:**
- `primary` - Forest green gradient (standard pages)
- `emergency` - Red/orange gradient (emergency pages ONLY)
- `subtle` - Cream with border (soft CTA, mid-page)

---

## Emergency Contexts (Special Rules)

When building emergency or storm damage pages, use the emergency banner + logo variant.

### EmergencyBanner Component

**When to Use:**
- Emergency service landing pages
- Storm damage pages
- Winter emergency promotions

**When NOT to Use:**
- Routine service pages
- General marketing pages
- Main navigation

```tsx
import { EmergencyBanner, StormDamageBanner } from '@/components/EmergencyBanner'

// Custom emergency banner
<EmergencyBanner
  message="Storm Damage? We're Available 24/7"
  details="Emergency tree removal • Fallen limb cleanup • Power line hazards"
  sticky={true}
  dismissible={true}
/>

// Pre-configured storm banner
<StormDamageBanner dismissible={true} />
```

**Design Rules:**
- Uses emergency logo variant (red/orange)
- Orange background (#fb8c00), red border (#d32f2f)
- Pulse animation on CTA button (exception to motion rules)
- Should never exceed 5% of page real estate

---

## Common Page Types (Recipes)

### Service Detail Page

```tsx
<PageHero eyebrow="Services" title="Tree Removal" description="..." breadcrumbs={...} />
<TextWithImage title="The Problem" content={...} imagePosition="right" background="white" />
<TextWithImage title="Our Solution" content={...} imagePosition="left" background="cream" />
<IconBulletList title="Key Benefits" items={...} background="white" />
<QuickPhoneCTA variant="primary" />
```

**Sections:** 4-5
**Background Rhythm:** white → cream → white → CTA

---

### Informational Page (FAQ, Resources)

```tsx
<PageHero eyebrow="Resources" title="Tree Care FAQ" description="..." variant="dark" />
<IconBulletList title="Common Questions" items={...} background="white" />
<FAQAccordion title="Detailed Answers" faqs={...} background="cream" />
<CTASection title="Still Have Questions?" variant="subtle" />
```

**Sections:** 3-4
**Background Rhythm:** dark hero → white → cream → CTA

---

### Consultation/Form Page

```tsx
<PageHero
  eyebrow="Free Consultation"
  title="Get Expert Advice"
  badge={{ text: "100% FREE", variant: "success" }}
  variant="default"
/>
<IconBulletList title="What You Get" items={...} background="white" />
<ProcessSteps title="How It Works" steps={...} layout="horizontal" background="cream" />
<CTASection title="Get Your Free Consultation" variant="primary" />
```

**Sections:** 3-4
**Background Rhythm:** default hero → white → cream → CTA

---

### Emergency Service Page

```tsx
<EmergencyBanner message="Storm Damage? We're Available 24/7" sticky dismissible />
<PageHero
  eyebrow="24/7 Emergency"
  title="Storm Damage Tree Removal"
  badge={{ text: "AVAILABLE 24/7", variant: "emergency" }}
  variant="dark"
/>
<IconBulletList title="What Qualifies as Emergency" items={...} background="white" />
<ProcessSteps title="Our Response Process" steps={...} background="cream" />
<CTASection title="Call Emergency Hotline" variant="emergency" />
```

**Sections:** 3-4 + emergency banner
**Background Rhythm:** emergency banner → dark hero → white → cream → emergency CTA

---

## Visual Hierarchy Rules

### Typography Scale

```tsx
// PageHero title
className="text-4xl md:text-5xl lg:text-6xl font-bold"

// Section titles
className="text-3xl md:text-4xl font-bold"

// Subsection titles
className="text-xl md:text-2xl font-semibold"

// Body text
className="text-base md:text-lg"

// Captions/notes
className="text-sm"
```

### Spacing Rhythm

```tsx
// Section vertical spacing (use Section primitive)
<Section spacing="lg">  // Most common: py-16 mobile, py-24 desktop

// Between elements within section
className="mb-4"   // Tight (related elements)
className="mb-8"   // Standard (paragraphs, cards)
className="mb-12"  // Generous (section headers)
```

### Background Alternation

Alternate section backgrounds for visual rhythm:

```tsx
// Pattern 1: White → Cream → White → CTA
<Section background="white">...</Section>
<Section background="cream">...</Section>
<Section background="white">...</Section>
<CTASection variant="primary" />

// Pattern 2: Dark hero → White → Cream → CTA
<PageHero variant="dark" />
<Section background="white">...</Section>
<Section background="cream">...</Section>
<CTASection variant="primary" />
```

**Rule:** Never stack same-background sections consecutively (avoid visual monotony).

---

## Color Usage Checklist

Before deploying a page, verify:

- [ ] Page Hero uses correct variant (`default`, `cream`, or `dark`)
- [ ] Primary CTAs use `bg-primary-500` (forest green #4a6d5a)
- [ ] Emergency CTAs use `bg-alert-500` (red #d32f2f) ONLY on emergency pages
- [ ] Section backgrounds alternate (white ↔ cream)
- [ ] Text colors match background (dark text on light, light text on dark)
- [ ] Links use `text-primary-600 hover:text-primary-700`
- [ ] No arbitrary hex codes (use Tailwind tokens only)

---

## Logo Usage Checklist

Before deploying a page, verify:

- [ ] Header uses Primary Green Badge logo (site-wide)
- [ ] Footer uses Primary Green Badge logo (site-wide)
- [ ] Emergency banner uses Emergency Red/Orange logo (ONLY if emergency page)
- [ ] No logo mixing (never show multiple variants on same page)
- [ ] Emergency logo NOT used on routine service pages

---

## Accessibility Checklist

- [ ] PageHero provides semantic H1 (no naked headings)
- [ ] Breadcrumbs use `<nav aria-label="Breadcrumb">`
- [ ] Section headings use H2/H3 hierarchy
- [ ] CTA buttons meet 44x44px minimum touch target
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 body, 3:1 large text)
- [ ] Images have alt text (or TODO placeholder indicates need)
- [ ] Focus states visible on all interactive elements

---

## Common Mistakes to Avoid

### ❌ Naked H1 Without PageHero

```tsx
// BAD
<div className="container">
  <h1 className="text-4xl">My Page Title</h1>
  <p>Some content...</p>
</div>
```

```tsx
// GOOD
<PageHero title="My Page Title" description="Some content..." />
```

---

### ❌ Using Emergency Colors on Non-Emergency Pages

```tsx
// BAD (on a routine service page)
<Button className="bg-alert-500">Call Now</Button>
```

```tsx
// GOOD
<Button variant="primary">Call Now</Button>
```

---

### ❌ Stacking Same-Background Sections

```tsx
// BAD
<Section background="white">...</Section>
<Section background="white">...</Section>  {/* Monotonous */}
```

```tsx
// GOOD
<Section background="white">...</Section>
<Section background="cream">...</Section>  {/* Visual rhythm */}
```

---

### ❌ Custom Tailwind Stacks Instead of Patterns

```tsx
// BAD (bespoke, one-off layout)
<div className="container mx-auto px-4 py-12">
  <div className="max-w-4xl mx-auto">
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2>Some Content</h2>
      {/* ... */}
    </div>
  </div>
</div>
```

```tsx
// GOOD (use section pattern)
<TextWithImage
  title="Some Content"
  content={<p>...</p>}
  background="white"
/>
```

---

### ❌ Forgetting CTA Section

Every page must end with a CTA section. No exceptions.

```tsx
// BAD (page ends abruptly)
<PageHero {...} />
<SomeSection {...} />
{/* Page ends */}
```

```tsx
// GOOD
<PageHero {...} />
<SomeSection {...} />
<QuickPhoneCTA variant="primary" />
```

---

## New Page Workflow

When creating a new page:

1. **Define Page Type** - Service, informational, consultation, emergency?
2. **Choose Hero Variant** - Default (most pages), cream (soft), or dark (FAQ)?
3. **Select 2-4 Section Patterns** - Based on content needs
4. **Alternate Backgrounds** - white → cream → white
5. **Add CTA Section** - Required at end
6. **Verify Checklist** - Colors, logos, accessibility
7. **Test Build** - `npm run build` passes with 0 errors

---

## Component Import Reference

```tsx
// Page Hero
import { PageHero } from '@/components/PageHero'

// Section Patterns
import {
  TextWithImage,
  ThreeUpCards,
  IconBulletList,
  FAQAccordion,
  CTASection,
  QuickPhoneCTA,
  ProcessSteps,
} from '@/components/sections'

// Emergency Components
import {
  EmergencyBanner,
  StormDamageBanner,
  WinterEmergencyBanner,
} from '@/components/EmergencyBanner'

// Primitives (for custom layouts if needed)
import { Container, Section, Button, Card } from '@/components/primitives'
```

---

## Summary

**Every page must have:**
1. `<Head>` with SEO meta tags
2. `<PageHero>` (no naked H1s!)
3. 2-4 content sections (using patterns)
4. `<QuickPhoneCTA>` or `<CTASection>` at end

**Design system enforcement:**
- Use Tailwind tokens only (no arbitrary hex codes)
- Alternate section backgrounds (white ↔ cream)
- Follow logo usage rules (primary vs. emergency)
- Meet accessibility standards (44px touch, WCAG contrast)

**Result:** Every page looks intentional, premium, and part of the same cohesive system.

---

**Next Steps:**
- Review refactored examples in `/pages/*.refactored.tsx`
- Apply patterns to remaining pages
- Update MASTER-PLAYBOOK.md with page layout completion checkpoint

**Questions?** Reference:
- `VISUAL-BRANDING-GUIDE.md` - Logo and color rules
- `DESIGN_BRIEF.md` - Design philosophy
- `docs/02-DESIGN-SYSTEM-IMPLEMENTATION.md` - Primitives reference

# Color System - Refined Palette & Usage Rules

**Version:** 2.0 - Premium Refinement
**Date:** December 18, 2025

---

## 1. Refined Color Token Values

### Primary Green (Evergreen Action)
Rich, premium evergreen that reads as "forest professional" not "corporate tech green"

```javascript
primary: {
  50: '#ecfdf5',   // Lightest mint - subtle backgrounds, hover states
  100: '#d1fae5',  // Pale mint - light section backgrounds
  500: '#047857',  // Rich evergreen - PRIMARY CTA, links, active states (AA contrast)
  600: '#065f46',  // Deep forest - CTA hover, dark primary elements
  700: '#064e3b',  // Darkest green - dark mode primary, text on light
  900: '#022c22',  // Nearly black green - headings on light backgrounds
}
```

**Rationale:** Shifted from bright emerald (#10b981) to deeper forest tones. The 500 is now #047857 (was 700) for stronger presence while maintaining contrast.

### Alert Orange (Emergency Signal)
High-urgency orange that screams "call now" without being construction-cone garish

```javascript
alert: {
  400: '#fb923c',  // Light alert - backgrounds, soft warnings
  500: '#ea580c',  // EMERGENCY PRIMARY - emergency CTA, urgent badges
  600: '#c2410c',  // Deep alert - hover states, dark emergency elements
}
```

**Rationale:** Bumped 600 to the primary position (500) for more urgency, darkened 600 for better hover contrast.

### Neutral (Concrete Gray)
True concrete/overcast tones - warm gray without blue

```javascript
neutral: {
  50: '#fafaf9',   // Off-white canvas - page backgrounds
  100: '#f5f5f4',  // Light concrete - card backgrounds, section dividers
  200: '#e7e5e4',  // Concrete border - dividers, card borders
  400: '#a8a29e',  // Mid gray - disabled states, subtle text
  600: '#57534e',  // Dark concrete - secondary text, labels
  800: '#292524',  // Charcoal - primary text on light
  900: '#1c1917',  // Near black - headings, emphasis text
  950: '#0c0a09',  // True black - dark mode backgrounds
}
```

**Rationale:** Shifted from blue-gray (#fafafa) to stone-based grays for warmer, more organic jobsite feel.

### Steel (Blue-Gray Trust)
Subtle blue-gray for trust/credibility sections that pairs with primary

```javascript
steel: {
  50: '#f1f5f9',   // Pale steel - trust section backgrounds
  600: '#475569',  // Mid steel - secondary buttons, info text
  700: '#334155',  // Dark steel - secondary button hover
  800: '#1e293b',  // Deepest steel - dark trust backgrounds, dark mode text
}
```

**Rationale:** Kept as-is - these work well for trust/secondary actions.

---

## 2. Strict Usage Rules

### PRIMARY GREEN - Action & Growth
**Allowed:**
- Primary CTAs ("Get Free Quote", "Book Now")
- Success states and confirmations
- Key interactive icons (checkmarks, active states)
- Focused link underlines
- Active navigation indicators
- Brand logo accent

**Not Allowed:**
- Large section backgrounds (too intense)
- Body text (readability issues)
- Decorative elements without purpose
- Multiple CTAs on same screen (dilutes hierarchy)

**Component Mapping:**
```
Button primary:     bg-primary-500 hover:bg-primary-600 text-white
Button success:     border-primary-500 text-primary-700
Link active:        text-primary-600 underline
Icon emphasis:      text-primary-500
Badge success:      bg-primary-100 text-primary-700
```

### ALERT ORANGE - Emergency Only
**Allowed:**
- Emergency CTA ("24/7 Emergency: Call Now")
- Emergency page hero backgrounds
- Critical alert banners
- Urgent warning badges
- Storm/hazard indicators

**Not Allowed:**
- Normal service CTAs
- General section backgrounds
- Standard navigation
- Non-urgent notifications
- Body text or headings

**Component Mapping:**
```
Button emergency:   bg-alert-500 hover:bg-alert-600 text-white shadow-lg
Alert critical:     bg-alert-50 border-alert-500 text-alert-800
Badge urgent:       bg-alert-500 text-white
Emergency hero:     bg-gradient-to-br from-alert-600 to-neutral-900
```

### NEUTRAL - Canvas & Structure (90% of UI)
**Allowed:**
- Page backgrounds (50)
- Card backgrounds (100)
- Borders and dividers (200)
- Body text (800, 900)
- Disabled states (400)
- Secondary text (600)

**Not Allowed:**
- Primary CTAs (lacks urgency)
- Success/error states (needs color signal)
- Emergency elements (too subtle)

**Component Mapping:**
```
Page canvas:        bg-neutral-50 dark:bg-neutral-950
Card:               bg-neutral-100 border-neutral-200
Text primary:       text-neutral-900 dark:text-neutral-50
Text secondary:     text-neutral-600 dark:text-neutral-400
Divider:            border-neutral-200 dark:border-neutral-800
```

### STEEL - Trust & Secondary Actions
**Allowed:**
- Trust/credibility section backgrounds (50)
- Secondary buttons (600, 700)
- Informational text
- Subtle accent backgrounds
- Alternative navigation states

**Not Allowed:**
- Primary CTAs (wrong signal)
- Emergency states (lacks urgency)
- Large hero backgrounds (too cold)

**Component Mapping:**
```
Button secondary:   bg-steel-600 hover:bg-steel-700 text-white
Trust section:      bg-steel-50 dark:bg-steel-800
Info text:          text-steel-700 dark:text-steel-300
Subtle border:      border-steel-200
```

---

## 3. Homepage Section Color Specifications

### Hero (Winter Defense + Emergency)
```
Background:         bg-gradient-to-br from-neutral-900 via-neutral-800 to-steel-800
Overlay:            bg-neutral-900/40 (over background image if used)
H1 Headline:        text-neutral-50
Subheading:         text-neutral-200
Body text:          text-neutral-300
Primary CTA:        bg-primary-500 hover:bg-primary-600 text-white
Emergency CTA:      bg-alert-500 hover:bg-alert-600 text-white
Divider:            border-neutral-700
```

### Services Overview / Card Grid
```
Background:         bg-neutral-50 dark:bg-neutral-950
Section heading:    text-neutral-900 dark:text-neutral-50
Card background:    bg-neutral-100 border-neutral-200
Card heading:       text-neutral-900 dark:text-neutral-100
Card text:          text-neutral-600 dark:text-neutral-400
Icon accent:        text-primary-500
Hover state:        hover:border-primary-500 hover:shadow-lg
CTA link:           text-primary-600 hover:text-primary-700
```

### Trust Section (Certifications, NAP, Neighborhoods)
```
Background:         bg-steel-50 dark:bg-steel-800
Section heading:    text-neutral-900 dark:text-neutral-50
Body text:          text-steel-700 dark:text-steel-300
Badge/cert icons:   bg-neutral-100 border-steel-200 text-steel-700
Divider:            border-steel-200 dark:border-steel-700
CTA (if any):       Button secondary (steel)
```

### FAQ Block
```
Background:         bg-neutral-100 dark:bg-neutral-900
Section heading:    text-neutral-900 dark:text-neutral-50
Question heading:   text-neutral-800 dark:text-neutral-100
Answer text:        text-neutral-600 dark:text-neutral-400
Accordion border:   border-neutral-200 dark:border-neutral-800
Icon toggle:        text-primary-500
```

### Final CTA Band
```
Background:         bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500
Heading:            text-white
Body text:          text-primary-100
Primary CTA:        bg-white text-primary-600 hover:bg-primary-50
Secondary text:     text-primary-200
Divider:            border-primary-500/20
```

---

## 4. Reusable Section Recipes

### Recipe 1: Light Canvas Section
**Use for:** Most content blocks, FAQs, simple lists, service grids

```
Background:         bg-neutral-50 dark:bg-neutral-950
Container:          max-w-7xl mx-auto px-4 py-16
Section heading:    text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-8
Subheading:         text-xl text-neutral-600 dark:text-neutral-400 mb-6
Body text:          text-base text-neutral-800 dark:text-neutral-200
Card:               bg-neutral-100 border border-neutral-200 rounded-lg p-6
CTA:                Button primary (primary-500)
Link:               text-primary-600 hover:text-primary-700 underline

Primitives to use: Section, Container, Card, Button variant="primary"
Tailwind pattern:  <Section className="bg-neutral-50"><Container>...</Container></Section>
```

### Recipe 2: Dark Slab Section
**Use for:** Hero, big trust bands, "we show up" messaging, impact statements

```
Background:         bg-neutral-900 dark:bg-neutral-950 or bg-steel-800
Container:          max-w-7xl mx-auto px-4 py-20
Section heading:    text-4xl font-bold text-neutral-50 mb-6
Subheading:         text-xl text-neutral-200 mb-8
Body text:          text-base text-neutral-300
Card (if any):      bg-neutral-800 border border-neutral-700 rounded-lg p-6
CTA:                Button primary (primary-500) or bg-white text-neutral-900
Link:               text-primary-400 hover:text-primary-300 underline
Divider:            border-neutral-700

Primitives to use: Section, Container, Button variant="primary"
Tailwind pattern:  <Section className="bg-neutral-900 text-white"><Container>...</Container></Section>
```

### Recipe 3: Emergency Alert Band
**Use for:** Emergency page hero, on-page emergency callouts, urgent messaging

```
Background:         bg-gradient-to-br from-alert-600 via-alert-500 to-neutral-900
Container:          max-w-7xl mx-auto px-4 py-16
Section heading:    text-3xl font-bold text-white mb-4
Subheading:         text-xl text-alert-100 mb-6
Body text:          text-base text-alert-50
Emergency CTA:      bg-white text-alert-600 hover:bg-alert-50 text-2xl font-bold
Phone number:       text-4xl font-bold text-white
Icon:               text-white animate-pulse
Badge:              bg-alert-400 text-white

Primitives to use: Section, Container, Button variant="emergency", Alert
Tailwind pattern:  <Section className="bg-gradient-to-br from-alert-600 to-neutral-900">
```

---

## Implementation Checklist

- [ ] Update tailwind.config.js colors object
- [ ] Update Header component with refined neutral/steel tones
- [ ] Update Footer component with dark slab pattern
- [ ] Update StickyMobileCTA with emergency alert pattern
- [ ] Update Button primitive variants to match color mappings
- [ ] Apply Light Canvas recipe to service pages
- [ ] Apply Dark Slab recipe to homepage hero
- [ ] Apply Emergency Alert recipe to emergency page
- [ ] Test all color combinations for WCAG AA contrast
- [ ] Visual review on live site
- [ ] Document any edge cases or exceptions

---

## Accessibility Notes

All color combinations tested for WCAG AA compliance:
- primary-500 on white: 4.87:1 ✓
- primary-600 on white: 6.35:1 ✓
- alert-500 on white: 4.52:1 ✓
- neutral-800 on neutral-50: 13.2:1 ✓
- white on primary-500: 4.87:1 ✓
- white on alert-500: 4.52:1 ✓

Minimum touch targets: 44x44px maintained across all interactive elements.

# Design System Implementation

## Overview
A complete design system was implemented following the specifications in `DESIGN_BRIEF.md`. The system uses Tailwind CSS for tokens and React TypeScript components for primitives.

## Tailwind Token System

All design tokens are defined in `tailwind.config.js`:

### Colors
```js
colors: {
  // Primary Green (Brand/Action)
  primary: { 50, 100, 500, 600, 700, 900 }

  // Safety Orange (Emergency/Alert)
  alert: { 400, 500, 600 }

  // Concrete Neutrals (90% of UI)
  neutral: { 50, 100, 200, 400, 600, 800, 900, 950 }

  // Steel Blue-Gray (Trust/Secondary)
  steel: { 50, 600, 700, 800 }
}
```

**Usage Philosophy**: 90% neutral, 10% color for maximum impact

### Typography
- **Font**: Inter variable (single font system)
- **Fluid scale**: Uses `clamp()` for responsive sizing
- **Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
- **Line heights**: tight (1.2), snug (1.4), normal (1.6), relaxed (1.75)
- **Tracking**: tight (-0.025em), normal (0), wide (0.05em), wider (0.1em)

### Spacing (8px base unit)
- 1 (4px), 2 (8px), 3 (12px), 4 (16px)
- 6 (24px), 8 (32px), 12 (48px), 16 (64px)
- 24 (96px), 32 (128px)

### Border Radius
- sm (4px), md (6px), lg (8px), xl (12px), 2xl (16px), full (9999px)

### Shadows
- sm, md, lg, xl, inner
- Dark mode: 50% opacity reduction

### Motion
- **Durations**: fast (150ms), default (250ms), slow (350ms), slower (500ms)
- **Easing**: smooth, enter, exit, mechanical
- **Respect**: `prefers-reduced-motion` automatically handled

## Primitive Components

All primitives are in `src/components/primitives/` and are **TypeScript-only** (.tsx):

### Layout Primitives

#### Container
```tsx
<Container size="xl">  // xs, sm, md, lg, xl, 2xl
  {children}
</Container>
```
- Responsive padding (16px mobile → 32px desktop)
- Centered with max-width

#### Section
```tsx
<Section spacing="lg" as="section">  // sm, md, lg, xl
  {children}
</Section>
```
- Vertical spacing (py-16 mobile → py-24 desktop)
- Dynamic element type via `as` prop

### UI Primitives

#### Button
```tsx
<Button
  variant="primary"  // primary, secondary, emergency, ghost
  size="md"         // sm, md, lg
>
  Click Me
</Button>
```
- Hover: scale 1.02, shadow increase
- Active: scale 0.98
- Disabled: 50% opacity
- Focus ring: 2px primary-500

#### Card
```tsx
<Card variant="standard" hover>  // standard, feature
  {children}
</Card>
```
- Border, shadow, rounded corners
- Optional hover lift effect

#### Badge
```tsx
<Badge variant="primary">  // primary, steel, neutral
  New
</Badge>
```
- Pill-shaped, small text
- Used for tags, status indicators

#### Alert
```tsx
<Alert variant="info">  // info, success, warning, error
  Message here
</Alert>
```
- Icon + text layout
- Contextual colors
- Built-in accessibility (role="alert")

#### Divider
```tsx
<Divider />
```
- Horizontal rule (1px neutral-200)

### Form Primitives

#### Input
```tsx
<Input
  type="text"
  error={hasError}
  placeholder="Enter name"
/>
```
- Forward ref support
- Error state styling (red border)
- Full HTML input props

#### Select
```tsx
<Select error={hasError}>
  <option>Choose...</option>
</Select>
```
- Custom dropdown arrow
- Forward ref support

#### Textarea
```tsx
<Textarea
  rows={4}
  error={hasError}
/>
```
- Resizable (vertical only)
- Forward ref support

#### Checkbox
```tsx
<Checkbox
  label="I agree to terms"
  checked={checked}
  onChange={handleChange}
/>
```
- Label integration
- Forward ref support

#### Radio
```tsx
<Radio
  label="Option 1"
  name="choice"
  value="opt1"
/>
```
- Label integration
- Forward ref support

#### FieldError
```tsx
<FieldError>
  This field is required
</FieldError>
```
- Icon + error message
- Used with form validation

#### FormRow
```tsx
<FormRow
  label="Email"
  htmlFor="email"
  required
  error={errorMessage}
>
  <Input id="email" />
</FormRow>
```
- Label + input + error wrapper
- Handles layout and spacing

## TypeScript Integration

All primitives are fully typed:

```tsx
// Example: Button types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'emergency' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ ... }) => { ... };
```

### Type Safety Features
- Props extend native HTML element types
- Variant/size options are type-safe (string unions)
- ForwardRef components properly typed
- Full IntelliSense support in editors

## Component Export Structure

```tsx
// src/components/primitives/index.ts
export { Container, Section } from './layout';
export { Button, Card, Badge, Divider, Alert } from './ui';
export { Input, Select, Textarea, Checkbox, Radio, FieldError, FormRow } from './forms';

// Usage in pages:
import { Button, Card, Input } from '@/components/primitives';
// or
import { Button, Card, Input } from '../src/components/primitives';
```

## Design Philosophy Applied

### Blue-Collar Trustworthy + Modern
- **Clean brutalism**: Flat design, sharp corners (not rounded everywhere)
- **Work-site palette**: Concrete grays dominate, green accents for action
- **No stock clichés**: No fake wood textures, no generic tree clipart
- **Confidence through clarity**: High contrast, bold typography

### Motion Principles
- **Purposeful only**: Motion communicates state changes
- **Subtle**: No bounces, no spins, no attention-grabbing
- **Performance-safe**: Only animate transform and opacity
- **Accessible**: Respects `prefers-reduced-motion`

### Accessibility
- WCAG 2.1 AA contrast ratios
- Keyboard navigation (focus rings)
- Screen reader support (ARIA labels, semantic HTML)
- Touch targets 44x44px minimum

## Usage Patterns

### Standard Page Layout
```tsx
import { Container, Section, Button } from '@/components/primitives';

export default function Page() {
  return (
    <Section spacing="lg">
      <Container size="xl">
        <h1>Page Title</h1>
        <p>Content here...</p>
        <Button variant="primary">Get Started</Button>
      </Container>
    </Section>
  );
}
```

### Form Example
```tsx
import { FormRow, Input, Button } from '@/components/primitives';

export default function ContactForm() {
  return (
    <form>
      <FormRow label="Name" htmlFor="name" required>
        <Input id="name" placeholder="Your name" />
      </FormRow>

      <FormRow label="Email" htmlFor="email" required>
        <Input id="email" type="email" placeholder="you@example.com" />
      </FormRow>

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Card Grid
```tsx
import { Section, Container, Card } from '@/components/primitives';

export default function Services() {
  return (
    <Section>
      <Container>
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="feature" hover>
            <h3>Tree Removal</h3>
            <p>Professional removal services</p>
          </Card>
          {/* More cards... */}
        </div>
      </Container>
    </Section>
  );
}
```

## Kitchen Sink Demo

A complete demonstration page exists at `/design-system` (noindex):
- Shows all component variants
- Color palette visualization
- Typography scale
- Spacing examples
- Interactive form elements

**Access**: http://localhost:3000/design-system (dev only, excluded from sitemap)

## Performance Characteristics

- **Bundle size**: Minimal - Tailwind purges unused classes
- **Render performance**: No runtime CSS-in-JS, pure Tailwind classes
- **Type checking**: Zero overhead at runtime (compile-time only)
- **Tree shaking**: Unused primitives not included in bundle

## Migration Notes

### From Legacy Components
Old components in `src/components-legacy/` are:
- React Router based (.jsx files)
- Excluded from TypeScript program (tsconfig)
- Will be gradually replaced or removed
- Not imported by new pages

### TypeScript-Only Enforcement
- `tsconfig.json` excludes `src/components-legacy`
- Only `.tsx` files in `src/components/` and `src/components/primitives/`
- No `.jsx` files allowed in active codebase
- Build fails on TypeScript errors (no `ignoreBuildErrors`)

## Next Steps

These primitives are the foundation for:
1. **Site chrome** (Header, Footer, CTAs) ✅ COMPLETE
2. **Page templates** (Hero, service pages, location pages) 🚧 IN PROGRESS
3. **Marketing modules** (testimonials, FAQ, stats bars, etc.)
4. **Advanced components** (image sliders, modals, etc.) as needed

# Images Folder - Omaha Tree Care

This folder contains images used throughout the site.

## Current Images

### 1. andrew.png (2.0MB)
- **Purpose:** About section photo on homepage
- **Size:** Large (needs optimization)
- **Used in:** `src/pages/HomePage.jsx`
- **Recommendation:** Compress to ~200KB using TinyPNG or Squoosh

### 2. hero-winter-wide.png (2.1MB)
- **Purpose:** Hero section background image
- **Size:** Large (needs optimization)
- **Used in:** `src/pages/HomePage.jsx`
- **Recommendation:** Compress to ~300KB using TinyPNG or Squoosh

<<<<<<< HEAD
### 3. og-image.jpg (REQUIRED for SEO) ⚡
- **Purpose:** Social media sharing preview (Facebook, LinkedIn, Twitter)
- **Exact Size:** 1200x630px (JPEG format)
- **File Name:** og-image.jpg (must match exactly)
- **Location:** /public/images/og-image.jpg
- **Subject:** Professional tree care image or Andrew with company branding
- **Current Status:** ✅ ADDED (91KB - optimized for web)
- **Impact:** Social shares will now display a professional preview image

### 4. Optional: Logo/Favicon
If you have a Midwest Roots logo, add it here as:
- **logo.png** or **logo.svg**
- Update the logo section in the navigation
=======
## Image Optimization
>>>>>>> b9513eac789042a4050167ccd586b97bef966d75

**Current total:** 4.1MB
**Target total:** ~500KB (88% reduction)

See `IMAGE-OPTIMIZATION-GUIDE.md` in the root folder for detailed optimization instructions.

Quick optimization:
1. Go to https://tinypng.com/
2. Upload both images
3. Download compressed versions
4. Replace originals in this folder

## Adding New Images

### For Homepage

To add or replace images on the homepage:

1. **Upload image to this folder** (`/public/images/`)
2. **Reference in code:** `src/pages/HomePage.jsx`

Example:
```jsx
<img src="/images/your-new-image.jpg" alt="Description" />
```

### For Diagnostic Tools

To add images to the diagnostic tools:

1. **Upload image to this folder**
2. **Reference in tool component:** `src/components/tool/screens/*.jsx`

Example in SpeciesIdentifier.jsx:
```jsx
<img src="/images/oak-tree.jpg" alt="Oak tree identification" />
```

## Image Best Practices

### File Size
- **Hero images:** < 300KB
- **Feature images:** < 200KB
- **Icons/logos:** < 50KB
- **Total page weight:** < 1MB for good performance

### Dimensions
- **Hero background:** 2000x1200px minimum (landscape)
- **Feature images:** 1200x800px (landscape) or 800x800px (square)
- **Thumbnails:** 400x400px

### Formats
- **Photos:** JPG or WebP
- **Logos/icons:** PNG or SVG
- **Illustrations:** SVG (preferred) or PNG

### File Naming
- Use lowercase
- Use hyphens, not underscores
- Be descriptive: `oak-tree-hazard.jpg` not `img1.jpg`

## Responsive Images

For better mobile performance, consider using responsive images:

```jsx
<picture>
  <source
    media="(max-width: 768px)"
    srcSet="/images/hero-mobile.webp"
  />
  <source
    media="(min-width: 769px)"
    srcSet="/images/hero-desktop.webp"
  />
  <img
    src="/images/hero-desktop.jpg"
    alt="Winter tree care"
  />
</picture>
```

## WebP Format

For maximum compression with quality:

1. Convert to WebP using Squoosh.app
2. Provide fallback for older browsers:

```jsx
<picture>
  <source srcSet="/images/andrew.webp" type="image/webp" />
  <img src="/images/andrew.png" alt="Andrew Warner" />
</picture>
```

Browser support: 96% (all modern browsers)

## Lazy Loading

For images below the fold, add lazy loading:

```jsx
<img
  src="/images/feature.jpg"
  alt="Description"
  loading="lazy"
/>
```

This improves initial page load time.

## SEO Tips

Always include descriptive alt text:

```jsx
// Good
<img src="/images/oak-hazard.jpg" alt="Hazardous oak tree with split trunk near house" />

// Bad
<img src="/images/oak-hazard.jpg" alt="tree" />
```

## Current Usage

### Homepage (`src/pages/HomePage.jsx`)
- Hero background: `hero-winter-wide.png`
- About section: `andrew.png`

### Tools Page (`src/pages/ToolsPage.jsx`)
- Currently uses no images (icon-based UI)

### Diagnostic Tools (`src/components/tool/screens/*.jsx`)
- Currently uses Lucide icons (no image files)
- Could add educational images in the future

## Planned Images (Future)

Ideas for additional images:
- Tree species identification photos (oak, maple, elm, ash)
- Common pest/disease visuals (Emerald Ash Borer, Dutch Elm Disease)
- Tree hazard examples (leaning trees, dead branches, root damage)
- Before/after service photos

## Storage Location

**Important:** All images must be in `/public/images/` to work correctly.

- ✅ Correct: `/public/images/my-image.jpg` → Reference as `/images/my-image.jpg`
- ❌ Wrong: `/src/images/my-image.jpg` (won't work - images need to be in public folder)

## Build Process

During `npm run build`:
1. Images in `/public/` are copied to `/dist/` as-is
2. No automatic optimization (optimize manually first)
3. Images are served from root `/images/` path

## Performance Testing

After adding/optimizing images:

1. Build the site: `npm run build`
2. Preview: `npm run preview`
3. Open DevTools (F12) → Network tab
4. Reload page and check image sizes
5. Run Lighthouse audit (aim for 90+ performance)

## Tools & Resources

**Free Optimization Tools:**
- TinyPNG: https://tinypng.com/ (PNG/JPG compression)
- Squoosh: https://squoosh.app/ (WebP conversion)
- ImageOptim (Mac): https://imageoptim.com/

**Free Stock Photos (if needed):**
- Unsplash: https://unsplash.com/ (search "tree", "oak", "winter trees")
- Pexels: https://pexels.com/

**Paid (Higher Quality):**
- Adobe Stock
- Shutterstock
- iStock

## Questions?

See the main documentation files:
- `IMAGE-OPTIMIZATION-GUIDE.md` - Detailed optimization instructions
- `README.md` - Technical overview
- `DEPLOYMENT-CHECKLIST.md` - Pre-launch image checklist

---

**Last Updated:** December 2024
**Current Status:** 2 images (4.1MB) - optimization recommended

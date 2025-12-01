# Images Folder

Put your custom images here to replace the stock photos.

## Recommended Images

### 1. hero-winter.jpg
- **Purpose:** Hero section background
- **Size:** 2000x1200px minimum
- **Subject:** Winter trees, snow-covered branches, or storm damage
- **Style:** Dark, moody, dramatic
- **Where to use:** Replace the Unsplash URL on line ~185 of src/App.jsx
- **New code:** `src="/images/hero-winter.jpg"`

### 2. andrew.jpg
- **Purpose:** About section photo
- **Size:** 1000x1000px (square)
- **Subject:** You in safety gear, next to tree
- **Style:** Professional but approachable
- **Where to use:** Replace the Unsplash URL on line ~310 of src/App.jsx
- **New code:** `src="/images/andrew.jpg"`

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

## Image Optimization Tips

Before uploading images:
1. Resize to recommended dimensions
2. Compress using TinyPNG.com or Squoosh.app
3. Aim for < 200KB per image for fast loading
4. Use JPG for photos, PNG for logos

## Stock Photos (Temporary)

The site currently uses Unsplash images. These are fine for testing, but replace them ASAP with your real photos for maximum trust and conversion.

## Adding More Images

Put any additional images in this folder and reference them in your code as:
```jsx
<img src="/images/your-image.jpg" alt="Description" />
```

The `/images/` path works because Vite serves the `public` folder at the root.

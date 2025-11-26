# Image Optimization Guide

## Current Situation

Your `/public/images/` folder contains **4.1MB** of images:
- `andrew.png` - 2.0MB
- `hero-winter-wide.png` - 2.1MB

Modern web performance standards recommend keeping images as small as possible while maintaining quality.

## Expected Results

With proper optimization, you should be able to reduce total image size to approximately **500KB** (88% reduction):
- `andrew.png`: 2.0MB → ~200KB
- `hero-winter-wide.png`: 2.1MB → ~300KB

This will significantly improve:
- Page load time (especially on mobile)
- SEO ranking (Google rewards fast sites)
- User experience
- Bandwidth costs

## Method 1: Online Tools (Easiest)

### TinyPNG (Recommended)
1. Go to https://tinypng.com/
2. Upload `andrew.png` and `hero-winter-wide.png`
3. Download the compressed versions
4. Replace the original files in `/public/images/`

**Pros**: No installation needed, excellent results
**Cons**: Manual process, requires internet

### Squoosh (Google)
1. Go to https://squoosh.app/
2. Upload each image
3. Choose "WebP" format for best compression (or "MozJPEG" for JPG)
4. Adjust quality slider to 80-85
5. Download and replace originals

**Pros**: More control over compression
**Cons**: More technical, requires format conversion

## Method 2: Command Line (Mac/Linux)

### Using ImageMagick

```bash
# Install ImageMagick (Mac)
brew install imagemagick

# Install ImageMagick (Ubuntu/Debian)
sudo apt-get install imagemagick

# Optimize images
cd public/images
magick andrew.png -quality 85 -strip andrew-optimized.png
magick hero-winter-wide.png -quality 85 -strip hero-optimized.png

# Replace originals
mv andrew-optimized.png andrew.png
mv hero-optimized-optimized.png hero-winter-wide.png
```

### Using Sharp CLI

```bash
# Install Sharp CLI
npm install -g sharp-cli

# Optimize images
cd public/images
sharp -i andrew.png -o andrew-optimized.png --quality 85
sharp -i hero-winter-wide.png -o hero-optimized.png --quality 85

# Replace originals
mv andrew-optimized.png andrew.png
mv hero-optimized.png hero-winter-wide.png
```

## Method 3: Convert to Modern Formats

For maximum savings, convert to **WebP** format (supported by 96% of browsers):

```bash
# Using ImageMagick
magick andrew.png -quality 85 andrew.webp
magick hero-winter-wide.png -quality 85 hero-winter-wide.webp
```

Then update your code to use WebP with PNG fallback:

```jsx
<picture>
  <source srcSet="/images/andrew.webp" type="image/webp" />
  <img src="/images/andrew.png" alt="Andrew Warner" />
</picture>
```

## Browser Compatibility

- **PNG/JPG**: 100% browser support
- **WebP**: 96% browser support (all modern browsers)
- **AVIF**: 79% browser support (newest format, best compression)

For this landing page, **WebP** is recommended as the best balance of compression and compatibility.

## After Optimization

1. Test the site locally: `npm run dev`
2. Check that images still look good
3. Verify file sizes: `ls -lh public/images/`
4. Rebuild: `npm run build`
5. Deploy: `vercel deploy` or push to main

## Expected Load Time Improvement

**Before optimization:**
- Hero image (2.1MB) on 4G: ~2-3 seconds
- Total page load: ~4-5 seconds

**After optimization:**
- Hero image (300KB) on 4G: ~0.3 seconds
- Total page load: ~1-2 seconds

This is a **60-70% improvement** in load time!

## Tools Reference

- **TinyPNG**: https://tinypng.com/ (free, easy)
- **Squoosh**: https://squoosh.app/ (free, more control)
- **ImageMagick**: https://imagemagick.org/
- **Sharp**: https://sharp.pixelplumbing.com/

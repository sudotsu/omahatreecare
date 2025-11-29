# Deployment Checklist - Omaha Tree Care

Complete guide for deploying the tree diagnostic tools to production.

## Prerequisites

Before you begin:
- [ ] Node.js 18+ installed
- [ ] Git repository set up
- [ ] Vercel account created (free tier is fine)
- [ ] Domain configured (omahatreecare.com)

## Phase 1: Pre-Deployment Testing (30 minutes)

### ✅ Local Testing

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

- [ ] Homepage loads at `http://localhost:5173`
- [ ] Tools page loads at `http://localhost:5173/tools`
- [ ] All 5 diagnostic tools work:
  - [ ] Species Identifier
  - [ ] Hazard Assessment (test all 4 steps)
  - [ ] Common Problems
  - [ ] DIY vs Professional Guide
  - [ ] Cost Estimator
- [ ] Dark mode toggle works
- [ ] Dark mode preference persists after refresh
- [ ] Back button returns to tool selection
- [ ] Footer links work (phone, email, website)
- [ ] Mobile responsiveness (test in DevTools device mode)

### ✅ Production Build Test

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

- [ ] Build completes without errors
- [ ] Preview loads at `http://localhost:4173`
- [ ] Both routes pre-rendered:
  - [ ] Check `dist/index.html` exists (homepage)
  - [ ] Check `dist/tools.html` or `dist/tools/index.html` exists
- [ ] All tools still work in production build
- [ ] Dark mode still works
- [ ] No console errors in browser DevTools (F12)

### ✅ Content Verification

- [ ] Phone number correct: **(402) 812-3294**
- [ ] Email correct: **andrew@midwestroots.info**
- [ ] Website URL correct: **https://midwestroots.info**
- [ ] Service areas listed: Omaha, Bellevue, Papillion, La Vista, Gretna, Elkhorn
- [ ] Meta description accurate (check `index.html`)
- [ ] All tool descriptions accurate

## Phase 2: Vercel Deployment (15 minutes)

### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Follow the prompts:
- [ ] Set up and deploy? → **Yes**
- [ ] Which scope? → Select your account
- [ ] Link to existing project? → **No** (first time) or **Yes** (subsequent deploys)
- [ ] Project name? → **omaha-tree-care** (or your choice)
- [ ] Directory? → Press Enter (current directory)
- [ ] Override settings? → **No**

### Option B: GitHub + Vercel Integration

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Import to Vercel:**
   - [ ] Go to https://vercel.com/new
   - [ ] Select "Import Git Repository"
   - [ ] Choose your GitHub repo
   - [ ] Vercel auto-detects settings (Vite project)
   - [ ] Click **Deploy**

3. **Wait for deployment:**
   - [ ] Build completes successfully
   - [ ] Visit your `*.vercel.app` URL
   - [ ] Test all tools on live site

## Phase 3: Custom Domain Setup (1-24 hours)

### In Vercel Dashboard

1. Go to your project → **Settings** → **Domains**
2. Add domains:
   - [ ] Add `omahatreecare.com`
   - [ ] Add `www.omahatreecare.com`
3. Vercel provides DNS configuration instructions

### In Your Domain Registrar (e.g., WordPress.com, GoDaddy, Namecheap)

**Option A: CNAME Records (Recommended)**

Add these DNS records:
- [ ] **A Record** for root domain:
  - Name: `@` or leave blank
  - Value: `76.76.21.21` (Vercel's IP)
- [ ] **CNAME Record** for www:
  - Name: `www`
  - Value: `cname.vercel-dns.com`

**Option B: Nameservers (Alternative)**

Update nameservers to Vercel's:
- [ ] `ns1.vercel-dns.com`
- [ ] `ns2.vercel-dns.com`

**DNS Propagation:**
- Typically takes 1-4 hours
- Can take up to 24-48 hours
- Check status: https://dnschecker.org

## Phase 4: Post-Deployment Verification (15 minutes)

### ✅ Live Site Testing

Visit https://omahatreecare.com:
- [ ] Homepage loads correctly
- [ ] Navigate to `/tools`
- [ ] Test each diagnostic tool:
  - [ ] Species Identifier opens
  - [ ] Hazard Assessment completes all 4 steps
  - [ ] Risk results display correctly
  - [ ] Contact CTAs work (phone links, email links)
  - [ ] Common Problems tool works
  - [ ] DIY vs Pro guide works
  - [ ] Cost Estimator works
- [ ] Dark mode toggle works
- [ ] Dark mode persists across page reloads
- [ ] Test on real mobile device (not just DevTools)

### ✅ SEO & Performance

**Run Lighthouse Audit:**
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Desktop" mode
4. Click "Analyze page load"

**Expected scores:**
- [ ] Performance: 90+ (green)
- [ ] Accessibility: 90+ (green)
- [ ] Best Practices: 95+ (green)
- [ ] SEO: 95+ (green)

**Check meta tags:**
- [ ] Right-click → View Page Source
- [ ] Verify `<title>` tag present
- [ ] Verify `<meta name="description">` present
- [ ] Verify structured data (JSON-LD) present

### ✅ Analytics Setup

**Vercel Analytics (Already Installed):**
- [ ] Go to Vercel Dashboard → Analytics
- [ ] Verify pageviews are being tracked
- [ ] Check that `/tools` route shows traffic

**Google Search Console (Optional):**
1. Go to https://search.google.com/search-console
2. Add property: `omahatreecare.com`
3. Verify ownership (Vercel makes this automatic)
4. Submit sitemap: `https://omahatreecare.com/sitemap.xml` (if you have one)

## Phase 5: Monitoring & Maintenance

### Week 1 Checklist

- [ ] **Day 1:** Monitor Vercel Analytics for errors
- [ ] **Day 3:** Check that site appears in Google Search (search "site:omahatreecare.com")
- [ ] **Day 7:** Review user feedback (if any contact submissions)
- [ ] **Ongoing:** Monitor Vercel dashboard for uptime/errors

### Monthly Checklist

- [ ] Check Lighthouse scores (should remain 90+)
- [ ] Test all tools for functionality
- [ ] Review analytics for popular tools
- [ ] Update content if seasonal (e.g., Emerald Ash Borer warnings)
- [ ] Check for React/Vite security updates: `npm outdated`

### Quarterly Checklist

- [ ] Update dependencies: `npm update`
- [ ] Rebuild and redeploy: `npm run build && vercel --prod`
- [ ] Audit accessibility (Lighthouse)
- [ ] Review and update cost estimates (if tree service prices change)
- [ ] Add new diagnostic tools if needed

## Common Deployment Issues

### Issue: Build Fails on Vercel

**Symptoms:** Deployment fails with build errors

**Solutions:**
```bash
# Test build locally first
npm run build

# Check for errors in terminal
# Fix any import errors, syntax errors
# Commit and redeploy
```

### Issue: Routes Not Pre-rendering

**Symptoms:** `/tools` returns 404 or blank page

**Check:**
- [ ] `src/routes.jsx` includes both routes
- [ ] Build output has `dist/tools.html` or `dist/tools/index.html`
- [ ] Vercel build command is `npm run build` (check Settings → General)

**Fix:**
```bash
# Verify routes config
cat src/routes.jsx

# Should show both / and /tools routes
```

### Issue: Dark Mode Not Persisting

**Symptoms:** Dark mode resets on page reload

**Check:**
- [ ] Browser allows localStorage (not in incognito mode)
- [ ] No console errors related to localStorage
- [ ] `TreeDiagnostic.jsx` has useEffect for localStorage

### Issue: Images Not Loading

**Symptoms:** Broken image icons on live site

**Solutions:**
- [ ] Images are in `/public/images/` folder
- [ ] Image references use `/images/filename.ext` (absolute path)
- [ ] Image files were committed to git
- [ ] Redeploy after adding images

### Issue: Contact Links Not Working

**Symptoms:** Phone/email links don't open native apps

**Check:**
- [ ] Phone links use `tel:+14028123294` format
- [ ] Email links use `mailto:andrew@midwestroots.info` format
- [ ] Test on real mobile device (desktop may not have phone app)

## Rollback Procedure

If something goes wrong after deployment:

**Via Vercel Dashboard:**
1. Go to Deployments tab
2. Find previous working deployment
3. Click three dots → "Promote to Production"

**Via Git:**
```bash
# Revert last commit
git revert HEAD
git push origin main

# Vercel auto-deploys the revert
```

## Environment Variables (If Needed)

This project currently has no sensitive environment variables. If you add API keys in the future:

1. **Never commit `.env` files to git**
2. **Add to Vercel:**
   - Project Settings → Environment Variables
   - Add key-value pairs
   - Redeploy for changes to take effect

## Security Checklist

- [ ] No sensitive data in code (API keys, passwords)
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Content Security Policy headers (check Vercel headers config)
- [ ] Regular dependency updates
- [ ] Monitor for security advisories: `npm audit`

## Performance Optimization

**Already Implemented:**
- ✅ Static site generation (SSG)
- ✅ Tailwind CSS purging
- ✅ Lazy-loaded components
- ✅ Optimized React builds
- ✅ Vercel CDN distribution

**Future Optimizations:**
- [ ] Add image optimization (WebP format) - see `IMAGE-OPTIMIZATION-GUIDE.md`
- [ ] Implement route-based code splitting
- [ ] Add service worker for offline support
- [ ] Enable Vercel Image Optimization

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com
- **vite-react-ssg:** https://github.com/antfu/vite-ssg

## Final Pre-Launch Checklist

Before announcing the site publicly:

- [ ] All 5 diagnostic tools tested and working
- [ ] Mobile experience tested on real devices (iOS & Android)
- [ ] Contact info verified (phone, email)
- [ ] SEO meta tags accurate
- [ ] Lighthouse scores 90+ across all metrics
- [ ] Dark mode works consistently
- [ ] Analytics tracking confirmed
- [ ] Custom domain connected and working
- [ ] SSL certificate active (https)
- [ ] Tested in multiple browsers (Chrome, Firefox, Safari)

## Launch Announcement

Once everything is verified:

1. **Social Media:**
   - Share on business social media accounts
   - Include screenshot of the tools
   - Mention it's 100% free for homeowners

2. **Email Newsletter:**
   - Announce to existing customer list
   - Highlight the ISA-standard hazard assessment

3. **Local SEO:**
   - Add to Google My Business post
   - Submit to local directories
   - Share in Omaha community groups

## Emergency Contacts

**Technical Issues:**
- Vercel Support: https://vercel.com/support
- GitHub Issues: Create issue in your repo

**Content Issues:**
- Contact: andrew@midwestroots.info
- Phone: (402) 812-3294

---

**Last Updated:** December 2024
**Project:** Omaha Tree Care - Free Diagnostic Tools
**Version:** 1.0 (SSG Architecture)

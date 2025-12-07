# SEO/GEO Strategy for Omaha Tree Care

**Last Updated:** 2025-12-07
**Domain:** https://omahatreecare.com
**Primary Focus:** Local SEO for Omaha metro tree care services

---

## Table of Contents

1. [Current Implementation](#current-implementation)
2. [Keyword Strategy](#keyword-strategy)
3. [Geographic Targeting](#geographic-targeting)
4. [Structured Data & Schema](#structured-data--schema)
5. [Meta Tags & Social](#meta-tags--social)
6. [Recent SEO Enhancements](#recent-seo-enhancements)
7. [TODO - Prioritized by Impact](#todo---prioritized-by-impact)

---

## Current Implementation

### Technical SEO ✅

- **Sitemap:** `/public/sitemap.xml` - Generated dynamically, ready for Google Search Console
- **Robots.txt:** `/public/robots.txt` - Configured and allowing crawlers
- **Canonical URLs:** Implemented using `CONTACT.siteUrl` constant (not hardcoded)
- **Meta Robots:** `index, follow` on all public pages
- **Analytics:** Vercel Analytics + Google Tag Manager (GTM-KX63X3X4)

### Content Architecture ✅

- **Main Pages:**
  - Homepage: Educational content + winter storm prep focus + trust signals
  - Tools Page: Interactive diagnostic tools
  - EmergencyTreeService: High-risk tree emergencies
  - TreeConsultation: Moderate-risk professional assessment

- **Location Pages:** 25 neighborhood-specific pages across 6 cities:
  - Omaha (19 neighborhoods): Dundee, Benson, Midtown, etc.
  - Bellevue, Elkhorn, Gretna, Papillion, Ralston

- **Internal Linking:**
  - ServiceAreas component links to all location pages
  - Each neighborhood page links to 4 service pages
  - **Total internal links:** 100+ (25 neighborhoods × 4 services)

### Structured Data ✅

**Implemented Schemas:**

1. **LocalBusiness Schema** - On all neighborhood pages:
   - Geo-coordinates for each neighborhood
   - areaServed with Place type and coordinates
   - hasMap property linking to Google Maps
   - Opening hours, contact info

2. **BreadcrumbList Schema** - On all neighborhood pages:
   - 3-level hierarchy (Home → Locations → Neighborhood)
   - Enables breadcrumb rich snippets in SERPs

3. **FAQPage Schema** - Homepage:
   - 4 core questions targeting searcher intent
   - Optimized for "People Also Ask" boxes

### Social Media & OpenGraph ✅

- **OpenGraph Tags:** All pages include:
  - og:title, og:description, og:url, og:image
  - City-specific social images (e.g., `/images/Omaha-Nebraska.webp`)

- **Twitter Cards:** All pages include:
  - twitter:card, twitter:title, twitter:description, twitter:image

---

## Keyword Strategy

### Primary Keywords (High Volume, High Intent)

| Keyword | Monthly Volume | Difficulty | Current Targeting |
|---------|---------------|------------|-------------------|
| omaha tree service | 720 | Medium | ✅ Homepage, Location pages |
| tree removal omaha | 590 | Medium | ✅ Homepage, Service links |
| omaha tree care | 390 | Low | ✅ Title tags, H1s, content |
| tree service omaha ne | 210 | Low | ✅ Meta keywords, location pages |
| emergency tree service omaha | 70 | Low | ✅ Dedicated page |
| tree consultation omaha | 40 | Low | ✅ Dedicated page |

### Geographic Long-Tail Keywords

| Keyword | Current Targeting |
|---------|-------------------|
| tree service dundee omaha | ✅ Dedicated page |
| tree removal benson | ✅ Dedicated page |
| bellevue tree service | ✅ Dedicated page |
| papillion tree care | ✅ Dedicated page |
| gretna tree removal | ✅ Dedicated page |

**Total neighborhood pages:** 25 (all with unique SEO content)

---

## Geographic Targeting

### Service Area Coverage (6 Cities, 25 Neighborhoods)

**Omaha Neighborhoods (19):**
- Dundee, Benson, Midtown, Blackstone, Field Club
- Aksarben, Memorial Park, Country Club, Regency
- Old Market, Hanscom Park, Gold Coast, Rockbrook
- West Omaha, Elkhorn (annexed), Millard (annexed)
- Happy Hollow, Fairacres, Countryside

**Additional Cities (6):**
1. Bellevue, NE
2. Gretna, NE
3. Papillion, NE
4. Ralston, NE
5. Bennington, NE
6. Elkhorn, NE (also Omaha neighborhood)

### Geo-Targeting Implementation ✅

- ✅ Precise lat/lng coordinates for all 25 neighborhoods
- ✅ City-specific landing pages
- ✅ LocalBusiness schema per neighborhood
- ✅ Google Maps integration via hasMap property
- ✅ City-specific social sharing images

---

## Structured Data & Schema

### Implemented Schemas

#### 1. LocalBusiness (All 25 neighborhood pages)
```json
{
  "@type": "LocalBusiness",
  "name": "Midwest Roots Tree Services - [Neighborhood]",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[neighborhood-specific]",
    "longitude": "[neighborhood-specific]"
  },
  "areaServed": {
    "@type": "Place",
    "name": "[Neighborhood]",
    "geo": { "@type": "GeoCoordinates", "latitude": "...", "longitude": "..." }
  },
  "hasMap": "https://maps.google.com/maps?q=[lat],[lng]"
}
```

#### 2. BreadcrumbList (All 25 pages)
- Hierarchical navigation schema
- Improves SERP rich snippet display

#### 3. FAQPage (Homepage)
- 4 high-value questions
- Targets featured snippet opportunities

### Missing Schemas (TODO)

- ❌ **Service Schema** - Individual service pages (tree-removal, tree-trimming, etc.)
- ❌ **Review/AggregateRating** - Requires Google Business Profile setup
- ❌ **HowTo Schema** - For tool instructions

---

## Meta Tags & Social

### Current Meta Tag Pattern

**All pages include:**
```html
<title>{dynamic title with location/service}</title>
<meta name="description" content="{unique per page}" />
<link rel="canonical" href="{CONTACT.siteUrl}/{page-path}" />

<!-- OpenGraph -->
<meta property="og:title" content="{page title}" />
<meta property="og:description" content="{page description}" />
<meta property="og:url" content="{canonical URL}" />
<meta property="og:image" content="{city-specific image}" />
<meta property="og:site_name" content="Midwest Roots Tree Services" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{page title}" />
<meta name="twitter:description" content="{page description}" />
<meta name="twitter:image" content="{social image}" />
```

### Canonical URL Standard

**✅ CORRECT IMPLEMENTATION:**
```jsx
import { CONTACT } from '../constants';
<link rel="canonical" href={`${CONTACT.siteUrl}/page-path`} />
```

**Why this matters:**
- Centralized configuration in `src/constants.js`
- Easy domain changes (no hardcoded URLs)
- Consistent across all 25+ pages

---

## Recent SEO Enhancements

### December 7, 2024 Updates

**✅ Completed:**
1. Fixed hardcoded canonical URLs on EmergencyTreeService and TreeConsultation pages
2. Now using `CONTACT.siteUrl` constant for all canonical URLs
3. Added `import { CONTACT } from '../constants'` to both pages
4. Updated all documentation to reflect canonical URL best practices

**Files Modified:**
- `src/pages/EmergencyTreeService.jsx`
- `src/pages/TreeConsultation.jsx`
- `LOCATION-PAGE-STRATEGY.md`
- `SEO-GEO-STRATEGY.md` (this file)

### Previous Enhancements (December 2024)

**Location Pages:**
- ✅ Added geo-coordinates to all 25 neighborhoods
- ✅ Implemented BreadcrumbList schema
- ✅ Added OpenGraph and Twitter Card meta tags
- ✅ Created service linking section (4 services per neighborhood)
- ✅ Dynamic social images per city

**SEO Bug Fixes:**
- ✅ Fixed `document.title` SSG bug on Emergency/Consultation pages
- ✅ Removed duplicate content between similar pages
- ✅ Added `<Head>` component from vite-react-ssg

---

## TODO - Prioritized by Impact

### Phase 1: Foundation (High Impact, Low Effort) 🔥

1. **Set up Google Business Profile (GBP)** ⚡ CRITICAL
   - Claim listing for "Midwest Roots Tree Services"
   - Add all 6 service area cities
   - Upload photos, add phone (402) 812-3294
   - **Impact:** 50%+ of local search visibility

2. **Set up Google Search Console** ⚡ CRITICAL
   - Verify domain
   - Submit sitemap.xml
   - Monitor indexing
   - **Impact:** Essential for SEO monitoring

3. **Set up Google Analytics 4**
   - Works alongside GTM
   - Track conversions (tool completions, phone clicks)
   - **Impact:** Data-driven optimization

4. **Create Service Pages**
   - `/services/tree-removal`
   - `/services/tree-trimming`
   - `/services/tree-health-assessment`
   - `/services/winter-tree-prep`
   - **Impact:** Receives 100 internal links from location pages

### Phase 2: Content Expansion (Medium Effort, High Impact) 📈

5. **Expand Location Content**
   - Increase from ~200 words to 500+ words per page
   - Add neighborhood-specific FAQ schema
   - Include local tree species info

6. **Create Blog/Resource Section**
   - "When to Remove vs. Treat an Ash Tree in Omaha"
   - "Storm Preparation Checklist for Omaha Homeowners"
   - "Understanding Tree Risk Assessment (ISA Standards)"

7. **Review Generation System**
   - Email/SMS request after service
   - Google review links
   - **Impact:** #1 local SEO ranking factor

### Phase 3: Advanced Optimization 🚀

8. **Link Building Strategy**
   - Nebraska Forest Service resources
   - University of Nebraska extension
   - Local chamber of commerce

9. **Add Service Schema Markup**
   - Individual structured data for each service
   - Pricing ranges, availability

10. **Video Content**
    - YouTube tutorials for diagnostic tools
    - Embed with VideoObject schema

---

## Key Performance Indicators (KPIs)

### Current Baseline (To Be Established)
- [ ] Organic search traffic
- [ ] GBP impressions/clicks/calls
- [ ] Keyword rankings (top 20)
- [ ] Domain authority

### 3-Month Goals
- Organic traffic: +50% from baseline
- GBP views: 500+/month
- Top 3 rankings for: "omaha tree care", "tree service omaha"
- Google reviews: 10+ (5-star average)

### 6-Month Goals
- Organic traffic: +150% from baseline
- GBP views: 1,000+/month
- Tool completions: 50+/month
- Top 3 rankings: 10+ primary keywords

---

## Resources & Tools

### SEO Tools in Use
- Google Tag Manager (GTM-KX63X3X4) ✅
- Vercel Analytics ✅
- vite-react-ssg for SSG ✅

### Pending Setup
- Google Search Console
- Google Analytics 4
- Google Business Profile

---

## Contact

**Business:** Midwest Roots Tree Services
**Phone:** (402) 812-3294
**Email:** andrew@midwestroots.info
**Website:** https://omahatreecare.com

---

**Document Owner:** Midwest Roots Tree Services
**Last Review:** 2025-12-07
**Next Review:** 2026-01-07

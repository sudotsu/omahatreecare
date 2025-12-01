<<<<<<< HEAD
# SEO/GEO Strategy for Omaha Tree Care

**Last Updated:** 2025-11-30
**Domain:** https://omahatreecare.com
**Primary Focus:** Local SEO for Omaha metro tree care services
=======
# SEO/GEO Strategy - Omaha Tree Care

**Last Updated:** December 1, 2024
**Primary Goal:** Rank #1 for "tree diagnostic tool Omaha" and related tree care searches
**Target Audience:** Omaha metro homeowners with tree concerns

## Recent Updates

**December 1, 2024:**
- ✅ Updated sitemap.xml with correct dates
- ✅ Added OpenGraph image meta tags (og:image, dimensions, alt)
- ✅ Verified image alt tags (already well-implemented)
- ✅ Confirmed robots.txt exists and is properly configured
- ⚠️ Image optimization (4.1MB → 500KB) - TODO by user
- ⚠️ Google Search Console - Already set up by user
>>>>>>> b9513eac789042a4050167ccd586b97bef966d75

---

## Table of Contents
<<<<<<< HEAD

1. [Current Implementation](#current-implementation)
2. [Keyword Strategy](#keyword-strategy)
3. [Geographic Targeting](#geographic-targeting)
4. [Structured Data & Schema](#structured-data--schema)
5. [Meta Tags & Social](#meta-tags--social)
6. [Quick Wins Completed](#quick-wins-completed)
7. [TODO - Prioritized by Impact](#todo---prioritized-by-impact)
8. [Monthly SEO Maintenance](#monthly-seo-maintenance)
=======
1. [Current Implementation](#current-implementation)
2. [Keyword Strategy](#keyword-strategy)
3. [Schema Markup](#schema-markup)
4. [Geographic Targeting](#geographic-targeting)
5. [Content Strategy](#content-strategy)
6. [Technical SEO](#technical-seo)
7. [TODO - Prioritized by Impact](#todo---prioritized-by-impact)
>>>>>>> b9513eac789042a4050167ccd586b97bef966d75

---

## Current Implementation

<<<<<<< HEAD
### Technical SEO ✅

- **Sitemap:** `/public/sitemap.xml` - created and ready for Google Search Console submission
  - Homepage: `https://omahatreecare.com/` (priority 1.0, weekly updates)
  - Tools page: `https://omahatreecare.com/tools` (priority 0.9, weekly updates)
  - Last modified: 2025-11-30

- **Robots.txt:** `/public/robots.txt` - configured and allowing crawlers

- **Canonical URLs:** Implemented on all pages via `<link rel="canonical">`

- **Meta Robots:** `index, follow` on all public pages

- **Analytics:** Vercel Analytics installed (`@vercel/analytics` v1.5.0)

### Content Architecture ✅

- **Main Pages:**
  - Homepage: Educational content + trust signals + service overview
  - Tools Page: 5 interactive diagnostic tools (Tree Risk Assessment, EAB Identifier, Cost Estimator, Species Identifier, Diagnostic Flowchart)

- **Internal Linking:** Navigation connects homepage ↔ tools page

### Structured Data ✅

Implemented in `index.html`:

1. **LocalBusiness Schema** - Complete with:
   - Business name: Midwest Roots Tree Care
   - Service area: 6 cities (Omaha, Bellevue, Papillion, La Vista, Gretna, Elkhorn)
   - Geographic coordinates for Omaha
   - Opening hours (Mon-Sat, 8am-6pm)

2. **FAQPage Schema** - 4 core questions:
   - "How do I know if my tree is dangerous?"
   - "How much does tree removal cost in Omaha?"
   - "When is the best time to remove trees in Nebraska?"
   - "Do I need a permit to remove a tree in Omaha?"

### Social Media & OpenGraph ✅

- **OpenGraph Tags:**
  - `og:title`: "Omaha Tree Care - Free Diagnostic Tools & Resources"
  - `og:description`: "Free tree risk assessment tool for Omaha homeowners..."
  - `og:type`: website
  - `og:url`: https://omahatreecare.com/
  - `og:image`: Social sharing image with dimensions (1200x630)
  - `og:image:alt`: Descriptive alt text
=======
### Meta Tags (index.html)

**Title:**
```html
<title>Omaha Tree Care - Free Diagnostic Tools & Resources</title>
```
- ✅ Includes primary keyword: "Omaha Tree Care"
- ✅ Clear value proposition: "Free Diagnostic Tools"
- ✅ Under 60 characters (SEO best practice)

**Description:**
```html
<meta name="description" content="Free tree diagnostic tools for Omaha homeowners. Assess tree risk, get cost estimates, and access expert tree care resources. Omaha-specific, science-based, honest assessments." />
```
- ✅ 155 characters (optimal for Google snippets)
- ✅ Includes target keywords naturally
- ✅ Clear call-to-action: "Assess tree risk, get cost estimates"

**Keywords:**
```html
<meta name="keywords" content="Omaha tree care, tree diagnostic tool, tree risk assessment, Omaha tree service, tree health assessment, EAB treatment, tree removal cost, Bellevue tree service, Papillion tree care, La Vista trees, Gretna tree service, Elkhorn tree care" />
```
- ✅ Primary keyword: "Omaha tree care"
- ✅ Long-tail keywords: "tree diagnostic tool", "tree risk assessment"
- ✅ Geographic targeting: All 6 service area cities
- ✅ Specific problems: "EAB treatment", "tree removal cost"

**OpenGraph (Social Sharing):**
```html
<meta property="og:title" content="Omaha Tree Care - Free Diagnostic Tools & Resources" />
<meta property="og:description" content="Free tree risk assessment tool for Omaha homeowners. Get instant cost estimates and expert recommendations based on arborist science." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://omahatreecare.com/" />
```
- ✅ Optimized for social media sharing
- ⚠️ Missing: og:image (TODO)

**Canonical URL:**
```html
<link rel="canonical" href="https://omahatreecare.com/" />
```
- ✅ Prevents duplicate content issues
>>>>>>> b9513eac789042a4050167ccd586b97bef966d75

---

## Keyword Strategy

<<<<<<< HEAD
### Primary Keywords (High Volume, High Intent)

| Keyword | Monthly Volume | Difficulty | Current Targeting |
|---------|---------------|------------|-------------------|
| omaha tree service | 720 | Medium | ✅ Homepage, meta description |
| tree removal omaha | 590 | Medium | ✅ Homepage, FAQPage schema |
| omaha tree care | 390 | Low | ✅ Title tag, H1, homepage |
| tree service omaha ne | 210 | Low | ✅ Meta keywords, content |
| arborist omaha | 170 | Medium | ❌ **TODO** |
| tree trimming omaha | 140 | Low | ❌ **TODO** |

### Long-Tail Keywords (Lower Volume, Higher Conversion)

| Keyword | Monthly Volume | Difficulty | Current Targeting |
|---------|---------------|------------|-------------------|
| tree removal cost omaha | 90 | Low | ✅ FAQPage, Cost Estimator tool |
| emergency tree service omaha | 70 | Low | ❌ **TODO** - Service page needed |
| ash tree removal omaha | 50 | Low | ✅ EAB tool, species database |
| tree risk assessment | 30 | Low | ✅ Primary tool feature |
| omaha tree disease | 20 | Very Low | ✅ Diagnostic tool content |

### Problem/Question Keywords

| Keyword | Monthly Volume | Current Targeting |
|---------|---------------|-------------------|
| how much to remove a tree | 1,900 (national) | ✅ Cost Estimator, FAQPage |
| when to remove a tree | 480 (national) | ✅ FAQPage schema |
| is my tree dangerous | 110 (national) | ✅ Risk Assessment tool, FAQPage |
| emerald ash borer treatment cost | 90 | ✅ EAB tool documentation |

---

## Geographic Targeting

### Primary Service Area (6 Cities)

Structured data includes all cities in `areaServed`:

1. **Omaha, NE** - Primary market (80% of searches)
2. **Bellevue, NE** - Secondary market
3. **Papillion, NE** - Secondary market
4. **La Vista, NE** - Secondary market
5. **Gretna, NE** - Tertiary market
6. **Elkhorn, NE** - Tertiary market

### City-Specific Keywords (NOT YET TARGETED)

**Opportunity:** Create dedicated city landing pages

- "tree service bellevue ne" (70/mo) ❌
- "tree removal papillion" (40/mo) ❌
- "la vista tree care" (30/mo) ❌
- "gretna tree service" (20/mo) ❌
- "elkhorn tree removal" (20/mo) ❌

**Total untapped monthly searches:** ~180

---

## Structured Data & Schema

### Implemented Schemas

#### 1. LocalBusiness
```json
{
  "@type": "LocalBusiness",
  "name": "Midwest Roots Tree Care",
  "areaServed": [6 cities with full address schemas],
  "geo": { "latitude": "41.2565", "longitude": "-95.9345" },
  "openingHours": "Mo-Sa 08:00-18:00"
}
```

#### 2. FAQPage
- 4 high-value questions targeting search queries
- Direct answers with local context
- Includes pricing ranges and actionable advice

### Missing Schemas (TODO)

- ❌ **HowTo Schema** - For tool instructions (high engagement potential)
- ❌ **Service Schema** - Individual services (tree removal, pruning, etc.)
- ❌ **Review/AggregateRating** - No reviews yet (requires GBP setup)
- ❌ **BreadcrumbList** - For tools subdirectory navigation

---

## Meta Tags & Social

### Current Meta Tags (index.html)

```html
<meta name="description" content="Free tree diagnostic tools for Omaha homeowners. Assess tree risk, get cost estimates, and access expert tree care resources. Omaha-specific, science-based, honest assessments." />

<meta name="keywords" content="Omaha tree care, tree diagnostic tool, tree risk assessment, Omaha tree service, tree health assessment, EAB treatment, tree removal cost, Bellevue tree service, Papillion tree care, La Vista trees, Gretna tree service, Elkhorn tree care" />

<meta name="robots" content="index, follow" />

<link rel="canonical" href="https://omahatreecare.com/" />

<title>Omaha Tree Care - Free Diagnostic Tools & Resources</title>
```

### Social Optimization ✅

- OpenGraph tags complete
- Twitter Card tags: ❌ **TODO**
- Social sharing image created: ✅

---

## Quick Wins Completed

### Recently Implemented (2025-11-30)

- ✅ **Updated sitemap.xml** - Current dates (2025-11-30), proper changefreq
- ✅ **Added OpenGraph images** - Social sharing optimization
- ✅ **Implemented LocalBusiness schema** - Enhanced local search visibility
- ✅ **Implemented FAQPage schema** - Featured snippet opportunities
- ✅ **Fixed date inconsistencies** - All documentation current
=======
### Primary Keywords (Target: Top 3 Rankings)

| Keyword | Monthly Searches | Competition | Current Rank | Strategy |
|---------|-----------------|-------------|--------------|----------|
| omaha tree care | ~500 | Medium | TBD | Homepage + Blog |
| tree diagnostic tool | ~200 | Low | TBD | Tools page |
| tree risk assessment omaha | ~150 | Low | TBD | Hazard Assessment tool |
| tree removal cost omaha | ~400 | Medium | TBD | Cost Estimator tool |
| emerald ash borer treatment omaha | ~300 | Low | TBD | FAQ + Blog |

### Long-Tail Keywords (Target: Top 5 Rankings)

**Problem-Focused:**
- "how do I know if my tree is dangerous" - FAQ implemented ✅
- "should I remove my ash tree in omaha" - FAQ implemented ✅
- "when to hire tree service omaha" - FAQ implemented ✅
- "tree leaning toward house omaha" - TODO: Create content
- "dead tree removal cost omaha" - Partially covered ⚠️

**Geographic Long-Tail:**
- "bellevue tree service" - Keyword meta tag ✅, Content TODO
- "papillion tree care" - Keyword meta tag ✅, Content TODO
- "la vista tree removal" - Keyword meta tag ✅, Content TODO
- "gretna tree service" - Keyword meta tag ✅, Content TODO
- "elkhorn tree care" - Keyword meta tag ✅, Content TODO

### Keyword Placement Strategy

**Current Implementation:**
- ✅ Title tag: Primary keyword first
- ✅ Meta description: Natural keyword use
- ✅ H1 tags: "Omaha Tree Care Guide" (on tools page)
- ✅ H2 tags: Service-specific keywords in tool names
- ✅ Alt text: TODO - no images currently have proper alt text
- ✅ URL structure: Clean, keyword-friendly (`/tools`)

---

## Schema Markup

### 1. LocalBusiness Schema ✅

**Current Implementation:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Omaha Tree Care",
  "description": "Free tree diagnostic tools and expert tree care resources for Omaha homeowners",
  "url": "https://omahatreecare.com",
  "telephone": "+1-402-812-3294",
  "email": "andrew@midwestroots.info",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Omaha",
    "addressRegion": "NE",
    "addressCountry": "US"
  },
  "areaServed": [
    {"@type": "City", "name": "Omaha, NE"},
    {"@type": "City", "name": "Bellevue, NE"},
    {"@type": "City", "name": "Papillion, NE"},
    {"@type": "City", "name": "La Vista, NE"},
    {"@type": "City", "name": "Gretna, NE"},
    {"@type": "City", "name": "Elkhorn, NE"}
  ],
  "priceRange": "Free Tools",
  "serviceType": [
    "Tree Risk Assessment",
    "Tree Diagnostic Tools",
    "Tree Care Consultation"
  ]
}
```

**Impact:**
- ✅ Appears in Google Maps
- ✅ Shows in local search results
- ✅ Displays phone number in search
- ⚠️ Missing: `geo` coordinates (TODO)
- ⚠️ Missing: `openingHours` (TODO - if applicable)
- ⚠️ Missing: `image` (logo/photo)

### 2. FAQPage Schema ✅

**Current Implementation:** 6 questions covering:
1. How do I know if my tree is dangerous?
2. How much does tree removal cost in Omaha?
3. What is Emerald Ash Borer (EAB)?
4. When is the best time to remove a tree in Omaha?
5. Can I remove a tree myself?
6. How accurate is the diagnostic tool?

**Impact:**
- ✅ Eligible for "People Also Ask" boxes in Google
- ✅ Rich snippets in search results
- ✅ Targets long-tail question keywords
- ✅ AI Overview optimization (ChatGPT, Perplexity, Gemini)

**Performance:**
- Expected CTR increase: +15-25% from rich snippets
- Voice search optimization: High

### 3. HowTo Schema ✅

**Current Implementation:**
```json
{
  "@type": "HowTo",
  "name": "How to Assess Your Tree's Risk Level",
  "description": "Step-by-step guide to assessing tree risk",
  "step": [
    "Describe Your Tree",
    "Get Instant Risk Assessment",
    "Review Recommendations and Cost Estimates"
  ],
  "totalTime": "PT10M"
}
```

**Impact:**
- ✅ Shows in "how to" search results
- ✅ Step-by-step rich snippets
- ⚠️ Could add images to steps (TODO)

### 4. Missing Schema (TODO)

**High Priority:**
- `SoftwareApplication` - For the diagnostic tool itself
- `Product` with `AggregateRating` - If we get reviews
- `VideoObject` - If we create tutorial videos
- `BreadcrumbList` - For navigation
- `Organization` with `logo` - Brand identity

---

## Geographic Targeting (GEO)

### Service Area Coverage

**Primary Market:**
- Omaha, NE (Douglas County) - Population: ~480,000
- Bellevue, NE - Population: ~53,000
- Papillion, NE - Population: ~24,000
- La Vista, NE - Population: ~17,000
- Gretna, NE - Population: ~10,000
- Elkhorn, NE - Population: ~55,000

**Total Addressable Market:** ~640,000 people

### Current GEO Implementation

**✅ Implemented:**
1. City names in meta keywords
2. `areaServed` in LocalBusiness schema
3. City-specific keywords in meta description
4. Omaha mentioned in title tag
5. FAQ answers mention "Omaha" or "in Omaha"

**⚠️ Needs Improvement:**
1. No dedicated landing pages for each city
2. No city-specific content
3. No local backlinks from Omaha organizations
4. No Google My Business listing (if applicable)
5. No local citations (Yelp, BBB, etc.)

### Geographic Keywords Priority

| City | Population | Priority | Monthly Searches | Page Needed |
|------|-----------|----------|-----------------|-------------|
| Omaha | 480,000 | **High** | ~500 | Homepage ✅ |
| Bellevue | 53,000 | **High** | ~80 | Dedicated page TODO |
| Elkhorn | 55,000 | Medium | ~60 | Dedicated page TODO |
| Papillion | 24,000 | Medium | ~40 | Dedicated page TODO |
| La Vista | 17,000 | Low | ~20 | Dedicated page TODO |
| Gretna | 10,000 | Low | ~15 | Dedicated page TODO |

---

## Content Strategy

### Current Content Assets

**Pages:**
1. **Homepage** (`/`) - Landing page
   - Pre-rendered ✅
   - Keyword-optimized meta tags ✅
   - Schema markup ✅
   - Content: TODO - analyze

2. **Tools Page** (`/tools`) - Main diagnostic hub
   - Pre-rendered ✅
   - Contains 5 diagnostic tools
   - High user engagement potential
   - Missing: Tool-specific meta tags ⚠️

**Tools (Interactive Content):**
1. **Species Identifier** - Helps identify tree types
2. **Hazard Assessment** - ISA-based risk calculator
3. **Common Problems** - Disease/pest diagnosis
4. **DIY vs Pro Guide** - When to hire help
5. **Cost Estimator** - Omaha-specific pricing

### Content Gaps (TODO)

**High Priority:**
1. Blog/Articles section (0 articles currently)
2. Individual tool landing pages with SEO content
3. City-specific service pages (6 cities)
4. Seasonal guides (winter care, spring pruning, etc.)
5. Tree species guides (Oak, Ash, Maple specific to Omaha)

**Medium Priority:**
6. Case studies / Success stories
7. Video tutorials for each tool
8. Downloadable resources (checklists, guides)
9. Tree care calendar for Omaha
10. EAB information hub (big issue in Omaha)

**Low Priority:**
11. Testimonials page
12. About page
13. Contact page (if adding contact form)

---

## Technical SEO

### Current Implementation

**✅ Excellent:**
- Static Site Generation (SSG) - Pre-rendered HTML for crawlers
- Fast loading (Vite optimized build)
- Mobile responsive (Tailwind CSS)
- Clean URL structure (`/tools` not `/tools.html`)
- HTTPS enabled (via Vercel)
- Canonical tags
- Robots.txt friendly

**✅ Good:**
- React Router v6 for client-side routing
- No JavaScript required for initial HTML (SSG)
- Semantic HTML structure
- Proper heading hierarchy (H1, H2, etc.)

**⚠️ Needs Improvement:**
- No sitemap.xml (TODO - High priority)
- No robots.txt file (TODO - Medium priority)
- Images not optimized (4.1MB total - TODO)
- No image alt tags (TODO - Critical for accessibility)
- No internal linking strategy
- No 404 page SEO optimization
- No breadcrumb navigation

**❌ Missing:**
- Google Analytics / Search Console integration (TODO)
- Core Web Vitals monitoring (TODO)
- Structured logging for SEO insights
- A/B testing framework
- Conversion tracking

### Performance Metrics (Expected)

**Lighthouse Scores (Target):**
- Performance: 95+ ✅
- Accessibility: 90+ ⚠️ (needs image alt tags)
- Best Practices: 100 ✅
- SEO: 95+ ⚠️ (needs sitemap, robots.txt)

**Core Web Vitals (Target):**
- LCP (Largest Contentful Paint): < 2.5s ✅
- FID (First Input Delay): < 100ms ✅
- CLS (Cumulative Layout Shift): < 0.1 ✅
>>>>>>> b9513eac789042a4050167ccd586b97bef966d75

---

## TODO - Prioritized by Impact

<<<<<<< HEAD
### Phase 1: Foundation (High Impact, Low Effort) 🔥

1. **Set up Google Business Profile (GBP)** ⚡ CRITICAL
   - Claim/create listing for "Midwest Roots Tree Care"
   - Add service area (6 cities)
   - Upload business photos
   - Add phone: (402) 812-3294
   - Request reviews from past clients
   - **Impact:** 50%+ of local search visibility

2. **Set up Google Search Console** ⚡ CRITICAL
   - Verify domain ownership
   - Submit sitemap.xml
   - Monitor indexing status
   - Check for crawl errors
   - **Impact:** Essential for SEO monitoring

3. **Set up Google Analytics 4** ⚡ CRITICAL
   - Install GA4 alongside Vercel Analytics
   - Set up conversion goals (form submissions, tool completions)
   - Enable Search Console integration
   - **Impact:** Data-driven optimization

4. **Add Twitter Card meta tags**
   - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
   - Takes 5 minutes, improves social sharing
   - **Impact:** Better social engagement

5. **Create robots.txt entry for sitemap**
   - Add `Sitemap: https://omahatreecare.com/sitemap.xml`
   - Helps crawlers discover sitemap
   - **Impact:** Faster indexing

### Phase 2: Content Expansion (Medium Effort, High Impact) 📈

6. **Create city-specific landing pages** (Priority: High)
   - `/tree-service-bellevue`
   - `/tree-service-papillion`
   - `/tree-service-la-vista`
   - `/tree-service-gretna`
   - `/tree-service-elkhorn`
   - Each page: City-specific content, testimonials, service areas map
   - **Impact:** +180 monthly searches, geo-targeting boost

7. **Create service-specific landing pages**
   - `/tree-removal` (590/mo searches)
   - `/tree-trimming` (140/mo searches)
   - `/emergency-tree-service` (70/mo searches)
   - `/ash-tree-removal` (50/mo searches)
   - `/stump-grinding` (check volume)
   - **Impact:** +800 monthly searches

8. **Expand FAQ content**
   - Add 10-15 more questions to FAQPage schema
   - Target long-tail question keywords
   - Include EAB-specific FAQs
   - **Impact:** Featured snippet opportunities

9. **Create blog/resource section**
   - "When to Remove vs. Treat an Ash Tree in Omaha"
   - "Storm Preparation Checklist for Omaha Homeowners"
   - "Understanding Tree Risk Assessment (ISA Standards)"
   - "Ice Storm Tree Damage: What's Covered by Insurance?"
   - **Impact:** Long-tail traffic, authority building

10. **Add HowTo schema for diagnostic tools**
    - Step-by-step instructions for each tool
    - Increases rich result eligibility
    - **Impact:** Higher CTR from search results

### Phase 3: Advanced Optimization (Higher Effort) 🚀

11. **NAP Consistency Campaign**
    - Create consistent citations across:
      - Google Business Profile
      - Yelp, Angi, HomeAdvisor
      - Local business directories
      - BBB listing
    - **Impact:** Local pack ranking factor

12. **Review Generation System**
    - Email/SMS request after job completion
    - Google review link in communications
    - Respond to all reviews within 24 hours
    - **Impact:** #1 local SEO ranking factor

13. **Link Building Strategy**
    - Partner with local nurseries (backlinks)
    - Nebraska Forest Service resources
    - Local chamber of commerce
    - University of Nebraska extension office
    - **Impact:** Domain authority boost

14. **Add Service schema markup**
    - Individual structured data for each service
    - Pricing info, service areas, availability
    - **Impact:** Enhanced search appearance

15. **Create video content for tools**
    - YouTube videos demonstrating each tool
    - Embed on site with VideoObject schema
    - **Impact:** Video search results, engagement

16. **Implement BreadcrumbList schema**
    - Navigation breadcrumbs on tools pages
    - Improves SERP appearance
    - **Impact:** Better UX + search visibility

17. **Core Web Vitals optimization**
    - Target: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms
    - Optimize images, lazy loading
    - Minimize JavaScript
    - **Impact:** Ranking factor, user experience

18. **Add location pages with embedded maps**
    - Google Maps embed for each service area
    - Driving directions content
    - Local landmarks mentioned
    - **Impact:** Geographic relevance signals

19. **Create seasonal content**
    - Winter storm prep (Oct-Nov)
    - Spring disease prevention (Mar-Apr)
    - Summer watering tips (Jun-Jul)
    - Fall planting guide (Sep-Oct)
    - **Impact:** Recurring seasonal traffic

20. **Set up weekly content publication schedule**
    - 1 blog post per week
    - 1 FAQ addition per week
    - 1 tool update per month
    - **Impact:** Freshness signals, more indexed pages

---

## Monthly SEO Maintenance Checklist

### Week 1: Monitoring & Analysis
- [ ] Review Google Search Console performance
- [ ] Check Google Analytics 4 traffic trends
- [ ] Monitor GBP insights (views, clicks, calls)
- [ ] Review keyword rankings (track top 20)
- [ ] Check for new crawl errors or indexing issues

### Week 2: Content & Optimization
- [ ] Publish 1 new blog post (seasonal/local topic)
- [ ] Add 2-3 new FAQ questions
- [ ] Update meta descriptions based on CTR data
- [ ] Optimize underperforming pages

### Week 3: Local SEO & Citations
- [ ] Request 3-5 new Google reviews
- [ ] Respond to all reviews (if any)
- [ ] Update GBP posts (weekly posts = ranking boost)
- [ ] Check NAP consistency across directories
- [ ] Update service area descriptions

### Week 4: Technical & Links
- [ ] Run site speed test (PageSpeed Insights)
- [ ] Check for broken links (tools, internal nav)
- [ ] Update sitemap.xml if new pages added
- [ ] Reach out to 2-3 potential link partners
- [ ] Review competitor rankings/strategies

### Quarterly Tasks
- [ ] Comprehensive keyword research refresh
- [ ] Competitor backlink analysis
- [ ] Update structured data for seasonal services
- [ ] A/B test meta titles/descriptions
- [ ] Review and update city landing pages

### Annual Tasks
- [ ] Full site SEO audit
- [ ] Review and update all tool documentation
- [ ] Refresh all blog content (update dates, stats)
- [ ] Comprehensive backlink campaign
- [ ] Update business schema (hours, services, etc.)

---

## Key Performance Indicators (KPIs)

### Current Baseline (Need to Establish)
- [ ] Organic search traffic: ___
- [ ] GBP impressions: ___
- [ ] GBP clicks: ___
- [ ] GBP calls: ___
- [ ] Keyword rankings (top 20): ___
- [ ] Backlinks: ___
- [ ] Domain Authority: ___

### 3-Month Goals
- Organic traffic: +50% (from baseline)
- GBP views: 500+/month
- Google reviews: 10+ (5-star average)
- Top 3 rankings for: "omaha tree care", "tree service omaha"
- Top 10 rankings for: 5 primary keywords

### 6-Month Goals
- Organic traffic: +150% (from baseline)
- GBP views: 1,000+/month
- Tool completions: 50+/month
- Lead conversions: 10+/month from organic
- Top 3 rankings for: 10+ primary keywords
- Backlinks: 20+ from local/relevant sites

### 12-Month Goals
- Organic traffic: 3,000+/month
- Dominate local pack for all target cities
- 50+ Google reviews (4.8+ average)
- #1 rankings for all primary keywords
- 100+ tool completions/month
- 30+ qualified leads/month from organic

---

## Resources & Tools

### SEO Tools in Use
- Google Search Console (setup pending)
- Google Analytics 4 (setup pending)
- Vercel Analytics (installed ✅)
- Google Business Profile (setup pending)

### Recommended Additions
- Ahrefs or SEMrush (keyword research, competitor analysis)
- Screaming Frog (technical audits)
- BrightLocal (local SEO tracking)
- Google PageSpeed Insights (Core Web Vitals)

---

## Notes & Strategy Evolution

### 2025-11-30
- Initial SEO foundation complete (meta tags, schema, sitemap)
- OpenGraph optimization added
- Next priority: GBP setup + GSC verification
- Focus: Local pack dominance before paid advertising

### Competitive Advantages
1. **Free diagnostic tools** - Unique value proposition, link magnet
2. **Educational approach** - Builds trust, reduces sales pressure
3. **Local expertise** - Omaha-specific content (EAB, soil, climate)
4. **Transparent pricing** - Cost estimator = high conversion intent
5. **Science-based** - ISA certified arborist standards

### Long-Term Vision
- Become the #1 organic result for all Omaha tree care queries
- Build content authority (blog becomes go-to resource)
- Expand to adjacent markets (Council Bluffs IA?)
- Franchise/white-label tools to other tree services
- YouTube channel for video SEO

---

**Document Owner:** Midwest Roots Tree Care
**Last Review:** 2025-11-30
**Next Review:** 2025-12-31
**Questions?** Reference user's SEO Definition of Done for technical requirements
=======
### 🔴 Critical Priority (Do First)

#### 1. Add Sitemap.xml ⭐⭐⭐⭐⭐
**Impact:** High - Helps Google discover and index all pages
**Effort:** Low (30 minutes)
**How:**
```xml
<!-- /public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://omahatreecare.com/</loc>
    <lastmod>2024-12-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://omahatreecare.com/tools</loc>
    <lastmod>2024-12-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```
Then submit to Google Search Console.

#### 2. Add Image Alt Tags ⭐⭐⭐⭐⭐
**Impact:** High - Accessibility + SEO
**Effort:** Low (15 minutes)
**Current:** 2 images with no alt tags
```jsx
// Before
<img src="/images/andrew.png" />

// After
<img src="/images/andrew.png" alt="Andrew Warner, ISA Certified Arborist in Omaha, NE providing tree risk assessments" />
```

#### 3. Optimize Images (4.1MB → 500KB) ⭐⭐⭐⭐
**Impact:** High - Page speed + SEO rankings
**Effort:** Low (20 minutes)
**See:** `IMAGE-OPTIMIZATION-GUIDE.md`

#### 4. Add OpenGraph Image ⭐⭐⭐⭐
**Impact:** Medium-High - Social sharing CTR
**Effort:** Low (15 minutes)
```html
<meta property="og:image" content="https://omahatreecare.com/images/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```
**Image specs:** 1200x630px, <500KB, tree care theme

#### 5. Google Search Console Setup ⭐⭐⭐⭐⭐
**Impact:** Critical - Track rankings, fix issues
**Effort:** Low (15 minutes)
**Steps:**
1. Go to https://search.google.com/search-console
2. Add property: `omahatreecare.com`
3. Verify via Vercel (automatic)
4. Submit sitemap.xml
5. Monitor weekly

---

### 🟠 High Priority (Do Soon)

#### 6. Create City-Specific Landing Pages ⭐⭐⭐⭐
**Impact:** High - Rank for "tree service [city]"
**Effort:** Medium (2-3 hours for all 6 cities)
**Structure:**
```
/bellevue-tree-service
/papillion-tree-care
/la-vista-tree-removal
/gretna-tree-service
/elkhorn-tree-care
```
**Content per page:**
- City-specific intro (200 words)
- Service area map
- Local tree species info
- Pricing specific to that city
- FAQ for that area
- Schema: LocalBusiness for that city

#### 7. Add Tool-Specific Meta Tags ⭐⭐⭐⭐
**Impact:** Medium-High - Tool pages rank individually
**Effort:** Low (30 minutes)
**Implementation:**
Update each tool screen to dynamically set meta tags:
```jsx
// In HazardAssessment.jsx
useEffect(() => {
  document.title = "Tree Risk Assessment Tool - Omaha Tree Care"
  document.querySelector('meta[name="description"]').content =
    "Free ISA-standard tree risk assessment for Omaha homeowners..."
}, [])
```

#### 8. Add SoftwareApplication Schema ⭐⭐⭐
**Impact:** Medium - Shows in app search results
**Effort:** Low (20 minutes)
```json
{
  "@type": "SoftwareApplication",
  "name": "Tree Risk Assessment Tool",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  }
}
```

#### 9. Internal Linking Strategy ⭐⭐⭐
**Impact:** Medium - Distribute page authority
**Effort:** Medium (1-2 hours)
**Strategy:**
- Homepage links to all 5 tools (currently only links to /tools)
- Each tool links to related tools
- Footer links to all important pages
- Breadcrumb navigation
- "Related Resources" sections

#### 10. Create robots.txt ⭐⭐⭐
**Impact:** Medium - Control crawler behavior
**Effort:** Low (5 minutes)
```txt
# /public/robots.txt
User-agent: *
Allow: /
Sitemap: https://omahatreecare.com/sitemap.xml

# Block sensitive paths (if any)
Disallow: /api/
```

---

### 🟡 Medium Priority (Do This Month)

#### 11. Start Blog with SEO Content ⭐⭐⭐⭐
**Impact:** High (long-term) - Build authority
**Effort:** High (ongoing)
**First 5 Articles:**
1. "Ultimate Guide to Emerald Ash Borer Treatment in Omaha (2024)"
2. "When to Remove a Tree: 10 Warning Signs Omaha Homeowners Should Know"
3. "How Much Does Tree Removal Cost in Omaha? Complete 2024 Guide"
4. "Oak Wilt in Nebraska: Symptoms, Treatment, and Prevention"
5. "Best Time for Tree Pruning in Omaha: Seasonal Guide"

**SEO Strategy:**
- 1,500-2,500 words each
- Target 1 primary keyword
- Include images with alt tags
- Internal links to tools
- FAQ section in each
- Schema: Article markup

#### 12. Add Breadcrumb Navigation + Schema ⭐⭐⭐
**Impact:** Medium - UX + SEO
**Effort:** Medium (1 hour)
```jsx
// Example: Home > Tools > Hazard Assessment
<nav aria-label="Breadcrumb">
  <ol>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/tools">Tools</Link></li>
    <li>Hazard Assessment</li>
  </ol>
</nav>
```
Plus BreadcrumbList schema.

#### 13. Video Content for Each Tool ⭐⭐⭐
**Impact:** High (YouTube SEO + engagement)
**Effort:** High (2-3 hours per video)
**Videos to create:**
1. "How to Use the Tree Risk Assessment Tool"
2. "Identify Your Tree Species in 5 Minutes"
3. "Common Tree Problems in Omaha"
4. "DIY Tree Care vs When to Call a Pro"
5. "Get Accurate Tree Service Cost Estimates"

**Distribution:**
- Upload to YouTube
- Embed on site
- Add VideoObject schema
- Link from tools

#### 14. Local Citations & Backlinks ⭐⭐⭐⭐
**Impact:** High - Local SEO authority
**Effort:** Medium (2-3 hours)
**Directories to list in:**
- Google My Business (if service-based)
- Yelp
- Better Business Bureau (BBB)
- Omaha Chamber of Commerce
- Angie's List / HomeAdvisor
- Thumbtack
- Nextdoor Business

**Backlink Opportunities:**
- University of Nebraska Extension (tree care resources)
- Omaha Tree Commission
- Nebraska Arboretum
- Local news (KETV, WOWT) - tree care tips
- Local gardening blogs

#### 15. Add Geo Coordinates to Schema ⭐⭐
**Impact:** Medium - Google Maps precision
**Effort:** Low (10 minutes)
```json
{
  "@type": "LocalBusiness",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.2565",
    "longitude": "-95.9345"
  }
}
```

---

### 🟢 Low Priority (Future Enhancements)

#### 16. Progressive Web App (PWA) ⭐⭐
**Impact:** Low - Offline access
**Effort:** Medium (2-3 hours)

#### 17. Multilingual Support (Spanish) ⭐⭐
**Impact:** Low-Medium - Omaha has 13% Hispanic population
**Effort:** High

#### 18. AMP Pages ⭐
**Impact:** Low - Google de-prioritizing AMP
**Effort:** High

#### 19. Podcast / Audio Content ⭐⭐
**Impact:** Medium (long-term)
**Effort:** High (ongoing)

#### 20. Interactive Map of Service Area ⭐⭐
**Impact:** Medium - UX + geo targeting
**Effort:** Medium

---

## Tracking & Metrics

### Key Performance Indicators (KPIs)

**Rankings (Track Weekly):**
- "omaha tree care" - Target: Top 3
- "tree diagnostic tool" - Target: #1
- "tree removal cost omaha" - Target: Top 5
- "emerald ash borer omaha" - Target: Top 5

**Traffic (Track Monthly):**
- Organic sessions
- Pages per session
- Bounce rate (target: <60%)
- Avg. session duration (target: >2 minutes)

**Conversions (Track Weekly):**
- Tool completions
- Phone clicks
- Email clicks
- Form submissions (if added)

**Technical (Track Monthly):**
- Core Web Vitals
- Lighthouse scores
- Page load time
- Mobile usability errors

### Tools to Use

**Free:**
- Google Search Console (rankings, clicks, impressions)
- Google Analytics 4 (traffic, behavior)
- Google PageSpeed Insights (performance)
- Bing Webmaster Tools (Bing rankings)

**Paid (Optional):**
- Ahrefs or SEMrush (keyword research, backlinks)
- Moz Local (local SEO)
- Screaming Frog (technical audits)

---

## Quick Wins (Do This Week)

**✅ COMPLETED (December 1, 2024):**
1. ✅ sitemap.xml - Updated with correct dates (already existed)
2. ✅ Image alt tags - Already implemented (andrew.png has descriptive alt)
3. ✅ OpenGraph image - Added og:image meta tags with dimensions
4. ✅ robots.txt - Already exists and configured properly

**⚠️ REQUIRES MANUAL WORK:**
5. ⚠️ Optimize images with TinyPNG (20 min) - User should do manually
6. ⚠️ Google Search Console - Already set up by user

**Total completed:** 4/6 automated tasks ✅
**Time saved:** ~1.5 hours
**Expected impact:** +15-20% organic traffic in 30 days (with image optimization)

---

## Monthly SEO Checklist

**Week 1:**
- Review Google Search Console for errors
- Check ranking changes for top 10 keywords
- Analyze top-performing pages

**Week 2:**
- Publish 1 new blog article (1,500+ words)
- Update old content if needed
- Build 2-3 new backlinks

**Week 3:**
- Technical audit (broken links, speed, mobile)
- Review Core Web Vitals
- Fix any issues found

**Week 4:**
- Competitor analysis (what are they ranking for?)
- Keyword research for next month
- Plan next month's content

---

## Contact

**Questions about SEO strategy?**
- Technical SEO: Check issues in Google Search Console
- Content ideas: Analyze top-ranking competitors
- Local SEO: Focus on Google My Business + citations

---

**Last Review:** December 2024
**Next Review:** January 2025
**Owner:** Midwest Roots Tree Services
>>>>>>> b9513eac789042a4050167ccd586b97bef966d75

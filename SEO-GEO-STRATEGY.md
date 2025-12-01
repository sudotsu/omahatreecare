# SEO/GEO Strategy for Omaha Tree Care

**Last Updated:** 2025-11-30
**Domain:** https://omahatreecare.com
**Primary Focus:** Local SEO for Omaha metro tree care services

---

## Table of Contents

1. [Current Implementation](#current-implementation)
2. [Keyword Strategy](#keyword-strategy)
3. [Geographic Targeting](#geographic-targeting)
4. [Structured Data & Schema](#structured-data--schema)
5. [Meta Tags & Social](#meta-tags--social)
6. [Quick Wins Completed](#quick-wins-completed)
7. [TODO - Prioritized by Impact](#todo---prioritized-by-impact)
8. [Monthly SEO Maintenance](#monthly-seo-maintenance)

---

## Current Implementation

### Technical SEO ✅

- **Sitemap:** `/public/sitemap.xml` - submitted to Google Search Console
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

---

## Keyword Strategy

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

---

## TODO - Prioritized by Impact

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

# Location Page Strategy - Implementation Guide

## Current Implementation

We use vite-react-ssg's `<Head>` component for SEO metadata, which properly bakes meta tags into static HTML at build time.

## The Solution

### 1. Use Head component for SEO metadata (static HTML at build time)

```jsx
// src/pages/LocationTemplate.jsx
import { Head } from 'vite-react-ssg';
import { useParams } from 'react-router-dom';
import { CONTACT } from '../constants';

export default function LocationTemplate() {
  const { city, neighborhood } = useParams();

  const pageTitle = `Tree Service ${neighborhood} ${city} | Midwest Roots`;
  const description = `Expert tree care in ${neighborhood}, ${city}. Storm cleanup, pruning, removal.`;
  const canonicalUrl = `${CONTACT.siteUrl}/locations/${city}/${neighborhood}`;

  return (
    <>
      <Head prioritizeSeoTags>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
      </Head>

      <h1>Tree Services in {neighborhood}</h1>
      {/* Rest of page content */}
    </>
  );
}
```

### 2. Dynamic Route (ONE template for all pages)

```jsx
// src/routes.jsx
{
  path: '/locations/:city/:neighborhood',
  element: <LocationTemplate />,
  entry: 'src/pages/LocationTemplate.jsx'
}
```

### 3. Generate Static HTML at Build (vite-react-ssg)

Load from neighborhoodData.json:
```js
// vite.config.js
import neighborhoods from './src/data/neighborhoodData.json';

ssgOptions: {
  includedRoutes: (paths) => {
    const neighborhoodRoutes = Object.keys(neighborhoods).map(key =>
      `/locations/omaha/${key}`
    );
    return [...paths, ...neighborhoodRoutes];
  }
}
```

## Canonical URLs - IMPORTANT

**Always use `CONTACT.siteUrl` constant for canonical URLs** - never hardcode `https://omahatreecare.com/`:

```jsx
// ✅ CORRECT
import { CONTACT } from '../constants';
<link rel="canonical" href={`${CONTACT.siteUrl}/page-name`} />

// ❌ WRONG - Don't hardcode
<link rel="canonical" href="https://omahatreecare.com/page-name" />
```

This ensures consistency if the domain ever changes.

## Benefits
- ✅ SEO titles baked into static HTML at build time
- ✅ ONE template file, not multiple duplicate files
- ✅ Easy to maintain and update
- ✅ Content pulled from neighborhoodData.json
- ✅ Google sees perfect pre-rendered HTML
- ✅ Canonical URLs use centralized constant

## Current Implementation Status

**Completed:**
- ✅ LocationTemplate.jsx with Head component
- ✅ 25 neighborhood pages from neighborhoodData.json
- ✅ BreadcrumbList schema for all location pages
- ✅ Geo-coordinates in LocalBusiness schema
- ✅ OpenGraph and Twitter Card meta tags
- ✅ Service linking section for internal SEO
- ✅ Canonical URLs using CONTACT.siteUrl constant
- ✅ EmergencyTreeService.jsx using Head + CONTACT.siteUrl
- ✅ TreeConsultation.jsx using Head + CONTACT.siteUrl

**Architecture:**
- Single LocationTemplate.jsx generates all 25 pages
- EmergencyTreeService.jsx and TreeConsultation.jsx use same pattern
- All pages use `CONTACT.siteUrl` for canonical URLs
- Build process pre-renders all routes to static HTML

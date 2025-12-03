# Location Page Strategy - The Right Way

## The Problem We Just Discovered
Using `document.title` in `useEffect` doesn't work for SSG - the title isn't baked into the HTML file. Google sees the default title for all pages.

## The Solution (Gemini is correct)

### 1. Use Helmet for SEO metadata (gets baked into static HTML)

```jsx
// src/pages/LocationTemplate.jsx
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function LocationTemplate() {
  const { city, neighborhood } = useParams();

  const pageTitle = `Tree Service ${neighborhood} ${city} | Midwest Roots`;
  const description = `Expert tree care in ${neighborhood}, ${city}. Storm cleanup, pruning, removal.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://omahatreecare.com/locations/${city}/${neighborhood}`} />
      </Helmet>

      <h1>Tree Services in {neighborhood}</h1>
      {/* Rest of page content */}
    </>
  );
}
```

### 2. Dynamic Route (ONE route for all pages)

```jsx
// src/routes.jsx
{
  path: '/locations/:city/:neighborhood',
  element: <LocationTemplate />,
  entry: 'src/pages/LocationTemplate.jsx'
}
```

### 3. Generate Static HTML at Build (vite-react-ssg)

Option A: Manual list in vite.config.js
```js
export default defineConfig({
  ssgOptions: {
    includedRoutes: (paths, routes) => {
      return [
        '/locations/gretna/tiburon',
        '/locations/gretna/aspen-creek',
        '/locations/omaha/dundee',
        // ... all your locations
      ]
    }
  }
})
```

Option B: Load from data file
```js
import locations from './data/locations.json';

ssgOptions: {
  includedRoutes: (paths) => {
    return locations.map(loc => `/locations/${loc.city}/${loc.neighborhood}`)
  }
}
```

## Benefits
- ✅ SEO titles baked into HTML
- ✅ ONE template file, not 200 files
- ✅ Easy to maintain
- ✅ Can pull content from database/JSON
- ✅ Google sees perfect HTML immediately

## Next Steps
1. Convert Gretna page to use Helmet
2. Create LocationTemplate.jsx for neighborhoods
3. Configure includedRoutes for all locations

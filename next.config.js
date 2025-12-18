/** @type {import('next').NextConfig} */

const locationsData = require('./src/data/locations.json')
const servicesData = require('./src/data/services.json')

/**
 * Normalize services.json into a flat array of service objects.
 */
const normalizeServices = (data) => {
  if (Array.isArray(data)) return data;

  if (data && typeof data === "object") {
    if (Array.isArray(data.services)) return data.services;
    if (Array.isArray(data.items)) return data.items;

    const vals = Object.values(data);
    const flattened = vals.flatMap((v) => (Array.isArray(v) ? v : [v]));
    return flattened.filter(Boolean);
  }

  return [];
};

/**
 * Generate location routes for sitemap
 */
const generateLocationRoutes = () => {
  const routes = [];

  Object.keys(locationsData).forEach((city) => {
    routes.push(`/locations/${city}`);

    locationsData[city].forEach((neighborhood) => {
      routes.push(`/locations/${city}/${neighborhood}`);
    });
  });

  return routes;
};

/**
 * Generate service routes for sitemap
 * FIXED: Prepends /services/ prefix (bug fix from MIGRATION_PLAN.md)
 */
const generateServiceRoutes = () => {
  const services = normalizeServices(servicesData);

  const routes = services
    .map((service) => {
      const slug = service?.slug || service?.path || service?.url || service?.id || service?.handle;

      if (!slug) return null;

      // FIX: Prepend /services/ instead of just /
      return `/services/${slug}`;
    })
    .filter(Boolean);

  return routes;
};

// Static routes
const staticRoutes = [
  "/",
  "/tools",
  "/locations",
  "/tree-consultation-omaha",
  "/emergency-tree-service-omaha",
];

// Master route list (for future sitemap generation)
const allRoutes = [...staticRoutes, ...generateLocationRoutes(), ...generateServiceRoutes()].filter(
  (route, index, self) => self.indexOf(route) === index,
); // dedupe

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    domains: ["omahatreecare.com"],
    formats: ["image/avif", "image/webp"],
  },

  // Trailing slash behavior (matching vercel.json config)
  trailingSlash: false,

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Redirects - Legacy URLs to Canonical
  async redirects() {
    const redirects = [
      // Core redirects
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];

    // Service redirects: / → /services/
    const services = normalizeServices(servicesData);

    services.forEach((service) => {
      const slug = service?.slug || service?.id;

      if (slug) {
        redirects.push({
          source: `/${slug}`,
          destination: `/services/${slug}`,
          permanent: true,
        });
      }
    });

    return redirects;
  },
};

// Export Next.js config with allRoutes attached
module.exports = nextConfig
module.exports.allRoutes = allRoutes

/**
 * Sitemap Generation
 * Generated from canonical route source of truth
 */

<<<<<<< Updated upstream
import { GetServerSideProps } from 'next'
import { getAllCanonicalRoutes } from '@/routes'
=======
import { GetServerSideProps } from "next";
import { getAllCanonicalRoutes } from "../src/routes";
>>>>>>> Stashed changes

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const routes = getAllCanonicalRoutes();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${route.path.startsWith("http") ? route.path : `https://omahatreecare.com${route.path}`}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  // This component is never rendered
  return null;
}

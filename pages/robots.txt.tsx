/**
 * Robots.txt Generation
 */

<<<<<<< Updated upstream
import { GetServerSideProps } from 'next'
import { SITE_URL } from '@/constants'
=======
import { GetServerSideProps } from "next";
import { SITE_URL } from "../src/constants";
>>>>>>> Stashed changes

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: ${SITE_URL}/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
};

export default function RobotsTxt() {
  return null;
}

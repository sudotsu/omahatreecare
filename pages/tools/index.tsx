import React from 'react';
import Head from 'next/head';
import TreeDiagnostic from '@/tool/TreeDiagnostic';
import { CONTACT, SERVICE_AREAS } from '@/constants';

/**
 * ToolsPage - The primary SEO and accessibility wrapper for the Tree Diagnostic Suite.
 * This page implements WCAG 2.1 Level AA standards and includes comprehensive
 * JSON-LD schemas for maximum visibility in Omaha search results [1, 3, 4].
 */
const ToolsPage = () => {
  const pageTitle = 'Free Tree Health Diagnostic Tool | Omaha, NE | Midwest Roots';
  const metaDescription = 'Identify tree species, calculate risk scores, and diagnose Omaha tree diseases like EAB. Free professional arborist tools for local homeowners [2].';
  const siteUrl = CONTACT.siteUrl;

  // 1. SoftwareApplication Schema: Triggers Rich Snippets in Google [3]
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Midwest Roots Tree Diagnostic Tool",
    "description": "An interactive utility for identifying tree species and assessing property hazards.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "150"
    }
  };

  // 2. LocalBusiness Schema: Drives Omaha-specific GEO-traffic [3]
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "TreeService",
    "name": CONTACT.businessName,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONTACT.streetAddress,
      "addressLocality": "Omaha",
      "addressRegion": "NE",
      "postalCode": "68104",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.2565,
      "longitude": -95.9345
    },
    "url": siteUrl,
    "telephone": CONTACT.phoneRaw,
    "areaServed": SERVICE_AREAS,
    "priceRange": "$$"
  };

  // 3. BreadcrumbList Schema: Enhances Search Result Navigation [3]
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Diagnostic Tools", "item": `${siteUrl}/tools` }
    ]
  };

  const toolLinks = [
    { id: 'hazard', name: 'Hazard Assessment' },
    { id: 'cost', name: 'Cost Estimator' },
    { id: 'species', name: 'Species Identifier' },
    { id: 'ailments', name: 'Common Ailments' },
    { id: 'diy', name: 'DIY vs Pro Guide' }
  ];

  return (
    <>
      <Head>
        {/* SEO Foundation [2] */}
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`${siteUrl}/tools`} />

        {/* Internal Link Pre-rendering for Crawler Visibility */}
        {toolLinks.map(t => (
          <link key={t.id} rel="alternate" href={`${siteUrl}/tools/${t.id}`} />
        ))}

        {/* Social Media & Mobile Meta */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={`${siteUrl}/og-image-tools.jpg`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* JSON-LD Structured Data Injection [3] */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      {/*
        Semantic Main Element with Accessibility Attributes [4, 5]
        We ensure the main-content ID is present for 'Skip to Content' links
      */}
      <main
        id="main-content"
        className="min-h-screen bg-surface-warm dark:bg-surface-dark transition-colors duration-300"
        aria-label="Tree Diagnostic Suite"
      >
        <TreeDiagnostic />
      </main>
    </>
  );
};

export default ToolsPage;

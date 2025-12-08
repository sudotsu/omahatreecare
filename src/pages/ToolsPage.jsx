import React from 'react';
import { Head } from 'vite-react-ssg';
import { TreeDiagnostic } from '../components/tool/TreeDiagnostic';
import { CONTACT, SERVICE_AREAS } from '../constants';

const ToolsPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Tree Health Diagnostic Tool | Midwest Roots</title>
        <meta name="description" content="Free AI-powered tree health assessment tool. Check storm risk, identify diseases, and get instant recommendations for your Omaha trees." />
        <link rel="canonical" href={`${CONTACT.siteUrl}/tools`} />

        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${CONTACT.siteUrl}/#organization`,
            "name": CONTACT.businessName,
            "description": "Professional tree care services and free diagnostic tools for Omaha homeowners",
            "image": [`${CONTACT.siteUrl}/images/og-image.jpg`],
            "url": CONTACT.siteUrl,
            "telephone": CONTACT.phone,
            "email": CONTACT.email,
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": CONTACT.streetAddress,
              "addressLocality": CONTACT.addressLocality,
              "addressRegion": CONTACT.addressRegion,
              "postalCode": CONTACT.postalCode,
              "addressCountry": CONTACT.addressCountry
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": CONTACT.latitude,
              "longitude": CONTACT.longitude
            },
            "areaServed": SERVICE_AREAS.map(area => ({
              "@type": area.type,
              "name": area.name,
              "sameAs": area.sameAs,
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": area.latitude,
                "longitude": area.longitude
              }
            })),
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "08:00",
              "closes": "18:00"
            },
            "sameAs": CONTACT.socialProfiles
          })}
        </script>

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": CONTACT.siteUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Tools",
                "item": `${CONTACT.siteUrl}/tools`
              }
            ]
          })}
        </script>

        {/* SoftwareApplication Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Midwest Roots Diagnostic Tool",
            "operatingSystem": "Web Browser",
            "applicationCategory": "UtilitiesApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "A web-based diagnostic tool for Omaha homeowners to assess tree health, storm risk, and potential removal costs.",
            "featureList": "Risk Score Calculation, Lean Angle Assessment, Cost Estimator",
            "author": {
              "@type": "LocalBusiness",
              "name": CONTACT.businessName
            }
          })}
        </script>
      </Head>

      {/* This renders your actual interactive tool */}
      <TreeDiagnostic />
    </div>
  );
};

export default ToolsPage;
import React from 'react';
import { useLocation } from 'react-router-dom'; // IMPORT THIS
import { Head } from 'vite-react-ssg';
import FAQAccordion from '../components/FAQAccordion';
import Features from '../components/Features';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import { CONTACT } from '../constants';

export default function HomePage() {
  const location = useLocation(); // GET LOCATION
  const canonicalUrl = `https://omahatreecare.com${location.pathname}`; // BUILD URL

  return (
    <div className="bg-slate-50">
      <Head>
        <title>Omaha Tree Service | Winter Defense & Tree Removal | {CONTACT.businessName}</title>
        <meta name="description" content={`Expert tree risk assessment and removal in Omaha. We help homeowners make data-backed decisions about their trees. Call ${CONTACT.phone}.`} />

        {/* ADD CANONICAL LINK */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Schema for Home Page ONLY */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": CONTACT.businessName,
            "image": "https://omahatreecare.com/og-image.jpg",
            "telephone": CONTACT.phoneRaw,
            "email": CONTACT.email,
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
            "url": CONTACT.siteUrl,
            "priceRange": "$$"
          })}
        </script>
      </Head>

      <main>
        <Hero />
        <SocialProof />
        <Features />
        <FAQAccordion />
      </main>
    </div>
  );
}
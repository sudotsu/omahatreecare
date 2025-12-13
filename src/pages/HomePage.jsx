import React from 'react';
import { useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

// --- LAYOUT & UTILS ---
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { CONTACT } from '../constants';
import { useScrollPosition } from '../hooks/useScrollPosition';

// --- PAGE SECTIONS ---
import Credibility from '../components/Credibility'; // <-- ADDED (Was missing)
import FAQAccordion from '../components/FAQAccordion';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import LocalOrdinances from '../components/LocalOrdinances';
import ServiceAreas from '../components/ServiceAreas';
import SocialProof from '../components/SocialProof';
import WhyDifferent from '../components/WhyDifferent';
import WinterTriage from '../components/WinterTriage';

export default function HomePage() {
  const location = useLocation();
  const canonicalUrl = `https://omahatreecare.com${location.pathname}`;
  const scrolled = useScrollPosition();

  return (
    <div className="bg-slate-50">
      <Head>
        <title>Omaha Tree Service | Winter Defense & Tree Removal | {CONTACT.businessName}</title>
        <meta name="description" content={`Expert tree risk assessment and removal in Omaha. We help homeowners make data-backed decisions about their trees. Call ${CONTACT.phone}.`} />

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

      {/* --- NAVIGATION --- */}
      <Navigation scrolled={scrolled} />

      <main>
        <Hero />
        <SocialProof />
        <Credibility /> {/* <-- ADDED: Fits perfectly after social proof */}

        <WinterTriage />
        <HowItWorks />
        <WhyDifferent />

        {/* Omaha Specific Rules */}
        <section className="container mx-auto px-4 py-12">
           <LocalOrdinances />
        </section>

        <ServiceAreas />
        <FAQAccordion />
      </main>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}
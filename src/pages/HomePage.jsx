import React from 'react';
import { Head } from 'vite-react-ssg';
import Credibility from '../components/Credibility';
import FAQAccordion from '../components/FAQAccordion';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Navigation from '../components/Navigation';
import ServiceAreas from '../components/ServiceAreas';
import SocialProof from '../components/SocialProof';
import WhyDifferent from '../components/WhyDifferent';
import WinterTriage from '../components/WinterTriage';
import { CONTACT, SERVICE_AREAS } from '../constants';
import { useScrollPosition } from '../hooks/useScrollPosition';

const HomePage = () => {
  const scrolled = useScrollPosition();

  return (
    // FOREMAN FIX: Removed 'bg-slate-50' class.
    // It is now transparent so the global 'stone-100' background shows through.
    <div className="min-h-screen font-sans selection:bg-opacity-20 text-slate-900">
      <Head prioritizeSeoTags>
        <title>Omaha Tree Care | Winter Defense & Tree Removal | Midwest Roots</title>
        <meta name="description" content="Free tree diagnostic tools for Omaha homeowners. Assess storm risk, get winter prep estimates, and access expert tree care resources. Serving Dundee, Millard, & Elkhorn." />
        <meta name="keywords" content="Omaha tree care, tree diagnostic tool, tree risk assessment, Omaha tree service, winter tree prep, ice storm prevention, Dundee tree service" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={CONTACT.siteUrl} />

        {/* OpenGraph */}
        <meta property="og:title" content="Omaha Tree Care - Free Diagnostic Tools & Resources" />
        <meta property="og:description" content="Free tree risk assessment tool for Omaha homeowners. Get instant cost estimates and expert recommendations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CONTACT.siteUrl} />
        <meta property="og:image" content={`${CONTACT.siteUrl}/images/og-image.jpg`} />

        {/* Complete LocalBusiness Schema - Dynamic & Comprehensive */}
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
              "streetAddress": CONTACT.address.split(',')[0], // Extract street
              "addressLocality": "Omaha",
              "addressRegion": "NE",
              "postalCode": "68104",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 41.2565, // Omaha Lat
              "longitude": -95.9345 // Omaha Lng
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
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Tree Care Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Tree Removal",
                    "description": "Safe removal of hazardous and unwanted trees"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Tree Trimming & Pruning",
                    "description": "Structural pruning and canopy management"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Tree Health Assessment",
                    "description": "Professional arborist evaluation and diagnosis"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Winter Tree Preparation",
                    "description": "Storm damage prevention and ice load management"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Free Tree Diagnostic Tools",
                    "description": "Online risk assessment and cost estimation tools"
                  }
                }
              ]
            },
            "sameAs": [
              CONTACT.facebookUrl,
              CONTACT.linkedinUrl,
              CONTACT.googleMapsUrl
            ].filter(Boolean)
          })}
        </script>
      </Head>

      <Navigation scrolled={scrolled} />
      <Hero />
      <WinterTriage />
      <WhyDifferent />
      <Credibility />
      <HowItWorks />
      <SocialProof />
      <FAQAccordion />
      <ServiceAreas />
      <Footer />
    </div>
  );
};

export default HomePage;
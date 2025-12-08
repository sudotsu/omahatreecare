import React from 'react';
import { Head } from 'vite-react-ssg';
import Credibility from '../components/Credibility';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Navigation from '../components/Navigation';
import ServiceAreas from '../components/ServiceAreas';
import SocialProof from '../components/SocialProof';
import WhyDifferent from '../components/WhyDifferent';
import WinterTriage from '../components/WinterTriage';
import { CONTACT } from '../constants'; // <-- NEW REQUIRED IMPORT
import { useScrollPosition } from '../hooks/useScrollPosition';

const HomePage = () => {
  const scrolled = useScrollPosition();

  // Color Palette: "Trusted Local"
  const colors = {
    primary: '#52796f',      // Muted green
    accent: '#c1666b',        // Terracotta
    background: '#f8f6f1',    // Cream
    text: '#3d3027',          // Dark brown
  };

  return (
    <div
      className="min-h-screen font-sans selection:bg-opacity-20"
      style={{
        backgroundColor: colors.background,
        color: colors.text
      }}
    >
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
              "streetAddress": "5634 Corby St # 1",
              "addressLocality": "Omaha",
              "addressRegion": "NE",
              "postalCode": "68104-4128",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "41.28431",
              "longitude": "-96.00133"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Omaha",
                "sameAs": "https://en.wikipedia.org/wiki/Omaha,_Nebraska"
              },
              {
                "@type": "City",
                "name": "Gretna",
                "sameAs": "https://en.wikipedia.org/wiki/Gretna,_Nebraska"
              },
              {
                "@type": "Place",
                "name": "Millard",
                "sameAs": "https://en.wikipedia.org/wiki/Millard,_Omaha"
              },
              {
                "@type": "Place",
                "name": "Elkhorn",
                "sameAs": "https://en.wikipedia.org/wiki/Elkhorn,_Omaha"
              },
              {
                "@type": "City",
                "name": "Papillion",
                "sameAs": "https://en.wikipedia.org/wiki/Papillion,_Nebraska"
              },
              {
                "@type": "City",
                "name": "Bellevue",
                "sameAs": "https://en.wikipedia.org/wiki/Bellevue,_Nebraska"
              },
              {
                "@type": "City",
                "name": "Bennington",
                "sameAs": "https://en.wikipedia.org/wiki/Bennington,_Nebraska"
              },
              {
                "@type": "City",
                "name": "Ralston",
                "sameAs": "https://en.wikipedia.org/wiki/Ralston,_Nebraska"
              }
            ],
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
              "https://midwestroots.info",
              "https://facebook.com/midwestrootsomaha",
              "https://www.linkedin.com/company/midwestrootsomaha/",
              "https://maps.google.com/?cid=2577349893469380478"
            ]
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
      <ServiceAreas />
      <Footer />
    </div>
  );
};

export default HomePage;
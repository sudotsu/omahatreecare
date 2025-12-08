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

        {/* THE FINAL SCHEMA FIX (LocalBusiness) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": CONTACT.businessName,
            "image": [
              `${CONTACT.siteUrl}/images/og-image.jpg`
            ],
            "url": CONTACT.siteUrl,
            "telephone": CONTACT.phone,
            "email": CONTACT.email,
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Serving the Omaha Metro Area",
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
            "areaServed": [
              {
                "@type": "Place",
                "name": "Dundee",
                "sameAs": "https://en.wikipedia.org/wiki/Dundee%E2%80%93Happy_Hollow_Historic_District"
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
              }
            ],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
              }
            ],
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61565568559288"
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
import React from 'react';
import { Head } from 'vite-react-ssg';
import Credibility from '../components/Credibility';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Navigation from '../components/Navigation';
import ServiceAreas from '../components/ServiceAreas';
import SocialProof from '../components/SocialProof';
import WinterTriage from '../components/WinterTriage';
import WhyDifferent from '../components/WhyDifferent';
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
        <title>Omaha Tree Care - Free Diagnostic Tools & Resources</title>
        <meta name="description" content="Free tree diagnostic tools for Omaha homeowners. Assess tree risk, get cost estimates, and access expert tree care resources. Omaha-specific, science-based, honest assessments." />
        <meta name="keywords" content="Omaha tree care, tree diagnostic tool, tree risk assessment, Omaha tree service, tree health assessment, EAB treatment, tree removal cost, Bellevue tree service, Papillion tree care, La Vista trees, Gretna tree service, Elkhorn tree care" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://omahatreecare.com/" />
        <meta property="og:title" content="Omaha Tree Care - Free Diagnostic Tools & Resources" />
        <meta property="og:description" content="Free tree risk assessment tool for Omaha homeowners. Get instant cost estimates and expert recommendations based on arborist science." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://omahatreecare.com/" />
        <meta property="og:image" content="https://omahatreecare.com/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Professional tree care services and free diagnostic tools for Omaha homeowners" />
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

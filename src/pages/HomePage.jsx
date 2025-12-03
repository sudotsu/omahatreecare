import React from 'react';
import Credibility from '../components/Credibility';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Navigation from '../components/Navigation';
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
      <Navigation scrolled={scrolled} />
      <Hero />
      <WinterTriage />
      <WhyDifferent />
      <Credibility />
      <HowItWorks />
      <SocialProof />
      <Footer />
    </div>
  );
};

export default HomePage;

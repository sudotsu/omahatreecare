import React from 'react';
import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/react'; // TODO: Uncomment after running: npm install @vercel/speed-insights
import Credibility from './components/Credibility';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Navigation from './components/Navigation';
import SocialProof from './components/SocialProof';
import { useScrollPosition } from './hooks/useScrollPosition';

const App = () => {
  const scrolled = useScrollPosition();

  // New Color Palette: "Trusted Local"
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
      {/* Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          body, p, li, a, button {
            font-family: 'Inter', sans-serif;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <Navigation scrolled={scrolled} />
      <Hero />
      <Credibility />
      <HowItWorks />
      <SocialProof />
      <Footer />
      <Analytics />
      {/* <SpeedInsights /> */}
    </div>
  );
};

export default App;

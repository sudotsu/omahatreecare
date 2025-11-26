import React from 'react';
import About from './components/About';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import RiskAuditForm from './components/RiskAuditForm';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import { useScrollPosition } from './hooks/useScrollPosition';

const App = () => {
  const scrolled = useScrollPosition();

  // Brand Colors
  const colors = {
    navy: '#0a192f', // Midnight Navy
    orange: '#ff5e00', // Safety Orange
    grey: '#64748b', // Steel Grey
    white: '#f8fafc',
  };

  return (
    <div className="min-h-screen font-sans text-slate-100 selection:bg-orange-500 selection:text-white" style={{ backgroundColor: colors.navy }}>
      {/* Google Fonts Injection */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@600;800;900&display=swap');

          h1, h2, h3, h4, h5, h6 {
            font-family: 'Montserrat', sans-serif;
          }
          body, p, li, a, button {
            font-family: 'Lato', sans-serif;
          }
        `}
      </style>

      <Navigation scrolled={scrolled} />
      <Hero />
      <WhyUs />
      <About />
      <RiskAuditForm />
      <Services />
      <Footer />
    </div>
  );
};

export default App;

import { ArrowRight, CheckCircle } from 'lucide-react';
import React from 'react';

const Hero = () => {
  return (
    <header className="relative pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Clean cream background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-stone-100"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#3d3027' }}>
            Know Your Tree Risk<br />
            <span style={{ color: '#52796f' }}>Before Winter Storms Hit</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto" style={{ color: '#6b5d54' }}>
            Free winter prep diagnostic tool. Assess ice storm damage risk,<br />
            get honest recommendations. Omaha-specific. 10 minutes.
          </p>

          {/* Primary CTA */}
          <a
            href="/tools"
            className="group inline-flex items-center justify-center text-lg font-semibold px-10 py-4 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              backgroundColor: '#52796f',
              color: '#ffffff'
            }}
          >
            Start Free Assessment
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} aria-hidden="true" />
          </a>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium" style={{ color: '#8b8175' }}>
            <div className="flex items-center">
              <CheckCircle size={16} className="mr-2" style={{ color: '#52796f' }} aria-hidden="true" />
              No email required
            </div>
            <div className="flex items-center">
              <CheckCircle size={16} className="mr-2" style={{ color: '#52796f' }} aria-hidden="true" />
              Instant results
            </div>
            <div className="flex items-center">
              <CheckCircle size={16} className="mr-2" style={{ color: '#52796f' }} aria-hidden="true" />
              ISA standards
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;

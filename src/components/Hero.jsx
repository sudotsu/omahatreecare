import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS, TRUST_SIGNALS } from '../constants';
import FastQuote from './FastQuote'; // Import the widget

const Hero = () => {
  return (
    <header className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/og-image.jpg)',
          backgroundPosition: 'center 40%'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50/90 via-stone-100/80 to-stone-100/90"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT COLUMN: The Pitch */}
          <div className="text-center lg:text-left">

            {/* Time Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold shadow-sm mx-auto lg:mx-0"
                 style={{ backgroundColor: COLORS.primary, color: '#ffffff' }}>
              <Clock size={16} aria-hidden="true" />
              <span>Free Assessment • Takes 10 Minutes</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: COLORS.text }}>
              Know Your Tree Risk<br />
              <span style={{ color: COLORS.primary }}>Before Winter Storms Hit</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{ color: COLORS.textLight }}>
              Free winter prep diagnostic tool. Assess ice storm damage risk, get honest recommendations. Omaha-specific.
            </p>

            {/* Secondary CTA: Link to Tool */}
            <div className="mb-8">
              <Link
                to="/tools"
                className="inline-flex items-center text-lg font-semibold hover:underline decoration-2 underline-offset-4 transition-all"
                style={{ color: COLORS.primary }}
              >
                Or use the Diagnostic Tool
                <ArrowRight className="ml-2" size={20} aria-hidden="true" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm font-medium" style={{ color: COLORS.textLighter }}>
              <div className="flex items-center">
                <CheckCircle size={16} className="mr-2" style={{ color: COLORS.primary }} aria-hidden="true" />
                No email required
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="mr-2" style={{ color: COLORS.primary }} aria-hidden="true" />
                Instant results
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="mr-2" style={{ color: COLORS.primary }} aria-hidden="true" />
                {TRUST_SIGNALS.certification}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The "Cash Register" (Fast Quote Widget) */}
          <div className="w-full max-w-md mx-auto lg:ml-auto transform transition-all hover:scale-[1.01] duration-300">
            <FastQuote />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Hero;
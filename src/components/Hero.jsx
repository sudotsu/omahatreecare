import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { TRUST_SIGNALS } from '../constants';
import FastQuote from './FastQuote';

const Hero = () => {
  return (
    <header className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/hero-winter-wide.jpg)',
          backgroundPosition: 'center 40%'
        }}
      />

      {/* FOREMAN FIX: Drastically reduced opacity.
          Top: 60% Grey (Readable Nav)
          Middle: Transparent (Show the Tree!)
          Bottom: Solid Grey (Blend to body)
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-200/60 via-transparent to-stone-200"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT COLUMN */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold shadow-sm mx-auto lg:mx-0 bg-primary text-white">
              <Clock size={16} aria-hidden="true" />
              <span>Free Assessment • Takes 10 Minutes</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900 drop-shadow-sm">
              Know Your Tree Risk<br />
              <span className="text-primary">Before Winter Storms Hit</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-slate-800 font-medium">
              Free winter prep diagnostic tool. Assess ice storm damage risk, get honest recommendations. Omaha-specific.
            </p>

            <div className="mb-8">
              <Link
                to="/tools"
                className="inline-flex items-center text-lg font-semibold hover:underline decoration-2 underline-offset-4 transition-all text-primary hover:text-primary-dark"
              >
                Or use the Diagnostic Tool
                <ArrowRight className="ml-2" size={20} aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm font-medium text-slate-700">
              <div className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-primary" aria-hidden="true" />
                No email required
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-primary" aria-hidden="true" />
                Instant results
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-primary" aria-hidden="true" />
                {TRUST_SIGNALS.certification}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full max-w-md mx-auto lg:ml-auto transform transition-all hover:scale-[1.01] duration-300">
            <FastQuote />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Hero;
import { AlertTriangle, ArrowRight, CheckCircle, HardHat } from 'lucide-react';
import React from 'react';

const Hero = () => {
  return (
    <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900 opacity-95 z-10"></div>
        <img
          src="/images/hero-winter-wide.png"
          alt="Trees covered in heavy snow and ice posing winter storm risks"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-orange-600/10 border border-orange-500/30 rounded px-3 py-1 mb-6">
            <AlertTriangle size={16} className="text-orange-500" aria-hidden="true" />
            <span className="text-orange-400 text-xs md:text-sm font-bold uppercase tracking-wider">Winter Storm Warning: Omaha Season 2025</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-xl">
            IS YOUR PROPERTY READY FOR THE NEXT <span className="text-orange-500 font-black">ICE STORM?</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl border-l-4 border-orange-600 pl-6">
            Heavy snow and ice turn weak branches into expensive liabilities. We specialize in
            <strong className="text-white"> winter structural pruning</strong> to protect your roof, vehicles, and power lines before the weather turns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#audit" className="group bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold px-8 py-4 rounded shadow-lg shadow-orange-900/40 transition-all flex items-center justify-center">
              <HardHat className="mr-2 group-hover:rotate-12 transition-transform" size={24} aria-hidden="true" />
              SCHEDULE FREE RISK AUDIT
            </a>
            <a href="#why-us" className="group border-2 border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-bold px-8 py-4 rounded transition-all flex items-center justify-center">
              Why Winter Pruning?
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 flex items-center space-x-6 text-sm font-semibold text-slate-400">
            <div className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2" aria-hidden="true" /> Fully Insured</div>
            <div className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2" aria-hidden="true" /> Safety Obsessed</div>
            <div className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2" aria-hidden="true" /> Omaha Local</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;

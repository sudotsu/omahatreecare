import { Ruler, Shield, ThermometerSnowflake } from 'lucide-react';
import React from 'react';

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 bg-slate-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            We Don't Just Chop. <br /><span className="text-orange-500">We Engineer.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            The "Winter Defense" protocol is designed specifically for the Midwest climate. We target the specific threats of Omaha winters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-lg hover:border-orange-500/50 transition-all group">
            <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
              <Ruler size={32} className="text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Structural Integrity Focus</h3>
            <p className="text-slate-400 leading-relaxed">
              We identify and remove 'weak unions' and deadwood that are most likely to fail under snow load. It's not about aesthetics; it's about physics.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-lg hover:border-orange-500/50 transition-all group">
            <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
              <ThermometerSnowflake size={32} className="text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Dormant Season Advantage</h3>
            <p className="text-slate-400 leading-relaxed">
              Without leaves, we see structural defects clearly. Plus, pruning in winter stops disease transmission cold. It is scientifically the best time to cut.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-lg hover:border-orange-500/50 transition-all group">
            <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
              <Shield size={32} className="text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Zero-Liability Promise</h3>
            <p className="text-slate-400 leading-relaxed">
              Fully insured and safety-obsessed. When we work on your property, your home is protected by our coverage and our experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

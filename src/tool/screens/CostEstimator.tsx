'use client';

import React, { useState } from 'react';
import { DollarSign, Info, CheckCircle, ArrowRight, X, TrendingDown, Clock } from 'lucide-react';
import { services } from '@/data/tree-data';
import { Service } from '@/types/tree-tools';
import { CONTACT } from '@/constants';

export function CostEstimator() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-amber-900 dark:text-slate-100 uppercase italic leading-none">
          Cost Estimator
        </h2>
        <p className="text-amber-800 dark:text-slate-400 font-medium max-w-xl mx-auto">
          Get transparent price ranges for common Omaha tree services based on typical local market rates.
        </p>
      </div>

      {/* Service Selection Grid */}
      {!selectedService && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <button
              key={service.name}
              type="button"
              onClick={() => setSelectedService(service)}
              className="group p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md border-2 border-transparent hover:border-emerald-500 transition-all text-left flex justify-between items-center"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors uppercase italic tracking-tight">
                  {service.name}
                </h3>
                <p className="text-2xl font-black text-amber-600 dark:text-emerald-500">
                  {service.priceRange}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      )}

      {/* Detailed Estimate View */}
      {selectedService && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-amber-100 dark:border-slate-700">
          <div className="bg-amber-600 p-8 text-white flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">{selectedService.name}</h2>
              <p className="text-amber-100 font-medium">{selectedService.description}</p>
            </div>
            <button type="button" onClick={() => setSelectedService(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-amber-50 dark:bg-slate-900 p-5 rounded-2xl border-l-4 border-amber-500">
                <p className="text-xs uppercase font-bold text-amber-800 dark:text-amber-500 mb-1">Price Range</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{selectedService.priceRange}</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border-l-4 border-emerald-500">
                <p className="text-xs uppercase font-bold text-emerald-800 dark:text-emerald-500 mb-1">Typical Cost</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{selectedService.typical}</p>
              </div>
            </div>

            <section>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600" /> Price Factors
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.factors.map(factor => (
                  <div key={factor} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> {factor}
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-500" /> Pro Tip: How to Save
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Schedule work during the <strong>dormant season (winter)</strong> when demand is lower or bundle multiple services together to reduce travel fees.
              </p>
            </div>

            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="flex items-center justify-center gap-3 w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-1"
            >
              📞 Request Official Quote
            </a>
          </div>
        </div>
      )}

      {/* Educational Footer */}
      {!selectedService && (
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 italic">
            *Pricing for services like <strong>Ash Tree EAB Treatment</strong> ($10-$15 per inch) is calculated by diameter at chest height.
          </p>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { AlertCircle, Bug, ThermometerSun, X, Calendar, ShieldCheck, Stethoscope } from 'lucide-react';
import { ailments } from '@/data/tree-data';
import { Ailment, AilmentType, Severity } from '@/types/tree-tools';
import { CONTACT } from '@/constants';

export function CommonAilments() {
  const [selectedAilment, setSelectedAilment] = useState<Ailment | null>(null);
  const [filterType, setFilterType] = useState<AilmentType | 'all'>('all');

  const filteredAilments = filterType === 'all'
    ? ailments
    : ailments.filter(a => a.type === filterType);

  const getSeverityStyle = (severity: Severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'serious': return 'bg-orange-500 text-white';
      case 'moderate': return 'bg-yellow-500 text-slate-900';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-amber-900 dark:text-slate-100 uppercase italic">Omaha Tree Health</h2>
        <p className="text-amber-800 dark:text-slate-400 font-medium max-w-xl mx-auto">Identify local pests, diseases, and environmental stresses [4].</p>
      </div>

      {/* Filter Tabs */}
      {!selectedAilment && (
        <div className="flex flex-wrap justify-center gap-2">
          {(['all', 'pest', 'disease', 'environmental'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-xl font-bold uppercase tracking-tighter transition-all ${
                filterType === type ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* Ailment Cards */}
      {!selectedAilment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAilments.map((ailment) => (
            <button
              key={ailment.name}
              type="button"
              onClick={() => setSelectedAilment(ailment)}
              className="p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all border border-transparent hover:border-emerald-500/30 text-left"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase italic">{ailment.name}</h3>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${getSeverityStyle(ailment.severity)}`}>
                  {ailment.severity}
                </span>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2">Affects: {ailment.affectedSpecies.join(', ')} [5].</p>
            </button>
          ))}
        </div>
      )}

      {/* Detail Modal View */}
      {selectedAilment && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-amber-100 dark:border-slate-700">
          <div className={`p-8 text-white flex justify-between items-start bg-gradient-to-br ${selectedAilment.severity === 'critical' ? 'from-red-600 to-red-800' : 'from-emerald-600 to-emerald-800'}`}>
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">{selectedAilment.name}</h2>
              <p className="opacity-90 font-bold uppercase text-xs tracking-widest">{selectedAilment.type} | {selectedAilment.severity} Severity</p>
            </div>
            <button type="button" onClick={() => setSelectedAilment(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors"><X /></button>
          </div>

          <div className="p-8 space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase text-sm italic tracking-tight"><Stethoscope className="w-4 h-4 text-emerald-500" /> Symptoms</h4>
                <ul className="space-y-2">
                  {selectedAilment.symptoms.map(s => <li key={s} className="text-sm text-slate-600 dark:text-slate-400 flex gap-2"><span>•</span> {s}</li>)}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-amber-100 dark:border-slate-700">
                  <h4 className="font-bold text-amber-900 dark:text-emerald-500 flex items-center gap-2 uppercase text-xs mb-2"><Calendar className="w-4 h-4" /> Best Timing</h4>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedAilment.timing} [6].</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2 uppercase text-xs mb-2"><ShieldCheck className="w-4 h-4" /> Prevention</h4>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedAilment.prevention} [6].</p>
                </div>
              </div>
            </section>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
              <p className="text-sm font-bold text-slate-900 dark:text-white mb-3">Professional Treatment:</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 italic">{selectedAilment.treatment} [6].</p>
              <a href={`tel:${CONTACT.phoneRaw}`} className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold shadow-lg transition-all">
                📞 Get Professional Diagnosis
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

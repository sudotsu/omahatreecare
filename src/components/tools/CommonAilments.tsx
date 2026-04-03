"use client";

import { 
  AlertCircle, 
  Bug, 
  ThermometerSun, 
  ArrowRight, 
  ArrowLeft,
  X,
  Info,
  ShieldAlert,
  ChevronRight,
  Stethoscope
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CONTACT } from "@/lib/constants";
import { ailments, TreeAilment } from "@/data/ailments";
import { dmSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function CommonAilments() {
  const router = useRouter();
  const [selectedAilment, setSelectedAilment] = useState<TreeAilment | null>(null);
  const [filterType, setFilterType] = useState<string | "all">("all");
  const [isInterrupted, setIsInterrupted] = useState(false);

  const filteredAilments = filterType === "all"
    ? ailments
    : ailments.filter(a => a.type === filterType);

  const handleSelect = (ailment: TreeAilment) => {
    setSelectedAilment(ailment);
    if (ailment.threatProfile === "CRITICAL") {
      setIsInterrupted(true);
    } else {
      setIsInterrupted(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className={`${dmSerif.className} text-4xl text-forest mb-4`}>Tree Diagnostic Guide</h2>
        <p className="text-stone-500 max-w-xl mx-auto">
          Identify pests, diseases, and environmental stressors affecting Omaha trees. 
          Early detection prevents structural failure.
        </p>

        {/* Filter Tabs */}
        {!selectedAilment && (
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["all", "pest", "disease", "environmental"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold border-2 transition-all",
                  filterType === type 
                    ? "bg-forest border-forest text-white shadow-md" 
                    : "bg-white border-stone-100 text-stone-400 hover:border-gold hover:text-forest"
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ailment Grid */}
      {!selectedAilment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAilments.map((a) => (
            <button
              key={a.name}
              onClick={() => handleSelect(a)}
              className="group flex flex-col p-6 bg-white rounded-2xl border-2 border-stone-100 hover:border-gold hover:shadow-md transition-all text-left"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-forest group-hover:text-amber-700 transition-colors">{a.name}</h3>
                <ChevronRight className="text-stone-200 group-hover:text-gold transition-colors" />
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-stone-50 text-stone-500 rounded">
                  {a.type}
                </span>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                  a.threatProfile === 'CRITICAL' ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                )}>
                  {a.threatProfile}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail / Interception */}
      {selectedAilment && (
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100">
          
          {/* Pathological Interruption */}
          {isInterrupted && (
            <div className="absolute inset-0 z-50 bg-red-950/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-fade-in text-white">
              <div className="mb-6 rounded-full bg-red-500/20 p-6 animate-pulse">
                <Stethoscope className="w-16 h-16 text-red-400" />
              </div>
              <h3 className={`${dmSerif.className} text-4xl mb-4 text-red-100`}>Fatal Pathogen Detected</h3>
              <p className="text-red-200/80 max-w-md mb-8 text-lg leading-relaxed">
                <strong>{selectedAilment.name}</strong> is a highly aggressive threat. 
                Delayed action typically results in total tree loss and increased removal hazards.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                  onClick={() => router.push(`/contact?source=ailment_interruption&ailment=${selectedAilment.name}`)}
                  className="flex-1 bg-gold text-forest font-bold py-4 rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  Urgent Consultation <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => setIsInterrupted(false)}
                  className="flex-1 border-2 border-white/20 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-all"
                >
                  View Details Anyway
                </button>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="bg-stone-900 p-8 md:p-12 text-white">
            <button 
              onClick={() => setSelectedAilment(null)}
              className="mb-6 text-white/40 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Back to Guide
            </button>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className={`${dmSerif.className} text-5xl mb-2`}>{selectedAilment.name}</h2>
                <p className="text-xl text-gold/80 capitalize">{selectedAilment.type} Stressor</p>
              </div>
              <div className="flex gap-3">
                <span className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border",
                  selectedAilment.threatProfile === 'CRITICAL' ? "border-red-500 text-red-400" : "border-amber-500 text-amber-400"
                )}>
                  {selectedAilment.threatProfile}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 text-forest">
            <div className="space-y-8">
              <section>
                <h4 className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs mb-4">
                  Visual Symptoms
                </h4>
                <ul className="space-y-3">
                  {selectedAilment.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs mb-4">
                  Affected Species
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {selectedAilment.affectedSpecies.join(", ")}
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                <h4 className="text-emerald-900 font-bold mb-4 flex items-center gap-2">
                  Professional Treatment
                </h4>
                <p className="text-emerald-800 text-sm leading-relaxed mb-6">
                  {selectedAilment.treatment}
                </p>
                <div className="p-4 bg-white/50 rounded-lg border border-emerald-200">
                  <p className="text-xs font-bold text-emerald-900 uppercase tracking-widest mb-1">Optimal Timing</p>
                  <p className="text-sm text-emerald-700">{selectedAilment.timing}</p>
                </div>
              </div>

              <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
                <h4 className="text-forest font-bold mb-4 flex items-center gap-2">
                  Prevention Method
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {selectedAilment.prevention}
                </p>
                <button
                  onClick={() => router.push(`/contact?source=ailment_guide&issue=${selectedAilment.name}`)}
                  className="mt-8 w-full bg-forest text-white font-bold py-4 rounded-xl hover:bg-forest-deep transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Verify Health On-Site <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

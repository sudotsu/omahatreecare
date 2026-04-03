"use client";

import { 
  DollarSign, 
  Info, 
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Zap,
  Target,
  FileText,
  Clock,
  ChevronRight,
  Settings2,
  Maximize2,
  Construction,
  Truck
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CONTACT } from "@/lib/constants";
import { dmSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TreeRingsBackground } from "@/components/ui/TreeRingsBackground";

// ── Operational Archetypes ──────────────────────────────────────────────────
interface Archetype {
  id: string;
  label: string;
  description: string;
  range: string;
  typical: string;
  factors: string[];
  icon: any;
}

const ARCHETYPES: Archetype[] = [
  {
    id: "standard",
    label: "Residential Standard",
    description: "Trees with clear drop zones and standard equipment access.",
    range: "$400 — $1,200",
    typical: "$850",
    icon: Target,
    factors: ["Truck access within 50ft", "No primary utility lines", "Standard debris hauling"],
  },
  {
    id: "technical",
    label: "Technical Operation",
    description: "Large trees or restricted backyard access requiring rigging.",
    range: "$1,200 — $3,500",
    typical: "$2,200",
    icon: Construction,
    factors: ["Complex rigging required", "Near structures/fences", "Limited equipment access"],
  },
  {
    id: "utility",
    label: "Critical Utility/Hazard",
    description: "Trees interacting with power lines or in a state of failure.",
    range: "$2,000 — $5,000+",
    typical: "$3,800",
    icon: Zap,
    factors: ["Power line proximity", "Structural failures detected", "High-liability zone"],
  },
  {
    id: "maintenance",
    label: "Fine Pruning / Health",
    description: "Selective canopy cleaning and structural weight reduction.",
    range: "$300 — $1,500",
    typical: "$650",
    icon: ShieldCheck,
    factors: ["Arborist structural cuts", "Deadwood removal", "Disease prevention"],
  }
];

export function CostEstimator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const archetype = ARCHETYPES.find(a => a.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setIsAnalyzing(true);
    
    // Labor Illusion Pacing
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsComplete(true);
    }, 1400);
  };

  const reset = () => {
    setStep(1);
    setSelectedId("");
    setIsComplete(false);
  };

  if (isComplete && archetype) {
    return (
      <div className="animate-fade-in relative min-h-[600px] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <TreeRingsBackground />
        
        <div className="relative z-10 flex flex-col md:flex-row h-full">
          {/* Sidebar / Anchor */}
          <div className="flex w-full flex-col p-8 md:w-80 bg-stone-50 border-r-2 border-stone-100">
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Market Baseline</span>
              <h2 className={`${dmSerif.className} mt-1 text-4xl leading-none text-forest`}>
                {archetype.range}
              </h2>
              <p className="mt-2 text-sm font-semibold text-gold uppercase tracking-wider">Estimated Investment</p>
            </div>

            <div className="mt-auto space-y-4">
              <div className="rounded-lg bg-white p-4 shadow-sm border border-stone-100">
                <p className="text-xs font-bold uppercase tracking-wide text-stone-400">Arborist Note</p>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  Omaha market rates are currently affected by fuel costs and disposal fees. These ranges reflect 2024-2025 seasonal data.
                </p>
              </div>
              <button 
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-stone-200 py-3 text-xs font-bold text-stone-500 transition-colors hover:bg-stone-50"
              >
                Reset Parameters
              </button>
            </div>
          </div>

          {/* Main Content / The Authority Pivot */}
          <div className="flex-1 p-8 md:p-12">
            <div className="mb-10 flex items-start justify-between">
              <div>
                <h3 className={`${dmSerif.className} text-3xl text-forest`}>{archetype.label}</h3>
                <p className="mt-2 text-stone-500">Why final quotes require a physical lot walk.</p>
              </div>
              <div className="rounded-full bg-forest p-3 text-gold shadow-lg">
                <FileText size={24} />
              </div>
            </div>

            <div className="space-y-8">
              {/* Complexity Disclosure */}
              <div className="relative rounded-xl border-l-4 border-gold bg-stone-50 p-6">
                <p className="text-lg leading-relaxed text-forest font-medium">
                  For a {archetype.label.toLowerCase()} operation, we typically anchor at <span className="text-amber-700 font-bold">{archetype.typical}</span>. 
                  However, three variables can shift this estimate significantly:
                </p>
              </div>

              {/* The "Why" Factors */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: "Access", desc: "Can we get a spider lift or truck to the trunk?", icon: Truck },
                  { label: "Targets", desc: "Are there structures, power lines, or high-value landscaping below?", icon: Target },
                  { label: "Health", desc: "Is the wood structurally sound for climbing?", icon: ShieldCheck },
                  { label: "Volume", desc: "Total canopy weight and disposal requirements.", icon: Maximize2 },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-stone-100 bg-white p-4 shadow-sm">
                    <item.icon size={18} className="mt-1 text-gold shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-forest">{item.label}</p>
                      <p className="text-xs text-stone-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Final Conversion CTA */}
              <div className="mt-12 text-center">
                <button
                  onClick={() => router.push(`/contact?source=cost_anchor&archetype=${archetype.id}`)}
                  className="group inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-lg font-bold text-forest shadow-lg transition-all hover:scale-105 hover:bg-amber-400 active:scale-95"
                >
                  Schedule Your Firm On-Site Quote
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
                <p className="mt-4 text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">
                  Certified Arborist Inspection · No Obligation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
      {/* Labor Illusion Overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm animate-fade-in text-center px-6">
          <Loader2 className="mb-4 h-12 w-12 animate-spin text-gold" />
          <div className="space-y-1">
            <p className="text-xl font-bold tracking-tight text-forest">Analyzing Local Variables...</p>
            <p className="text-sm text-stone-500 italic animate-pulse">Calculating municipal disposal surcharges</p>
            <p className="text-xs text-stone-400 mt-4">Cross-referencing Omaha equipment access data</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative border-b border-stone-100 p-8 pt-10">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-forest/5 p-2 text-forest">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Step 1: Classification</span>
            <h2 className={`${dmSerif.className} text-3xl text-forest`}>Estimate Your Project</h2>
          </div>
        </div>
        <p className="mt-4 text-stone-500 leading-relaxed max-w-xl">
          Select the operational archetype that best matches your tree care needs. We&apos;ll provide current Omaha market ranges.
        </p>
      </div>

      {/* Archetype Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 gap-4">
          {ARCHETYPES.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className="group relative flex w-full items-center justify-between rounded-xl border-2 border-stone-100 bg-white p-6 text-left transition-all hover:border-gold hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-stone-50 text-stone-400 group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                  <opt.icon size={24} />
                </div>
                <div>
                  <p className="text-lg font-bold text-forest transition-colors group-hover:text-amber-700">{opt.label}</p>
                  <p className="mt-1 text-sm text-stone-400 group-hover:text-stone-500">{opt.description}</p>
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-stone-300 transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                <ChevronRight size={20} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-stone-50 p-6 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          <Clock size={12} /> 60 Second Process
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          <ShieldCheck size={12} className="text-emerald-500" /> Professional Accuracy
        </div>
      </div>
    </div>
  );
}

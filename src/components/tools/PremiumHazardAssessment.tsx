"use client";

import {
  XCircle,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Search,
  Zap,
  Target,
  FileText,
  Clock,
  type LucideIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { dmSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TreeRingsBackground } from "@/components/ui/TreeRingsBackground";
import { getRiskLevel as getBaseRiskLevel } from "@/data/hazard-criteria";

// ── Types ───────────────────────────────────────────────────────────────────
interface AssessmentState {
  likelihood: number;
  consequence: number;
  issues: string[];
}

interface QuestionOption {
  text: string;
  subtext: string;
  value: number;
  issues: string[];
}

interface Question {
  id: string;
  title: string;
  description: string;
  options: QuestionOption[];
  icon: LucideIcon;
  isConsequence?: boolean;
}

// ── Data ────────────────────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  {
    id: "trunk",
    title: "Trunk & Roots",
    description: "Look for decay, mushrooms, or structural instability at the base.",
    icon: Search,
    options: [
      { text: "None of These Signs", subtext: "No covered warning sign noticed", value: 1, issues: [] },
      { text: "Minor Irregularity", subtext: "Small cracks or slight lean", value: 2, issues: ["You reported small cracks or a slight lean"] },
      { text: "Cavities, Cracks, or Fungi", subtext: "One or more of these signs is visible", value: 3, issues: ["You reported cavities, large cracks, or fungi"] },
      { text: "Lifting Soil or Major Splits", subtext: "One or more severe signs is visible", value: 4, issues: ["You reported lifting soil or major splits", "You reported signs near the root area"] },
    ],
  },
  {
    id: "canopy",
    title: "Canopy Integrity",
    description: "Assess deadwood and branch attachment strength.",
    icon: Zap,
    options: [
      { text: "None of These Signs", subtext: "Full foliage and no major deadwood noticed", value: 1, issues: [] },
      { text: "Occasional Deadwood", subtext: "A few small dead branches", value: 2, issues: ["Dead branches present"] },
      { text: "Co-dominant Stems or Deadwood", subtext: "These visible signs may need assessment", value: 3, issues: ["You reported multiple dead branches", "You reported co-dominant stems"] },
      { text: "Major Splits or Hanging Limbs", subtext: "Keep away from the affected area", value: 4, issues: ["You reported large dead or hanging limbs", "You reported major splits or storm damage"] },
    ],
  },
  {
    id: "foliage",
    title: "Tree Vitality",
    description: "Assess the overall biological health of the tree.",
    icon: ShieldCheck,
    options: [
      { text: "Vibrant & Full", subtext: "Thick canopy, good color", value: 1, issues: [] },
      { text: "Light Thinning", subtext: "Minor leaf loss or discoloration", value: 2, issues: ["Minor canopy thinning"] },
      { text: "Significant Decline", subtext: "Less than 50% normal foliage", value: 3, issues: ["Significant die-back", "Sparse foliage"] },
      { text: "Dead or Dying", subtext: "Tree has minimal living tissue", value: 4, issues: ["Tree in severe decline or dead"] },
    ],
  },
  {
    id: "target",
    title: "Target Value",
    description: "What is at risk if the tree fails?",
    icon: Target,
    isConsequence: true,
    options: [
      { text: "Remote Area", subtext: "No people or structures nearby", value: 1, issues: [] },
      { text: "Occasional Use", subtext: "Parking or yard used sometimes", value: 2, issues: [] },
      { text: "Frequent Use", subtext: "Near garage or daily driveway", value: 3, issues: [] },
      { text: "High Value", subtext: "Directly over house or sidewalk", value: 4, issues: [] },
    ],
  },
];

const getRiskLevel = (risk: number) => {
  const base = getBaseRiskLevel(risk);
  
  const uiMapping: Record<string, { color: string; bg: string; border: string; label: string }> = {
    'Extreme': { color: "text-red-600",    bg: "bg-red-50",    border: "border-red-200",    label: "Immediate Priority" },
    'High':    { color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", label: "High Priority" },
    'Moderate':{ color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200",  label: "Regular Priority" },
    'Low':     { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", label: "Monitoring" },
  };

  const ui = uiMapping[base.level] || uiMapping['Low'];
  return { ...base, ...ui };
};

/**
 * Guides users through a tree hazard assessment and displays a diagnostic report with recommended next steps.
 *
 * @param searchParams - Optional navigation parameters used to preselect the tree species.
 */
export function PremiumHazardAssessment({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const router = useRouter();
  
  const speciesParam = searchParams?.species;
  const speciesFromNav = Array.isArray(speciesParam) ? speciesParam[0] : speciesParam;

  const [step, setStep] = useState(0);
  const [assessment, setAssessment] = useState<AssessmentState>({ likelihood: 0, consequence: 0, issues: [] });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedTree] = useState<string>(speciesFromNav || "");
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { if (isComplete) resultHeadingRef.current?.focus(); }, [isComplete]);

  const calculateRisk = () => assessment.likelihood * assessment.consequence;

  const handleAnswer = (value: number, issues: string[], isConsequence: boolean) => {
    if (isConsequence) {
      setAssessment(prev => ({ ...prev, consequence: value }));
    } else {
      setAssessment(prev => ({
        ...prev,
        likelihood: Math.max(prev.likelihood, value),
        issues: [...new Set([...prev.issues, ...issues])],
      }));
    }

    if (step < QUESTIONS.length - 1) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(step + 1);
      }, 600);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setIsComplete(true);
      }, 1200);
    }
  };

  const reset = () => {
    setStep(0);
    setAssessment({ likelihood: 0, consequence: 0, issues: [] });
    setIsComplete(false);
  };

  // ── Results View ──────────────────────────────────────────────────────────
  if (isComplete) {
    const risk = getRiskLevel(calculateRisk());
    const score = calculateRisk();

    return (
      <div data-tool-result="true" className="animate-fade-in relative min-h-[600px] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <TreeRingsBackground />
        
        <div className="relative z-10 flex flex-col md:flex-row h-full">
          {/* Sidebar / Summary */}
          <div className={cn("flex w-full flex-col p-8 md:w-80", risk.bg, risk.border, "border-r-2")}>
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Preliminary Screening Result</span>
              <h2 ref={resultHeadingRef} tabIndex={-1} className={`${dmSerif.className} mt-1 text-4xl leading-none outline-none ${risk.color}`}>{risk.level} Urgency</h2>
              <p className="mt-2 text-sm font-semibold text-stone-600">Screening score: {score}/16 from your answers</p>
            </div>

            <div className="mt-auto space-y-4">
              <div className="rounded-lg bg-white/60 p-4 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-stone-600">Next Action</p>
                <p className="mt-1 text-sm font-bold text-forest">{risk.action}</p>
              </div>
              <button 
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-stone-200 py-3 text-xs font-bold text-stone-500 transition-colors hover:bg-stone-50"
              >
                Start New Assessment
              </button>
            </div>
          </div>

          {/* Main Content / Report */}
          <div className="flex-1 p-8 md:p-12">
            <div className="mb-10 flex items-start justify-between">
              <div>
                <h3 className={`${dmSerif.className} text-3xl text-forest`}>Homeowner Screening Summary</h3>
                <p className="mt-2 text-stone-500">Based only on the visible signs and nearby targets you reported.</p>
              </div>
              <div className="rounded-full bg-forest p-3 text-gold">
                <FileText size={24} />
              </div>
            </div>

            <div className="space-y-8">
              {/* Narrative Summary */}
              <div className="relative rounded-xl border-l-4 border-gold bg-stone-50 p-6">
                <p className="text-lg leading-relaxed text-forest">
                  Your answers place this screening in the <span className="font-bold">{risk.level.toLowerCase()} urgency range</span>.
                  {score >= 9 ? " You reported severe warning signs near a possible target. Keep people and pets away, do not work beneath the tree, and contact an appropriate tree-service professional; call emergency services or the utility when there is immediate danger or contact with utility lines." :
                   score >= 6 ? " You reported warning signs that may indicate significant defects. Avoid the affected area and arrange an on-site assessment before attempting work." :
                   score >= 3 ? " You reported signs worth monitoring or discussing during an on-site assessment; this questionnaire cannot determine their cause or severity." :
                   " Your answers did not reveal the major warning signs covered by this screening. That does not establish structural soundness or replace an on-site assessment."}
                </p>
              </div>

              {/* Identified Issues */}
              {assessment.issues.length > 0 && (
                <div>
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-600 text-center">Signs You Reported</h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {assessment.issues.map((issue, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border border-stone-100 bg-white p-4 shadow-sm">
                        <XCircle size={18} className="text-red-400" />
                        <span className="text-sm font-medium text-forest">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Final CTA */}
              <div className="mt-12 text-center">
                <button
                  data-lead-cta="true"
                  onClick={() => router.push(`/contact?risk=${risk.level.toLowerCase()}&score=${score}&species=${encodeURIComponent(selectedTree)}&source=hazard_assessment`)}
                  className="group inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-lg font-bold text-forest shadow-lg transition-all hover:scale-105 hover:bg-amber-400 active:scale-95"
                >
                  Request Professional Walkthrough
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
                <p className="mt-4 text-xs text-stone-600">No obligation. Andrew will review this data before your consultation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Question View ──────────────────────────────────────────────────────────
  const currentQ = QUESTIONS[step];

  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
      {/* Labor Illusion Overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm animate-fade-in">
          <Loader2 className="mb-4 h-12 w-12 animate-spin text-gold" />
          <p className="text-xl font-bold tracking-tight text-forest">{step === QUESTIONS.length - 1 ? "Finalizing Report..." : "Processing response..."}</p>
          <p className="mt-1 text-stone-500 italic">Applying the screening rules to your answers</p>
        </div>
      )}

      {/* Header */}
      <div className="relative border-b border-stone-100 p-8 pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-forest/5 p-2 text-forest">
              <currentQ.icon size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-ink">Step {step + 1} of {QUESTIONS.length}</span>
              <h2 className={`${dmSerif.className} text-3xl text-forest`}>{currentQ.title}</h2>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex gap-1">
              {QUESTIONS.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 w-8 rounded-full transition-all duration-500",
                    i <= step ? "bg-gold" : "bg-stone-100"
                  )} 
                />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-lg text-stone-500 leading-relaxed max-w-xl">{currentQ.description}</p>
      </div>

      {/* Options Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 gap-4">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt.value, opt.issues, currentQ.isConsequence ?? false)}
              className="group relative flex w-full items-center justify-between rounded-xl border-2 border-stone-100 bg-white p-6 text-left transition-all hover:border-gold hover:shadow-md active:scale-[0.99]"
            >
              <div>
                <p className="text-lg font-bold text-forest transition-colors group-hover:text-amber-700">{opt.text}</p>
                <p className="mt-1 text-sm text-stone-600 group-hover:text-stone-500">{opt.subtext}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-stone-300 transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                <ArrowRight size={20} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Meta */}
      <div className="bg-stone-50 p-6 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-widest">
          <ShieldCheck size={14} className="text-emerald-500" />
          Preliminary homeowner screening · Not an on-site assessment
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-widest">
          <Clock size={14} />
          2 Min Process
        </div>
      </div>
    </div>
  );
}

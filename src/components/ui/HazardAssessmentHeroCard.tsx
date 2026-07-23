import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

export function HazardAssessmentHeroCard() {
  return (
    <div className="bg-cream text-slate-900 p-8 rounded-sm shadow-2xl border-t-8 border-gold">
      <div className="mb-6">
        <h2 className="mb-2 flex items-center text-2xl font-bold text-forest">
          <AlertTriangle size={24} className="mr-3 shrink-0 text-forest" aria-hidden="true" />
          Hazard Assessment Tool
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Answer specific questions about your tree&apos;s structure to generate
          an immediate safety score.
        </p>
      </div>

      {/* Traffic Light Preview */}
      <div className="mb-8 space-y-3 rounded-sm border border-slate-200 bg-slate-100 p-4">
        <div className="flex items-center text-sm">
          <div className="mr-3 h-3 w-3 shrink-0 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <span className="w-16 font-bold">GREEN</span>
          <span className="text-slate-600">Low risk. Monitor over time.</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="mr-3 h-3 w-3 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
          <span className="w-16 font-bold">YELLOW</span>
          <span className="text-slate-600">Moderate. Contact a pro this month.</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="mr-3 h-3 w-3 shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
          <span className="w-16 font-bold">RED</span>
          <span className="text-slate-600">Severe reported signs. Keep clear and seek prompt on-site help.</span>
        </div>
      </div>

      <Link
        href="/tools/hazard"
        className="group flex w-full items-center justify-center rounded-sm bg-forest py-4 font-bold text-cream transition-colors hover:bg-slate-800"
      >
        <span>Start Hazard Assessment</span>
        <ArrowRight
          size={18}
          className="ml-2 transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

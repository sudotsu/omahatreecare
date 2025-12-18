import { AlertCircle, CheckCircle, ExternalLink, Scale, ScrollText } from 'lucide-react';
import React from 'react';

export default function LocalOrdinances() {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
          <Scale className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Omaha Tree Rules: What You Need to Know
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Simplified from Omaha Municipal Code Chapter 37
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* The Street Tree Rule */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-emerald-600" />
            Who Owns the "Street Trees"?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            <strong>The City owns them, but you maintain them.</strong><br />
            Per Section 37-9, homeowners abutting a street are legally responsible for watering, pruning, and maintaining trees in the right-of-way (the strip between sidewalk and curb).
          </p>
        </div>

        {/* Permits */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            When Do You Need a Permit?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            You generally do <strong>not</strong> need a permit to prune a tree on your own private property. However, removing or planting a tree in the <strong>public right-of-way</strong> requires a permit from the City Forester (Sec 37-8).
          </p>
        </div>

        {/* Sidewalk Clearance */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Sidewalk Clearance Rules
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            To keep pedestrians safe, limbs must be pruned to maintain clearance of <strong>8-10 feet over sidewalks</strong> and 12-14 feet over residential streets (Sec 37-93).
          </p>
        </div>

        {/* Topping Ban */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            "Topping" is Illegal
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Omaha code explicitly prohibits "topping" (chopping the top off) trees. It ruins the tree's structure and creates hazardous rot. We only use proper ANSI-standard pruning methods (Sec 37-10).
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://parks.cityofomaha.org/parks/forestry"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm inline-flex items-center gap-1 hover:underline transition-colors"
        >
          Visit City Forestry Page for Permits <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
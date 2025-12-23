'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, XCircle, Wrench, Info } from 'lucide-react';
import { CONTACT } from '@/constants';

const tasks = [
  { name: 'Small Branch Pruning (<2")', cat: 'safe', desc: 'Ground-level pruning with hand tools.', note: 'Call if >10ft high.' },
  { name: 'Storm-Damaged Trees', cat: 'pro', desc: 'Broken, hanging, or uprooted trees under tension.', note: 'Extremely dangerous.' },
  { name: 'Medium Branch Pruning (2-4")', cat: 'caution', desc: 'Requires pole saws and safety awareness.', note: 'Never use chainsaw on ladder.' },
  { name: 'Large Branch Removal (>4")', cat: 'pro', desc: 'High-weight limbs requiring rigging.', note: 'Gravity is unforgiving.' },
  { name: 'Tree Near Power Lines', cat: 'pro', desc: 'Any contact or close proximity to utility lines.', note: 'Fatal risk. Call OPPD.' },
  { name: 'Young Tree Training', cat: 'safe', desc: 'Structural pruning for trees under 15ft.', note: 'Great for tree longevity.' },
  { name: 'Stump Grinding', cat: 'pro', desc: 'Requires specialized heavy machinery.', note: 'Utility locates required.' },
  { name: 'Deadwood Removal', cat: 'caution', desc: 'Removing small dead branches for aesthetics.', note: 'Dead wood is brittle.' },
  { name: 'Full Tree Removal', cat: 'pro', desc: 'Complete felling or sectional dismantling.', note: 'High liability task.' }
];

export function DIYvsProGuide() {
  const getCatUI = (cat: string) => {
    switch (cat) {
      case 'safe': return { icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', label: 'Safe for DIY' };
      case 'caution': return { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', label: 'Proceed with Caution' };
      default: return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Professional Only' };
    }
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-amber-900 dark:text-slate-100 uppercase italic">DIY vs. Professional</h2>
        <p className="text-amber-800 dark:text-slate-400 font-medium max-w-xl mx-auto">Your safety is priority #1. Learn when to pick up the loppers and when to call Andrew.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => {
          const ui = getCatUI(task.cat);
          return (
            <div key={task.name} className={`p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${ui.bg}`}><ui.icon className={`w-6 h-6 ${ui.color}`} /></div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white uppercase italic tracking-tight">{task.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{task.desc}</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700 min-w-[200px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Guideline</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2"><Info className="w-3 h-3 text-emerald-500" /> {task.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-emerald-600 rounded-3xl p-8 text-white text-center shadow-xl shadow-emerald-600/20">
        <h3 className="text-2xl font-black uppercase italic mb-2">Still Unsure?</h3>
        <p className="text-emerald-50 mb-6 font-medium">Free advice is always safer than a trip to the ER.</p>
        <a href={`tel:${CONTACT.phoneRaw}`} className="inline-block px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-colors">
          📞 Call {CONTACT.businessName}
        </a>
      </div>
    </div>
  );
}

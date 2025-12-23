'use client';

import React from 'react';
import { TreeDeciduous, AlertTriangle, DollarSign, Wrench, Bug, ArrowRight, ShieldCheck, Banknote, GraduationCap } from 'lucide-react';
import { CONTACT } from '@/constants';

interface HomeProps {
  setScreen: (id: string) => void;
}

export function Home({ setScreen }: HomeProps) {
  const tools = [
    {
      id: 'species',
      icon: TreeDeciduous,
      title: 'Species Identifier',
      description: 'Identify your tree and check for local risks like EAB or Oak Wilt.',
      color: 'from-green-600 to-emerald-700',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-700 dark:text-green-400'
    },
    {
      id: 'hazard',
      icon: AlertTriangle,
      title: 'Hazard Assessment',
      description: 'Calculate your safety risk score using professional ISA standards.',
      color: 'from-orange-600 to-red-700',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-700 dark:text-orange-400'
    },
    {
      id: 'ailments',
      icon: Bug,
      title: 'Common Problems',
      description: 'Diagnose local pests, diseases, and Nebraska environmental stresses.',
      color: 'from-purple-600 to-pink-700',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-700 dark:text-purple-400'
    },
    {
      id: 'diy',
      icon: Wrench,
      title: 'DIY vs Professional',
      description: 'Learn when it’s safe to DIY and when a project requires a professional.',
      color: 'from-blue-600 to-cyan-700',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-700 dark:text-blue-400'
    },
    {
      id: 'cost',
      icon: DollarSign,
      title: 'Cost Estimator',
      description: 'Get transparent price ranges for common tree services in Omaha.',
      color: 'from-yellow-600 to-amber-700',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-700 dark:text-yellow-400'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="text-center py-8 px-4 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
          Your Free Tree <br />
          <span className="text-emerald-600">Care Assistant</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Professional arborist knowledge at your fingertips. Identify problems, assess risks, and make informed decisions for your Omaha property.
        </p>
      </section>

      {/* Tool Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            onClick={() => setScreen(tool.id)}
            className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-left border-2 border-transparent hover:border-emerald-500/20 transform hover:-translate-y-2 overflow-hidden"
          >
            <div className={`${tool.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
              <tool.icon className={`w-8 h-8 ${tool.iconColor}`} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic mb-2 tracking-tighter">
              {tool.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              {tool.description}
            </p>
            <div className="flex items-center gap-2 text-emerald-600 font-black uppercase text-xs tracking-widest">
              Launch Tool <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </div>
          </button>
        ))}
      </section>

      {/* Value Proposition */}
      <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 mx-4 text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-black uppercase italic text-center tracking-tighter">
            Why Educated Homeowners Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: "Expert Knowledge", text: "Professional arborist insights, simplified for you.", icon: GraduationCap },
              { title: "No Pressure", text: "Free tools, zero obligation or sales pitch.", icon: ShieldCheck },
              { title: "Save Money", text: "Learn what you can DIY and when to call pros.", icon: Banknote }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-bold uppercase italic text-xl">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

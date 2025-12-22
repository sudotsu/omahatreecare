'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AlertTriangle, CheckCircle, Info, Mail, MessageSquare, Share2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { CONTACT } from '@/constants';

export function HazardAssessment() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [assessment, setAssessment] = useState({
    likelihood: 0,
    consequence: 0,
    issues: [] as string[]
  });

  const calculateRisk = () => assessment.likelihood * assessment.consequence; [2]

  const getRiskLevel = () => {
    const risk = calculateRisk();
    if (risk >= 9) return { level: 'Extreme', color: 'red', action: 'Immediate action required (0-14 days)', theme: 'from-red-600 to-red-800' }; [2, 4]
    if (risk >= 6) return { level: 'High', color: 'orange', action: 'Priority service within 30-60 days', theme: 'from-orange-600 to-orange-800' }; [2, 4]
    if (risk >= 3) return { level: 'Moderate', color: 'yellow', action: 'Schedule maintenance within 90 days', theme: 'from-yellow-600 to-yellow-800' }; [2, 4]
    return { level: 'Low', color: 'green', action: 'Monitor during regular visits', theme: 'from-green-600 to-green-800' }; [4, 5]
  };

  const questions = [
    {
      title: 'Root & Trunk Condition',
      description: 'Check the base of your tree for these warning signs',
      options: [
        { text: 'Tree appears healthy with no visible defects', value: 1, issues: [] },
        { text: 'Minor issues like small cracks or minor lean', value: 2, issues: ['Minor structural defects'] },
        { text: 'Significant cracks, large cavities, or noticeable lean', value: 3, issues: ['Significant structural defects'] },
        { text: 'Severe lean, major cracks, mushrooms at base, or lifting soil', value: 4, issues: ['Severe structural damage', 'Root decay indicators'] }
      ]
    },
    {
      title: 'Branch Structure',
      description: 'Look at the branches and overall tree structure',
      options: [
        { text: 'Branches appear strong and well-attached', value: 1, issues: [] },
        { text: 'Some dead branches or minor structural issues', value: 2, issues: ['Dead branches present'] },
        { text: 'Multiple dead branches, weak attachments, or co-dominant stems', value: 3, issues: ['Multiple dead branches', 'Weak branch unions'] },
        { text: 'Large dead branches, severe storm damage, or major splits', value: 4, issues: ['Large dead limbs (widow makers)', 'Major storm damage'] }
      ]
    },
    {
      title: 'Tree Health',
      description: 'Assess the overall health and foliage',
      options: [
        { text: 'Full, healthy canopy with good color', value: 1, issues: [] },
        { text: 'Some thinning or minor discoloration', value: 2, issues: ['Minor canopy thinning'] },
        { text: 'Significant die-back or less than 50% normal foliage', value: 3, issues: ['Significant die-back', 'Sparse foliage'] },
        { text: 'Tree is dead or dying with minimal living tissue', value: 4, issues: ['Tree in severe decline or dead'] }
      ]
    },
    {
      title: 'Target Assessment',
      description: 'What could be damaged if the tree or branches fail?',
      options: [
        { text: 'Remote area, no structures or people nearby', value: 1, issues: [] },
        { text: 'Occasional use area, some property at risk', value: 2, issues: [] },
        { text: 'Frequent use area, near structures or regular parking', value: 3, issues: [] },
        { text: 'House, garage, or high-traffic area directly below', value: 4, issues: [] }
      ],
      isConsequence: true
    }
  ];

  const handleAnswer = (value: number, issues: string[] = [], isConsequence = false) => {
    if (isConsequence) {
      setAssessment(prev => ({ ...prev, consequence: value }));
    } else {
      setAssessment(prev => ({
        ...prev,
        likelihood: Math.max(prev.likelihood, value),
        issues: [...new Set([...prev.issues, ...issues])]
      }));
    }
    if (step < questions.length - 1) setStep(step + 1);
  };

  const isComplete = step === questions.length - 1 && assessment.consequence > 0; [8]

  if (isComplete) {
    const risk = getRiskLevel();
    const riskScore = calculateRisk(); [4, 9]

    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-amber-100 dark:border-slate-700 animate-in fade-in zoom-in duration-500">
        <div className={`p-8 text-white bg-gradient-to-br ${risk.theme}`}>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">{risk.level} Risk</h2>
          <p className="text-white/80 font-bold uppercase tracking-widest text-sm">ISA Score: {riskScore} / 16</p> [4, 9]
        </div>

        <div className="p-8 space-y-8">
          <div className="bg-amber-50 dark:bg-slate-900/50 p-6 rounded-2xl border-l-4 border-emerald-500">
            <h3 className="font-black text-amber-900 dark:text-white uppercase italic text-sm mb-2">Recommended Action</h3>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{risk.action}</p> [9]
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push(`/emergency-tree-service-omaha?score=${riskScore}`)}
              className="flex items-center justify-center gap-3 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg hover:bg-emerald-500 transition-all"
            >
              ⚡ Get Professional Eval
            </button> [10, 11]
            <button onClick={() => setStep(0)} className="flex items-center justify-center gap-2 py-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white rounded-2xl font-bold">
              <RotateCcw className="w-5 h-5" /> Start Over
            </button> [12]
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /> [13]
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-black text-amber-900 dark:text-white uppercase italic leading-none">{currentQuestion.title}</h2> [14]
        <p className="text-amber-800 dark:text-slate-400 font-medium">{currentQuestion.description}</p> [14]
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option.value, option.issues, currentQuestion.isConsequence)}
            className="w-full p-6 text-left bg-white dark:bg-slate-800 border-2 border-amber-100 dark:border-slate-700 rounded-2xl hover:border-emerald-500 transition-all shadow-sm group"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-700 dark:text-slate-200">{option.text}</span> [3]
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

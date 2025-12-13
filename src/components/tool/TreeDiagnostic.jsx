import { AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert, TreeDeciduous } from 'lucide-react';
import React, { useState } from 'react';
import { Head } from 'vite-react-ssg';
// REMOVED: import ToolSEO from './ToolSEO';

const DiagnosticStep = ({ step, onAnswer, onBack, totalSteps, currentStepIndex }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
          Question {currentStepIndex + 1} / {totalSteps}
        </span>
        {currentStepIndex > 0 && (
          <button onClick={onBack} className="text-slate-400 hover:text-slate-600 text-sm">
            Back
          </button>
        )}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{step.question}</h2>
      <p className="text-slate-500 mb-8 text-lg">{step.description}</p>

      <div className="grid gap-4">
        {step.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option)}
            className="group text-left p-6 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-lg text-slate-800 group-hover:text-emerald-700">{option.label}</div>
              {option.detail && <div className="text-sm text-slate-500 mt-1">{option.detail}</div>}
            </div>
            <ArrowRight className="text-slate-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};

const DiagnosticResult = ({ result, onReset }) => {
  const getRiskColor = (level) => {
    switch(level) {
      case 'HIGH': return 'bg-red-50 text-red-700 border-red-200';
      case 'MEDIUM': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const getRiskIcon = (level) => {
    switch(level) {
      case 'HIGH': return <ShieldAlert size={48} className="text-red-500" />;
      case 'MEDIUM': return <AlertTriangle size={48} className="text-amber-500" />;
      default: return <CheckCircle2 size={48} className="text-emerald-500" />;
    }
  };

  return (
    <div className="animate-in zoom-in duration-500 text-center">
      <div className="inline-block p-6 rounded-full bg-white shadow-xl mb-6 ring-4 ring-slate-50">
        {getRiskIcon(result.riskLevel)}
      </div>

      <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${getRiskColor(result.riskLevel)}`}>
        {result.riskLevel} RISK DETECTED
      </div>

      <h2 className="text-3xl font-bold text-slate-900 mb-4">{result.title}</h2>
      <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
        {result.recommendation}
      </p>

      <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <TreeDeciduous size={20} className="text-slate-500" />
          Recommended Action Plan:
        </h3>
        <ul className="space-y-3">
          {result.actions.map((action, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
              {action}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/contact"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-1"
        >
          Schedule Assessment
        </a>
        <button
          onClick={onReset}
          className="px-8 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default function TreeDiagnostic() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const steps = [
    {
      id: 'lean',
      question: "Is the tree leaning?",
      description: "Look at the trunk from multiple angles. A sudden lean is more dangerous than a natural one.",
      options: [
        { value: 'sudden', label: "Yes, it recently started leaning", risk: 3, detail: "Roots may be failing" },
        { value: 'gradual', label: "Yes, but it's always been that way", risk: 1, detail: "Likely phototropism (growing towards light)" },
        { value: 'none', label: "No, it's standing straight", risk: 0 }
      ]
    },
    {
      id: 'roots',
      question: "Check the root zone",
      description: "Look at the ground within 5 feet of the trunk base.",
      options: [
        { value: 'heaving', label: "Soil is cracked or heaving up", risk: 3, detail: "Critical root plate failure" },
        { value: 'fungus', label: "Mushrooms growing on roots/base", risk: 2, detail: "Internal decay indicator" },
        { value: 'normal', label: "Looks normal (grass/mulch)", risk: 0 }
      ]
    },
    {
      id: 'canopy',
      question: "Examine the branches",
      description: "Look up at the upper canopy and major limbs.",
      options: [
        { value: 'deadwood', label: "Large dead branches (>2 inch diameter)", risk: 2, detail: "Potential " },
        { value: 'hangers', label: "Broken branches hanging loosely", risk: 2, detail: "Widowmakers" },
        { value: 'clean', label: "Full leaves, no breakage", risk: 0 }
      ]
    },
    {
      id: 'trunk',
      question: "Inspect the trunk",
      description: "Look for cracks, holes, or missing bark.",
      options: [
        { value: 'split', label: "Vertical crack or split", risk: 3, detail: "Structural failure imminent" },
        { value: 'hollow', label: "Large open cavity/hollow", risk: 2, detail: "Compromised strength" },
        { value: 'solid', label: "Solid bark, no wounds", risk: 0 }
      ]
    }
  ];

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const totalRisk = finalAnswers.reduce((sum, a) => sum + (a.risk || 0), 0);
    const hasCritical = finalAnswers.some(a => a.risk === 3);

    if (hasCritical || totalRisk >= 5) {
      setResult({
        riskLevel: 'HIGH',
        title: "Immediate Attention Required",
        recommendation: "Your answers indicate critical structural issues that could lead to failure. Keep people and pets away from the target zone.",
        actions: [
          "Do not park cars under the tree",
          "Contact us for an emergency assessment",
          "Document changes with photos if waiting for service"
        ]
      });
    } else if (totalRisk >= 2) {
      setResult({
        riskLevel: 'MEDIUM',
        title: "Professional Inspection Needed",
        recommendation: "There are signs of stress or decay that should be monitored by an arborist, though imminent failure may not be likely.",
        actions: [
          "Schedule a non-emergency consultation",
          "Monitor for changes after storms",
          "Avoid heavy pruning until assessed"
        ]
      });
    } else {
      setResult({
        riskLevel: 'LOW',
        title: "Tree Appears Healthy",
        recommendation: "Based on your visual check, no major hazards were flagged. Routine maintenance is recommended to keep it that way.",
        actions: [
          "Continue routine watering",
          "Mulch base (but not touching trunk)",
          "Prune every 3-5 years for structure"
        ]
      });
    }
  };

  const reset = () => {
    setStepIndex(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* REMOVED: <ToolSEO /> */}

      <Head>
        <title>Free Tree Risk Diagnostic Tool | Omaha Tree Care</title>

        <meta
          name="description"
          content="Free tree risk diagnostic for Omaha-area homeowners. Answer a few questions and get an instant risk assessment plus next-step recommendations."
        />

        <link rel="canonical" href="https://omahatreecare.com/tools" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Tree Risk Diagnostic Tool | Omaha Tree Care" />
        <meta
          property="og:description"
          content="Answer a few questions and get an instant tree-risk assessment plus next-step recommendations."
        />
        <meta property="og:url" content="https://omahatreecare.com/tools" />
        <meta property="og:image" content="https://omahatreecare.com/og-image.jpg" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Tree Risk Diagnostic Tool",
            url: "https://omahatreecare.com/tools",
            description:
              "Free tree risk diagnostic for Omaha-area homeowners. Instant risk assessment plus recommendations."
          })}
        </script>
      </Head>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 min-h-[600px] flex flex-col">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-8 md:p-12 flex-grow flex flex-col justify-center">
          {!result ? (
            <DiagnosticStep
              step={steps[stepIndex]}
              onAnswer={handleAnswer}
              onBack={() => setStepIndex(stepIndex - 1)}
              totalSteps={steps.length}
              currentStepIndex={stepIndex}
            />
          ) : (
            <DiagnosticResult result={result} onReset={reset} />
          )}
        </div>
      </div>

      <div className="mt-8 text-center text-slate-400 text-sm">
        <p className="flex items-center justify-center gap-2">
          <ShieldAlert size={16} />
          Disclaimer: This automated tool is for educational purposes only.
        </p>
        <p>It does not replace a physical inspection by a certified arborist.</p>
      </div>
    </div>
  );
}
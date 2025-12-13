import { AlertTriangle, Calculator, Info, Ruler, ShieldAlert, TreeDeciduous, Truck } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const services = {
  "tree-removal": {
    title: "Tree Removal",
    basePrice: 400,
    pricePerFt: 15,
    riskFactor: 1.5,
    description: "Complete removal of hazardous or unwanted trees. Includes chipping and cleanup.",
    factors: [
      { name: "Height (ft)", min: 10, max: 100, step: 5, default: 30, icon: Ruler },
      { name: "Accessibility", options: ["Easy (Front Yard)", "Medium (Back Yard)", "Hard (Limited Access)"], multiplier: [1, 1.2, 1.5], icon: Truck },
      { name: "Risk Level", options: ["Low (Open Area)", "Medium (Near Structures)", "High (Over House/Powerlines)"], multiplier: [1, 1.3, 2.0], icon: ShieldAlert }
    ]
  },
  "tree-trimming": {
    title: "Tree Trimming",
    basePrice: 200,
    pricePerFt: 8,
    riskFactor: 1.2,
    description: "Structural pruning to improve health, safety, and aesthetics.",
    factors: [
      { name: "Tree Size", options: ["Small (<15ft)", "Medium (15-40ft)", "Large (>40ft)"], multiplier: [1, 1.5, 2.5], icon: TreeDeciduous },
      { name: "Density", options: ["Light (Maintenance)", "Medium (Overgrown)", "Heavy (Neglected)"], multiplier: [1, 1.3, 1.8], icon: TreeDeciduous }
    ]
  },
  "stump-grinding": {
    title: "Stump Grinding",
    basePrice: 100,
    pricePerInch: 4,
    description: "Grinding stumps 6-8 inches below grade.",
    factors: [
      { name: "Diameter (inches)", min: 10, max: 60, step: 2, default: 20, icon: Ruler },
      { name: "Root Chasing", options: ["No", "Yes"], multiplier: [1, 1.5], icon: TreeDeciduous }
    ]
  },
  // --- FIXED KEY NAME (Was "emergency-service") ---
  "emergency-tree-service": {
    title: "Emergency Service",
    basePrice: 800,
    pricePerFt: 25,
    riskFactor: 2.0,
    description: "24/7 Response for storm-damaged or dangerous trees.",
    factors: [
      { name: "Urgency", options: ["Next Day", "Same Day", "Immediate/Night"], multiplier: [1, 1.5, 2.0], icon: AlertTriangle },
      { name: "Structure Impact", options: ["No", "Leaning", "On Structure"], multiplier: [1, 1.2, 1.5], icon: ShieldAlert }
    ]
  }
};

const CostEstimator = () => {
  const [activeService, setActiveService] = useState('tree-removal');
  const [params, setParams] = useState({});
  const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });

  // Initialize params when service changes
  useEffect(() => {
    // Safety check: if activeService doesn't exist (e.g. mismatch), fallback to tree-removal
    const currentService = services[activeService] || services['tree-removal'];

    const defaultParams = {};
    currentService.factors.forEach(factor => {
      if (factor.options) {
        defaultParams[factor.name] = 0;
      } else {
        defaultParams[factor.name] = factor.default;
      }
    });
    setParams(defaultParams);
  }, [activeService]);

  // Calculate cost whenever params change
  useEffect(() => {
    calculateCost();
  }, [params, activeService]);

  const calculateCost = () => {
    const service = services[activeService] || services['tree-removal'];
    let base = service.basePrice;
    let multiplier = 1;

    service.factors.forEach(factor => {
      const value = params[factor.name];
      // Guard against undefined params during switching
      if (value === undefined) return;

      if (factor.options) {
        multiplier *= factor.multiplier[value];
      } else {
        if (activeService === 'tree-removal' && factor.name === 'Height (ft)') {
          base += (value * service.pricePerFt);
        }
        if (activeService === 'stump-grinding' && factor.name === 'Diameter (inches)') {
          base += (value * service.pricePerInch);
        }
      }
    });

    const total = base * multiplier;
    setEstimatedCost({
      min: Math.round(total * 0.85),
      max: Math.round(total * 1.15)
    });
  };

  const handleParamChange = (name, value) => {
    setParams(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
        <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
          <Calculator size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tree Service Estimator</h2>
          <p className="text-slate-500">Get a ballpark range for your project</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-3">
          <h3 className="font-semibold text-slate-900 mb-4">Select Service</h3>
          {Object.entries(services).map(([key, service]) => (
            <button
              key={key}
              onClick={() => setActiveService(key)}
              className={`w-full text-left p-4 rounded-xl transition-all border ${
                activeService === key
                  ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                  : 'bg-slate-50 border-transparent hover:bg-slate-100'
              }`}
            >
              <div className="font-semibold text-slate-900">{service.title}</div>
              <div className="text-xs text-slate-500 mt-1 line-clamp-1">{service.description}</div>
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="grid gap-6">
            {(services[activeService] || services['tree-removal']).factors.map((factor) => (
              <div key={factor.name} className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <factor.icon size={18} className="text-slate-400" />
                  <label className="font-medium text-slate-700">{factor.name}</label>
                </div>

                {factor.options ? (
                  <div className="flex flex-wrap gap-2">
                    {factor.options.map((option, idx) => (
                      <button
                        key={option}
                        onClick={() => handleParamChange(factor.name, idx)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          params[factor.name] === idx
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-white text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>{factor.min}</span>
                      <span className="font-bold text-emerald-600">{params[factor.name]}</span>
                      <span>{factor.max}</span>
                    </div>
                    <input
                      type="range"
                      min={factor.min}
                      max={factor.max}
                      step={factor.step || 1}
                      value={params[factor.name] || factor.default}
                      onChange={(e) => handleParamChange(factor.name, e.target.value)}
                      className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex justify-between items-end">
              <div>
                <div className="text-slate-400 text-sm mb-1">Estimated Range</div>
                <div className="text-4xl font-bold text-white">
                  ${estimatedCost.min} - ${estimatedCost.max}
                </div>
                <div className="flex items-center gap-2 mt-4 text-emerald-400 text-sm">
                  <Info size={16} />
                  <span>Based on standard Omaha rates</span>
                </div>
              </div>
              <a
                href="/contact"
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-900/50"
              >
                Get Exact Quote
              </a>
            </div>
            <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          </div>

          <p className="text-xs text-slate-400 text-center">
            *This is a ballpark estimate for planning purposes only. Final price depends on specific site conditions, access, and tree health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;
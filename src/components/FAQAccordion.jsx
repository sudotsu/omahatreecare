import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';

// Now accepts "localData" to inject real, neighborhood-specific context
export default function FAQAccordion({ locationName = "Omaha", localData = null }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 1. Define Defaults (So it never crashes, even on the homepage)
  const defaultData = {
    dominant_trees: "native hardwood trees",
    common_issues: "storm damage and deadwood",
    local_risk: "high winds and ice accumulation",
  };

  // 2. Merge Defaults with Local Data
  // This means if 'data' is passed, we use it. If not, we use defaults.
  const context = { ...defaultData, ...localData };

  const faqs = [
    {
      id: "local-risk",
      question: `What are the biggest tree risks in ${locationName}?`,
      // DYNAMIC: Uses 'local_risk' and 'dominant_trees' from your JSON data
      answer: `In ${locationName}, the primary concern is ${context.local_risk}. Since the area has many ${context.dominant_trees}, we frequently see issues with ${context.common_issues}. Our diagnostic tool is calibrated to catch these specific structural defects.`
    },
    {
      id: "local-species",
      question: `Do you experience handling the ${context.dominant_trees} in ${locationName}?`,
      // DYNAMIC: Specifically references the tree types in that neighborhood
      answer: `Yes. ${locationName} is known for its ${context.dominant_trees}. These species require specific pruning cycles to prevent failure. We customize our approach based on the specific structure of these local trees.`
    },
    {
      id: "faq-cost",
      question: `How much does tree removal cost in ${locationName}?`,
      answer: `Removal costs in ${locationName} depend heavily on access. For standard removals, prices range from $500-$3,500. However, for trees with difficult access (common in established neighborhoods with fences), we may need to use specialized rigging which affects the price.`
    },
    {
      id: "faq-timing",
      question: "When is the best time to prune my trees?",
      answer: `For the ${context.dominant_trees} found in ${locationName}, winter (dormant season) is usually best. This prevents the spread of diseases and allows us to see the structural defects clearly without leaves blocking the view.`
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Tree Care in {locationName}
          </h2>
          <p className="text-slate-600">Specific answers for {locationName} homeowners.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-500/50 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`answer-${faq.id}`}
                >
                  <span className="font-semibold text-slate-800 pr-8">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                <div
                  id={`answer-${faq.id}`}
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
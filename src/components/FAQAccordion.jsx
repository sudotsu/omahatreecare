import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';

// EXACT MATCH with index.html Schema
const faqs = [
  {
    id: "faq-dangerous",
    question: "How do I know if my tree is dangerous?",
    answer: "Use our free tree diagnostic tool to assess risk factors including: visible decay or cavities, dead branches larger than 2 inches, trunk cracks, leaning more than 15 degrees, fungal growth at the base, or proximity to structures within falling distance. The tool provides an instant risk assessment based on ISA arborist standards."
  },
  {
    id: "faq-cost",
    question: "How much does tree removal cost in Omaha?",
    answer: "In Omaha, tree removal costs typically range from $500-$1,500 for small trees (under 30ft), $1,500-$3,500 for medium trees (30-60ft), and $3,500-$7,000+ for large trees (over 60ft). Hazardous trees near structures or requiring crane access cost more. Use our diagnostic tool for a personalized estimate based on your tree's specific conditions."
  },
  {
    id: "faq-eab",
    question: "What is Emerald Ash Borer (EAB) and should I treat my ash tree in Omaha?",
    answer: "Emerald Ash Borer is an invasive insect that has killed millions of ash trees across Nebraska, including Omaha. If your ash tree is healthy and valuable (large, well-positioned), treatment costs $150-$400 every 2-3 years and is 95% effective. If the tree shows more than 30% canopy decline, removal is more cost-effective than treatment. Our diagnostic tool helps you decide."
  },
  {
    id: "faq-timing",
    question: "When is the best time to remove a tree in Omaha?",
    answer: "In Omaha, late fall through early spring (November-March) is ideal for tree removal when trees are dormant, ground is often frozen for equipment access, and there's less landscape damage. However, hazardous trees should be removed immediately regardless of season. Prices may be lower in winter due to reduced demand."
  },
  {
    id: "faq-diy",
    question: "Can I remove a tree myself or do I need a professional?",
    answer: "Only attempt DIY removal for small trees (under 15ft) with no nearby structures, power lines, or other obstacles. Hire a professional for: trees over 15ft tall, trees near buildings or power lines, trees leaning toward structures, dead or diseased trees (unpredictable falls), or if you lack proper equipment and insurance. Most homeowner injuries occur during DIY tree work."
  },
  {
    id: "faq-tool",
    question: "How accurate is the free tree diagnostic tool?",
    answer: "The diagnostic tool is based on ISA (International Society of Arboriculture) arborist standards and considers Omaha-specific factors like EAB prevalence, soil conditions, and climate. It provides reliable risk assessment and cost estimates for 80-90% of common scenarios. For complex situations, the tool recommends a professional on-site inspection."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Common Tree Care Questions</h2>
          <p className="text-slate-600">Straight answers about safety, pricing, and timing in Omaha.</p>
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
                  id={`question-${faq.id}`}
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
                  role="region"
                  aria-labelledby={`question-${faq.id}`}
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
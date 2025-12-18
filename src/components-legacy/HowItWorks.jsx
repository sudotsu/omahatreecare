import { FileQuestion, BarChart3, Lightbulb } from 'lucide-react';
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: FileQuestion,
      title: "Describe Your Tree",
      description: "Answer questions about species, health, and location"
    },
    {
      icon: BarChart3,
      title: "Get Risk Level",
      description: "Instant assessment: low, high, or extreme risk"
    },
    {
      icon: Lightbulb,
      title: "Know Your Options",
      description: "Clear next steps and realistic cost ranges"
    }
  ];

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: '#f8f6f1' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#3d3027' }}>
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#52796f', color: '#ffffff' }}>
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                    <div className="mb-4">
                      <Icon size={32} style={{ color: '#52796f' }} aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#3d3027' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b5d54' }}>
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow between steps (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 -right-4 text-2xl" style={{ color: '#c4bbb0' }}>
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

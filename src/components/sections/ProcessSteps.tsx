/**
 * ProcessSteps Section
 *
 * Step-by-step process visualization with numbered steps.
 * Perfect for "How It Works" sections.
 */

import React from "react";
import { Container, Section } from "../primitives";

export interface ProcessStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ProcessStepsProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Array of process steps */
  steps: ProcessStep[];
  /** Background color */
  background?: "white" | "cream" | "neutral";
  /** Layout direction */
  layout?: "vertical" | "horizontal";
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
  title,
  description,
  steps,
  background = "white",
  layout = "horizontal",
}) => {
  const bgClasses = {
    white: "bg-neutral-50",
    cream: "bg-cream-100",
    neutral: "bg-neutral-100",
  }[background];

  return (
    <Section spacing="lg" className={bgClasses}>
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{title}</h2>
          {description && <p className="text-lg text-neutral-600 leading-relaxed">{description}</p>}
        </div>

        {/* Steps */}
        {layout === "horizontal" ? (
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connector Line (desktop only, between steps) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-primary-200 z-0" />
                )}

                {/* Step Number Circle */}
                <div className="relative z-10 mb-4 flex justify-center">
                  <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                    {step.icon || (
                      <span className="text-4xl font-bold text-neutral-50">{index + 1}</span>
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Step Number */}
                <div className="flex-shrink-0 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-md">
                  {step.icon || (
                    <span className="text-xl font-bold text-neutral-50">{index + 1}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
};

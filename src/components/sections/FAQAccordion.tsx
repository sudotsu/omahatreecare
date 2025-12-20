/**
 * FAQAccordion Section
 *
 * Accordion component for FAQ content.
 * Uses existing Accordion primitive from design system.
 */

import React from 'react'
import { Container, Section } from '../primitives'
import { Accordion, AccordionItem } from '../primitives/Accordion'

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQAccordionProps {
  /** Section title */
  title?: string
  /** Section description */
  description?: string
  /** Array of FAQ items */
  faqs: FAQItem[]
  /** Background color */
  background?: 'white' | 'cream' | 'neutral'
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  title = 'Frequently Asked Questions',
  description,
  faqs,
  background = 'cream',
}) => {
  const bgClasses = {
    white: 'bg-neutral-50',
    cream: 'bg-cream-100',
    neutral: 'bg-neutral-100',
  }[background]

  return (
    <Section spacing="lg" className={bgClasses}>
      <Container size="lg">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-neutral-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} title={faq.question}>
                <p className="text-neutral-700 leading-relaxed">{faq.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  )
}

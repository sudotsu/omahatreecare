/**
 * ThreeUpCards Section
 *
 * Grid of 3 cards (1-col mobile, 3-col desktop).
 * Perfect for features, services, benefits.
 */

import React from "react";
import { Card, Container, Section } from "../primitives";

export interface CardItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: {
    href: string;
    label: string;
  };
}

export interface ThreeUpCardsProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Array of card data */
  cards: CardItem[];
  /** Background color */
  background?: "white" | "cream" | "neutral";
  /** Card variant */
  cardVariant?: "standard" | "feature";
}

export const ThreeUpCards: React.FC<ThreeUpCardsProps> = ({
  title,
  description,
  cards,
  background = "white",
  cardVariant = "feature",
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
        {title && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{title}</h2>
            {description && (
              <p className="text-lg text-neutral-600 leading-relaxed">{description}</p>
            )}
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <Card key={index} variant={cardVariant} hover>
              {card.icon && <div className="mb-4 text-primary-500">{card.icon}</div>}
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{card.title}</h3>
              <p className="text-neutral-600 leading-relaxed mb-4">{card.description}</p>
              {card.link && (
                <a
                  href={card.link.href}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  {card.link.label}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};

/**
 * CTASection Component
 *
 * Call-to-action section with centered content.
 * Supports primary, secondary, and emergency CTA variants.
 */

import React from 'react'
import { Container, Section, Button } from '../primitives'
import { CONTACT } from '../../constants'

export interface CTASectionProps {
  /** CTA heading */
  title: string
  /** CTA description */
  description?: string
  /** Primary CTA */
  primaryCTA?: {
    label: string
    href?: string
    onClick?: () => void
  }
  /** Secondary CTA */
  secondaryCTA?: {
    label: string
    href?: string
    onClick?: () => void
  }
  /** CTA variant (determines styling) */
  variant?: 'primary' | 'emergency' | 'subtle'
  /** Additional note/disclaimer text */
  note?: string
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'primary',
  note,
}) => {
  const styleClasses = {
    primary: {
      container: 'bg-gradient-to-br from-primary-600 to-primary-700',
      title: 'text-neutral-50',
      description: 'text-primary-100',
      note: 'text-primary-200',
    },
    emergency: {
      container: 'bg-gradient-to-br from-alert-500 to-alert-600',
      title: 'text-neutral-50',
      description: 'text-alert-orange-100',
      note: 'text-alert-orange-200',
    },
    subtle: {
      container: 'bg-cream-100 border-2 border-cream-300',
      title: 'text-neutral-900',
      description: 'text-neutral-600',
      note: 'text-neutral-500',
    },
  }[variant]

  const buttonVariant = variant === 'emergency' ? 'emergency' : 'primary'
  const secondaryVariant = variant === 'subtle' ? 'primary' : 'secondary'

  return (
    <Section spacing="lg" className="bg-neutral-50">
      <Container size="lg">
        <div className={`${styleClasses.container} rounded-xl shadow-xl p-8 md:p-12 text-center`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${styleClasses.title}`}>
            {title}
          </h2>

          {description && (
            <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${styleClasses.description}`}>
              {description}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryCTA && (
              primaryCTA.href ? (
                <a
                  href={primaryCTA.href}
                  className={`inline-block py-4 px-8 rounded-md font-semibold uppercase tracking-wide text-base transition-all ${
                    variant === 'subtle'
                      ? 'bg-primary-500 hover:bg-primary-600 text-neutral-50'
                      : 'bg-neutral-50 text-primary-700 hover:bg-neutral-100'
                  }`}
                >
                  {primaryCTA.label}
                </a>
              ) : (
                <button
                  onClick={primaryCTA.onClick}
                  className={`py-4 px-8 rounded-md font-semibold uppercase tracking-wide text-base transition-all ${
                    variant === 'subtle'
                      ? 'bg-primary-500 hover:bg-primary-600 text-neutral-50'
                      : 'bg-neutral-50 text-primary-700 hover:bg-neutral-100'
                  }`}
                >
                  {primaryCTA.label}
                </button>
              )
            )}

            {secondaryCTA && (
              secondaryCTA.href ? (
                <a
                  href={secondaryCTA.href}
                  className={`inline-block py-4 px-8 rounded-md font-semibold uppercase tracking-wide text-base border-2 transition-all ${
                    variant === 'subtle'
                      ? 'border-neutral-400 text-neutral-700 hover:border-neutral-600'
                      : 'border-neutral-50 text-neutral-50 hover:bg-neutral-50/10'
                  }`}
                >
                  {secondaryCTA.label}
                </a>
              ) : (
                <button
                  onClick={secondaryCTA.onClick}
                  className={`py-4 px-8 rounded-md font-semibold uppercase tracking-wide text-base border-2 transition-all ${
                    variant === 'subtle'
                      ? 'border-neutral-400 text-neutral-700 hover:border-neutral-600'
                      : 'border-neutral-50 text-neutral-50 hover:bg-neutral-50/10'
                  }`}
                >
                  {secondaryCTA.label}
                </button>
              )
            )}
          </div>

          {note && (
            <p className={`mt-6 text-sm ${styleClasses.note}`}>
              {note}
            </p>
          )}
        </div>
      </Container>
    </Section>
  )
}

/**
 * QuickPhoneCTA
 *
 * Pre-configured CTA section for phone calls (most common use case).
 */
export const QuickPhoneCTA: React.FC<{
  title?: string
  description?: string
  variant?: 'primary' | 'emergency'
}> = ({
  title = 'Need Expert Tree Care?',
  description = 'Call today for a free consultation and quote',
  variant = 'primary',
}) => {
  return (
    <CTASection
      title={title}
      description={description}
      variant={variant}
      primaryCTA={{
        label: CONTACT.phone,
        href: `tel:${CONTACT.phoneRaw}`,
      }}
      note={variant === 'emergency' ? '24/7 Emergency Service Available' : 'Available daily 7am - 9pm'}
    />
  )
}

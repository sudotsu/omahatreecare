/**
 * TextWithImage Section
 *
 * Two-column layout with text on one side and image on the other.
 * Responsive: stacks on mobile, side-by-side on desktop.
 */

import React from 'react'
import Image from 'next/image'
import { Container, Section } from '../primitives'

export interface TextWithImageProps {
  /** Section heading */
  title: string
  /** Body content */
  content: React.ReactNode
  /** Image source */
  imageSrc?: string
  /** Image alt text */
  imageAlt?: string
  /** Image position (left or right) */
  imagePosition?: 'left' | 'right'
  /** Background color */
  background?: 'white' | 'cream' | 'neutral'
  /** Optional eyebrow text */
  eyebrow?: string
}

export const TextWithImage: React.FC<TextWithImageProps> = ({
  title,
  content,
  imageSrc,
  imageAlt = '',
  imagePosition = 'right',
  background = 'white',
  eyebrow,
}) => {
  const bgClasses = {
    white: 'bg-neutral-50',
    cream: 'bg-cream-100',
    neutral: 'bg-neutral-100',
  }[background]

  return (
    <Section spacing="lg" className={bgClasses}>
      <Container size="xl">
        <div
          className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
            imagePosition === 'left' ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* Text Column */}
          <div className={imagePosition === 'left' ? 'md:order-2' : ''}>
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 mb-3">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {title}
            </h2>
            <div className="text-lg text-neutral-600 leading-relaxed space-y-4">
              {content}
            </div>
          </div>

          {/* Image Column */}
          <div className={imagePosition === 'left' ? 'md:order-1' : ''}>
            {imageSrc ? (
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-neutral-200 flex items-center justify-center">
                <p className="text-neutral-400 font-medium">
                  [TODO: Add image - {imageAlt || 'Image placeholder'}]
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

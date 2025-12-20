/**
 * IconBulletList Section
 *
 * Vertical list of items with icons (checkmarks, numbers, custom).
 * Perfect for benefits, features, process steps.
 */

import React from 'react'
import { Container, Section } from '../primitives'
import { Check } from 'lucide-react'

export interface ListItem {
  title: string
  description: string
  icon?: React.ReactNode
}

export interface IconBulletListProps {
  /** Section title */
  title: string
  /** Section description */
  description?: string
  /** Array of list items */
  items: ListItem[]
  /** Background color */
  background?: 'white' | 'cream' | 'neutral' | 'dark'
  /** Icon variant */
  iconVariant?: 'check' | 'number' | 'custom'
}

export const IconBulletList: React.FC<IconBulletListProps> = ({
  title,
  description,
  items,
  background = 'white',
  iconVariant = 'check',
}) => {
  const bgClasses = {
    white: 'bg-neutral-50',
    cream: 'bg-cream-100',
    neutral: 'bg-neutral-100',
    dark: 'bg-neutral-900',
  }[background]

  const isDark = background === 'dark'

  const titleClasses = isDark ? 'text-neutral-50' : 'text-neutral-900'
  const descClasses = isDark ? 'text-neutral-300' : 'text-neutral-600'
  const itemTitleClasses = isDark ? 'text-neutral-50' : 'text-neutral-900'
  const itemDescClasses = isDark ? 'text-neutral-400' : 'text-neutral-600'

  return (
    <Section spacing="lg" className={bgClasses}>
      <Container size="lg">
        {/* Section Header */}
        <div className="mb-8 max-w-3xl">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClasses}`}>
            {title}
          </h2>
          {description && (
            <p className={`text-lg leading-relaxed ${descClasses}`}>
              {description}
            </p>
          )}
        </div>

        {/* List Items */}
        <div className="space-y-6">
          {items.map((item, index) => {
            // Determine icon
            let iconElement: React.ReactNode
            if (item.icon) {
              iconElement = item.icon
            } else if (iconVariant === 'number') {
              iconElement = (
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-neutral-50 font-bold flex-shrink-0">
                  {index + 1}
                </div>
              )
            } else {
              iconElement = (
                <div className="flex-shrink-0 mt-1">
                  <Check className="w-6 h-6 text-primary-500" strokeWidth={2.5} />
                </div>
              )
            }

            return (
              <div key={index} className="flex items-start gap-4">
                {iconElement}
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-2 ${itemTitleClasses}`}>
                    {item.title}
                  </h3>
                  <p className={`leading-relaxed ${itemDescClasses}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

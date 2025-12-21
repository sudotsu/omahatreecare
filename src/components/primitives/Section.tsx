import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'warm' | 'dark' | 'gradient';
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Section primitive component
 *
 * Provides consistent vertical rhythm and background alternation.
 *
 * Spacing:
 * - sm: py-8 md:py-12 (tight sections)
 * - md: py-12 md:py-16 (moderate)
 * - lg: py-16 md:py-24 (default - most sections)
 * - xl: py-24 md:py-32 (hero/feature sections)
 *
 * Variants:
 * - default: bg-surface-primary (white) - Most sections
 * - warm: bg-surface-warm (#F5F5F0) - Alternates with default for rhythm
 * - dark: bg-surface-dark (slate) - Hero sections, dark mode blocks
 * - gradient: bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 - CTA sections
 *
 * Usage pattern:
 * Alternate default ↔ warm for visual rhythm (avoid stacking same variant)
 */
export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'lg',
  variant = 'default',
  className = '',
  as: Component = 'section',
  ...props
}) => {
  const spacingStyles = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-24 md:py-32',
  };

  const variantStyles = {
    default: 'bg-surface-primary',  // White
    warm: 'bg-surface-warm',        // Cream/warm off-white
    dark: 'bg-surface-dark text-content-inverse', // Dark slate with light text
    gradient: 'bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500', // Brand gradient for CTAs
  };

  return React.createElement(
    Component,
    {
      className: `${spacingStyles[spacing]} ${variantStyles[variant]} ${className}`,
      ...props,
    },
    children
  );
};

export default Section;

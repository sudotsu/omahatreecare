import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'feature';
  hover?: boolean;
}

/**
 * Card primitive component
 *
 * Provides consistent depth, shadows, and hover states across the site.
 *
 * Variants:
 * - standard: Basic card with subtle shadow (most common)
 * - feature: Elevated card with more padding (hero cards, service highlights)
 *
 * Hover: Adds lift effect (-translate-y-1) + shadow increase
 *
 * Dark mode: Automatically adapts with dark:bg-slate-800 dark:border-slate-700
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'standard',
  className = '',
  hover = false,
  ...props
}) => {
  // Use semantic surface color + dark mode support
  const baseStyles = 'bg-surface-primary dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 transition-all duration-250 ease-smooth';

  const variantStyles = {
    standard: 'rounded-lg p-6 shadow-sm',
    feature: 'rounded-xl p-8 shadow-md',
  };

  // Enhanced hover with translate for depth perception
  const hoverStyles = hover
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

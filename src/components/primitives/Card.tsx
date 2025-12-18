import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'feature';
  hover?: boolean;
}

/**
 * Card primitive component
 * Variants: standard, feature
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'standard',
  className = '',
  hover = false,
  ...props
}) => {
  const baseStyles = 'bg-white border border-neutral-200 transition-all duration-250 ease-smooth';

  const variantStyles = {
    standard: 'rounded-lg p-6 shadow-sm',
    feature: 'rounded-xl p-8 shadow-md',
  };

  const hoverStyles = hover
    ? 'hover:shadow-lg hover:scale-[1.01] cursor-pointer'
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

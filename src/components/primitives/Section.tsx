import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Section primitive component
 * Spacing: sm, md, lg, xl
 */
export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'lg',
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

  return React.createElement(
    Component,
    {
      className: `${spacingStyles[spacing]} ${className}`,
      ...props,
    },
    children
  );
};

export default Section;

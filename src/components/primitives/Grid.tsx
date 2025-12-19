import React from 'react';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end';
}

/**
 * Grid Primitive
 * Essential for "Before & After" galleries and Team sections
 */
export const Grid: React.FC<GridProps> = ({
  children,
  cols = 1,
  gap = 'lg',
  align = 'start',
  className = '',
  ...props
}) => {
  // Mobile-first responsive mapping
  // 1 col on mobile is standard for "Tunnel Vision" UX
  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const alignStyles = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };

  return (
    <div
      className={`grid ${colStyles[cols]} ${gapStyles[gap]} ${alignStyles[align]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;

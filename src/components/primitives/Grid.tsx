import React from 'react';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
  mdCols?: 1 | 2 | 3 | 4;
  lgCols?: 1 | 2 | 3 | 4;
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
  mdCols,
  lgCols,
  gap = 'lg',
  align = 'start',
  className = '',
  ...props
}) => {
  // Mobile-first responsive mapping
  // 1 col on mobile is standard for "Tunnel Vision" UX
  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const mdColStyles = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  const lgColStyles = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
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

  const finalClassName = [
    'grid',
    colStyles[cols],
    mdCols ? mdColStyles[mdCols] : '',
    lgCols ? lgColStyles[lgCols] : '',
    gapStyles[gap],
    alignStyles[align],
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={finalClassName}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;

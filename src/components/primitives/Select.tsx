import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

/**
 * Select primitive component
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  error = false,
  children,
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'w-full py-3 px-4 text-base leading-normal rounded-md transition-all duration-default ease-smooth focus:outline-none focus:ring-2 appearance-none bg-white';

  const stateStyles = error
    ? 'border-2 border-alert-500 text-alert-600 focus:ring-alert-500'
    : 'border border-neutral-200 text-neutral-900 focus:border-primary-500 focus:ring-primary-500';

  return (
    <div className="relative">
      <select
        ref={ref}
        className={`${baseStyles} ${stateStyles} ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-600">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;

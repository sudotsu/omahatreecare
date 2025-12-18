import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * Input primitive component
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  error = false,
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'w-full py-3 px-4 text-base leading-normal rounded-md transition-all duration-default ease-smooth focus:outline-none focus:ring-2';

  const stateStyles = error
    ? 'border-2 border-alert-500 text-alert-600 focus:ring-alert-500'
    : 'border border-neutral-200 text-neutral-900 focus:border-primary-500 focus:ring-primary-500';

  const placeholderStyles = 'placeholder:text-neutral-400';

  return (
    <input
      ref={ref}
      type={type}
      className={`${baseStyles} ${stateStyles} ${placeholderStyles} ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;

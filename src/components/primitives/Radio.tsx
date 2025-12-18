import React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: boolean;
}

/**
 * Radio primitive component
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({
  label,
  error = false,
  className = '',
  ...props
}, ref) => {
  const radioStyles = 'w-5 h-5 border-neutral-200 text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-fast ease-smooth cursor-pointer';

  const errorStyles = error ? 'border-alert-500' : '';

  return (
    <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
      <input
        ref={ref}
        type="radio"
        className={`${radioStyles} ${errorStyles}`}
        {...props}
      />
      {label && (
        <span className="text-base text-neutral-900 select-none">
          {label}
        </span>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';

export default Radio;

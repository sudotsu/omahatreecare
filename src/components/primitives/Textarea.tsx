import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

/**
 * Textarea primitive component
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  error = false,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'w-full py-3 px-4 text-base leading-normal rounded-md transition-all duration-default ease-smooth focus:outline-none focus:ring-2 resize-y';

  const stateStyles = error
    ? 'border-2 border-alert-500 text-alert-600 focus:ring-alert-500'
    : 'border border-neutral-200 text-neutral-900 focus:border-primary-500 focus:ring-primary-500';

  const placeholderStyles = 'placeholder:text-neutral-400';

  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`${baseStyles} ${stateStyles} ${placeholderStyles} ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;

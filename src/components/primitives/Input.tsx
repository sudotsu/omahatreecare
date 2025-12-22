import React from "react";

/**
 * Props for the Input component.
 * Extends standard HTML input attributes to ensure full compatibility with native forms.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * If true, the input will display an error state (red border).
   * @default false
   */
  error?: boolean;
}

/**
 * A versatile, accessible Input primitive component.
 *
 * Designed to work as a controlled or uncontrolled component within the design system.
 * It automatically handles styling for focus states, error states, and transitions.
 *
 * @component
 * @example
 * ```tsx
 * <Input placeholder="Enter your email" error={formError} {...register('email')} />
 * ```
 *
 * @param {InputProps} props - The props for the input component.
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref for the underlying input element.
 * @returns {JSX.Element} The rendered input component.
 */
<<<<<<< Updated upstream
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  error = false,
  className = '',
  ...props
}, ref) => {
  /** Base layout and transition styles */
  const baseStyles = 'w-full py-3 px-4 text-base leading-normal rounded-md transition-all duration-default ease-smooth focus:outline-none focus:ring-2';

  /** Visual styles based on the presence of an error */
  const stateStyles = error
    ? 'border-2 border-alert-500 text-alert-600 focus:ring-alert-500'
    : 'border border-neutral-200 text-neutral-900 focus:border-primary-500 focus:ring-primary-500';

  /** Consistency styles for placeholder text */
  const placeholderStyles = 'placeholder:text-neutral-400';
=======
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", error = false, className = "", ...props }, ref) => {
    const baseStyles =
      "w-full py-3 px-4 text-base leading-normal rounded-md transition-all duration-default ease-smooth focus:outline-none focus:ring-2";

    const stateStyles = error
      ? "border-2 border-alert-500 text-alert-600 focus:ring-alert-500"
      : "border border-neutral-200 text-neutral-900 focus:border-primary-500 focus:ring-primary-500";

    const placeholderStyles = "placeholder:text-neutral-400";
>>>>>>> Stashed changes

    return (
      <input
        ref={ref}
        type={type}
        className={`${baseStyles} ${stateStyles} ${placeholderStyles} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;

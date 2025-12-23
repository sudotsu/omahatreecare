import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: boolean;
}

/**
 * Checkbox primitive component
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error = false, className = "", ...props }, ref) => {
    const checkboxStyles =
      "w-5 h-5 rounded border-neutral-200 text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-fast ease-smooth cursor-pointer";

    const errorStyles = error ? "border-alert-500" : "";

    return (
      <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className={`${checkboxStyles} ${errorStyles}`}
          {...props}
        />
        {label && <span className="text-base text-neutral-900 select-none">{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

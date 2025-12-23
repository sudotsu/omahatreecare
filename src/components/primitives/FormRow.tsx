import React from "react";

interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string | null;
}

/**
 * FormRow primitive component
 * Wrapper for form fields with label and error support
 */
export const FormRow: React.FC<FormRowProps> = ({
  label,
  htmlFor,
  required = false,
  error = null,
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-neutral-900">
          {label}
          {required && <span className="text-alert-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-alert-600 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormRow;

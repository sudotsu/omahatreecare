import { AlertCircle } from "lucide-react";
import React from "react";

/**
 * FieldError primitive component
 * Displays error messages for form fields
 */
export const FieldError: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => {
  if (!children) return null;

  return (
    <div
      className={`flex items-start gap-2 mt-1 text-sm text-alert-600 ${className}`}
      role="alert"
      {...props}
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
};

export default FieldError;

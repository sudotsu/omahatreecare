import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import React from "react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
}

/**
 * Alert primitive component
 * Variants: info, success, warning, error
 */
export const Alert: React.FC<AlertProps> = ({
  children,
  variant = "info",
  className = "",
  ...props
}) => {
  const baseStyles = "flex items-start gap-3 p-4 rounded-lg border";

  const variantStyles = {
    info: "bg-steel-50 border-steel-600 text-steel-800",
    success: "bg-primary-50 border-primary-600 text-primary-900",
    warning: "bg-alert-400/10 border-alert-400 text-neutral-900",
    error: "bg-alert-500/10 border-alert-600 text-neutral-900",
  };

  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
  };

  const Icon = icons[variant];

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} role="alert" {...props}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Alert;

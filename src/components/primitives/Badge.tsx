import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
<<<<<<< Updated upstream
  variant?: 'primary' | 'steel' | 'neutral' | 'emergency';
=======
  variant?: "primary" | "steel" | "neutral";
>>>>>>> Stashed changes
}

/**
 * Badge/Tag primitive component
 * Variants: primary, steel, neutral, emergency
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center py-1 px-3 text-xs font-medium rounded-full";

  const variantStyles = {
<<<<<<< Updated upstream
    primary: 'bg-primary-50 text-primary-900',
    steel: 'bg-steel-50 text-steel-800',
    neutral: 'bg-neutral-100 text-neutral-800',
    emergency: 'bg-alert-500 text-white',
=======
    primary: "bg-primary-50 text-primary-900",
    steel: "bg-steel-50 text-steel-800",
    neutral: "bg-neutral-100 text-neutral-800",
>>>>>>> Stashed changes
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;

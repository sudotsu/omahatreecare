import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'emergency' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Button primitive component
 * Variants: primary, secondary, emergency, ghost
 * Sizes: sm, md, lg
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'font-semibold uppercase tracking-wide rounded-md transition-all duration-default ease-smooth disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg active:bg-primary-700 active:scale-98',
    secondary: 'bg-steel-600 text-white hover:bg-steel-700 hover:shadow-lg active:scale-98',
    emergency: 'bg-alert-500 text-white hover:bg-alert-600 hover:shadow-lg active:scale-98',
    ghost: 'border-2 border-neutral-200 text-neutral-900 hover:border-primary-500 hover:text-primary-700 active:scale-98',
  };

  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-sm md:text-base',
    lg: 'py-4 px-8 text-base',
  };

  const hoverScale = !disabled ? 'hover:scale-102' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${hoverScale} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

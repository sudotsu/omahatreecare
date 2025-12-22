import React from "react";

/**
 * Divider primitive component
 */
export const Divider: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({
  className = "",
  ...props
}) => {
  return <hr className={`border-0 border-t border-neutral-200 ${className}`} {...props} />;
};

export default Divider;

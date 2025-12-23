import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
}

/**
 * Accordion Primitive
 * Critical for AEO/FAQ Sections
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onClick,
}) => {
  // If no external control is provided, manage internal state
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const isExpanded = onClick ? isOpen : internalOpen;
  const handleToggle = onClick || (() => setInternalOpen(!internalOpen));

  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between py-4 text-left focus:outline-none group"
        aria-expanded={isExpanded}
      >
        <span className="text-lg font-medium text-neutral-900 group-hover:text-primary-500 transition-colors duration-fast">
          {title}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-neutral-500 transition-transform duration-default ease-smooth ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-default ease-smooth ${
          isExpanded ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-base text-neutral-600 leading-relaxed pr-8">{children}</div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`w-full rounded-lg border border-neutral-200 bg-white px-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Accordion;

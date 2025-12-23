import { FileText, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CONTACT } from "../constants";
import { Button } from "./primitives";

/**
 * StickyMobileCTA Component
 * Dual-State UX: Emergency Distress (70% Call) + Routine Research (30% Quote)
 * Persists on scroll for "Tunnel Vision" users
 */
export const StickyMobileCTA: React.FC = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-50 border-t-2 border-neutral-200 shadow-xl safe-area-padding-bottom">
      <div className="grid grid-cols-[2fr_1fr] gap-2 p-3">
        {/* Call Now - Emergency (70% width, high contrast) */}
        <a href={`tel:${CONTACT.phoneRaw}`} className="block">
          <Button
            variant="emergency"
            className="w-full flex items-center justify-center gap-2 text-sm font-bold min-h-[44px]"
            size="md"
          >
            <Phone size={18} />
            Call Now
          </Button>
        </a>

        {/* Get Quote - Secondary (30% width, visually recessed) */}
        <Link href="/tree-consultation-omaha" className="block">
          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-1 text-xs min-h-[44px]"
            size="md"
          >
            <FileText size={16} />
            Quote
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StickyMobileCTA;

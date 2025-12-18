import React from 'react';
import Link from 'next/link';
import { Phone, FileText } from 'lucide-react';
import { Button } from './primitives';
import { CONTACT } from '../constants';

/**
 * StickyMobileCTA Component
 * Sticky bottom bar on mobile with Call Now + Get Estimate
 */
export const StickyMobileCTA: React.FC = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-neutral-200 shadow-xl safe-area-padding-bottom">
      <div className="grid grid-cols-2 gap-2 p-3">
        {/* Call Now - Primary */}
        <a href={`tel:${CONTACT.phoneRaw}`} className="block">
          <Button
            variant="primary"
            className="w-full flex items-center justify-center gap-2 text-sm"
            size="md"
          >
            <Phone size={18} />
            Call Now
          </Button>
        </a>

        {/* Get Estimate - Secondary */}
        <Link href="/tree-consultation-omaha" className="block">
          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2 text-sm"
            size="md"
          >
            <FileText size={18} />
            Get Estimate
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StickyMobileCTA;

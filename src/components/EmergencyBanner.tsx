/**
 * EmergencyBanner Component
 *
 * Sticky alert banner for emergency/storm damage contexts.
 * Uses emergency logo variant (red/orange) per VISUAL-BRANDING-GUIDE.md
 *
 * Usage: Only for emergency pages or storm season promotions.
 * DO NOT use for routine services - dilutes urgency signal.
 */

import { X } from "lucide-react";
import React from "react";
import { CONTACT } from "../constants";
import { Container } from "./primitives";

export interface EmergencyBannerProps {
  /** Main urgent message */
  message: string;
  /** Supporting detail text */
  details?: string;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Custom CTA text (defaults to "Call Emergency: {phone}") */
  ctaText?: string;
  /** Custom CTA phone number (defaults to CONTACT.phone) */
  ctaPhone?: string;
  /** Sticky position */
  sticky?: boolean;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  message,
  details,
  dismissible = false,
  ctaText,
  ctaPhone = CONTACT.phone,
  sticky = true,
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  return (
    <div
      className={`bg-alert-500 border-b-4 border-alert-600 ${sticky ? "sticky top-0 z-50" : ""}`}
      role="alert"
      aria-live="assertive"
    >
      <Container>
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Left: Logo + Message */}
          <div className="flex items-center gap-4 flex-1">
            {/* Emergency Logo (Red/Orange variant) */}
            <div className="flex-shrink-0 hidden sm:block">
              <div className="w-12 h-12 relative">
                {/* TODO: Replace with actual emergency logo file */}
                <div className="w-full h-full rounded-full bg-alert-500 flex items-center justify-center text-neutral-50 font-bold text-lg">
                  !
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1">
              <p className="text-neutral-900 font-bold text-base md:text-lg">{message}</p>
              {details && <p className="text-neutral-800 text-sm mt-0.5">{details}</p>}
            </div>
          </div>

          {/* Right: CTA + Dismiss */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="inline-block py-3 px-6 bg-alert-500 hover:bg-alert-600 text-neutral-50 font-bold rounded-md transition-colors animate-pulse whitespace-nowrap"
            >
              {ctaText || `Call: ${ctaPhone}`}
            </a>

            {dismissible && (
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="p-2 text-neutral-800 hover:text-neutral-900 transition-colors"
                aria-label="Dismiss emergency banner"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

/**
 * StormDamageBanner
 *
 * Pre-configured emergency banner for storm damage contexts.
 */
export const StormDamageBanner: React.FC<{ dismissible?: boolean }> = ({ dismissible = true }) => {
  return (
    <EmergencyBanner
      message="Storm Damage? We're Available 24/7"
      details="Emergency tree removal • Fallen limb cleanup • Power line hazards"
      dismissible={dismissible}
      sticky
    />
  );
};

/**
 * Winter EmergencyBanner
 *
 * Pre-configured for winter season emergency service.
 */
export const WinterEmergencyBanner: React.FC<{ dismissible?: boolean }> = ({
  dismissible = true,
}) => {
  return (
    <EmergencyBanner
      message="Ice Storm Response Team Active"
      details="24/7 emergency service for fallen trees and branches"
      dismissible={dismissible}
      sticky
    />
  );
};

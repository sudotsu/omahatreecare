/**
 * PageHero Component
 *
 * Standardized hero section for all internal pages (non-homepage).
 * Ensures consistent visual hierarchy and branding across the site.
 *
 * Design System Reference: VISUAL-BRANDING-GUIDE.md
 */

import Link from "next/link";
import React from "react";
import { Container } from "./primitives";

export interface Breadcrumb {
  label: string;
  href: string;
}

export interface PageHeroProps {
  /** Eyebrow text (category/context) - appears above H1 */
  eyebrow?: string;
  /** Main heading (H1) */
  title: string;
  /** 1-2 sentence introduction */
  description?: string;
  /** Optional breadcrumb navigation */
  breadcrumbs?: Breadcrumb[];
  /** Background variant */
  variant?: "default" | "cream" | "dark";
  /** Optional badge (e.g., "FREE", "24/7") */
  badge?: {
    text: string;
    variant?: "success" | "emergency" | "info";
  };
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  breadcrumbs,
  variant = "default",
  badge,
}) => {
  // Determine background classes based on variant
  const bgClasses = {
    default: "bg-gradient-to-br from-primary-700 via-primary-600 to-neutral-900",
    cream: "bg-cream-100 border-b border-cream-300",
    dark: "bg-neutral-900",
  }[variant];

  const textClasses = {
    default: "text-neutral-50",
    cream: "text-neutral-900",
    dark: "text-neutral-50",
  }[variant];

  const descriptionClasses = {
    default: "text-primary-100",
    cream: "text-neutral-600",
    dark: "text-neutral-400",
  }[variant];

  const breadcrumbClasses = {
    default: "text-neutral-200 hover:text-neutral-50",
    cream: "text-neutral-600 hover:text-neutral-900",
    dark: "text-neutral-400 hover:text-neutral-50",
  }[variant];

  const breadcrumbCurrentClasses = {
    default: "text-primary-300",
    cream: "text-primary-700",
    dark: "text-primary-400",
  }[variant];

  // Badge styling
  const badgeStyles = badge
    ? {
        success: "bg-primary-500/20 border-primary-400 text-primary-100",
        emergency: "bg-alert-500/20 border-alert-600 text-alert-400",
        info: "bg-steel-700/20 border-steel-600 text-steel-200",
      }[badge.variant || "success"]
    : "";

  return (
    <div className={`${bgClasses} py-12 md:py-16`}>
      <Container size="xl">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 text-sm font-medium" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <Link href={crumb.href} className={`${breadcrumbClasses} transition-colors`}>
                    {crumb.label}
                  </Link>
                  {index < breadcrumbs.length - 1 && (
                    <span className={breadcrumbCurrentClasses} aria-hidden="true">
                      /
                    </span>
                  )}
                </li>
              ))}
              <li className={breadcrumbCurrentClasses} aria-current="page">
                / {eyebrow || "Current Page"}
              </li>
            </ol>
          </nav>
        )}

        {/* Optional Badge */}
        {badge && (
          <div
            className={`inline-block border px-4 py-2 rounded-full text-sm font-semibold mb-4 ${badgeStyles}`}
          >
            {badge.text}
          </div>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <p
            className={`text-sm font-semibold uppercase tracking-wider mb-3 ${textClasses} opacity-80`}
          >
            {eyebrow}
          </p>
        )}

        {/* Title (H1) */}
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 ${textClasses}`}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className={`text-lg md:text-xl max-w-3xl leading-relaxed ${descriptionClasses}`}>
            {description}
          </p>
        )}
      </Container>
    </div>
  );
};

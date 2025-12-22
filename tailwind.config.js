/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // SEMANTIC "HIGH-TRUST TRADE" COLOR SYSTEM
      // Deep forest greens + warm neutrals + safety orange accent
      colors: {
        // BRAND COLORS - Primary identity (from worker-olive-sage.webp logo)
        brand: {
          primary: '#4a6d5a',      // Olive-sage green (main brand from logo)
          secondary: '#6b7c63',    // Sage green (hover/active from logo)
          accent: '#E85D04',       // Safety orange (emergency/CTAs)
        },

        // SURFACE COLORS - Backgrounds and containers (from primary-green-badge.webp)
        surface: {
          primary: '#FFFFFF',      // Pure white
          warm: '#f5efe0',         // Cream background (from primary-green-badge.webp)
          dark: '#0F172A',         // Dark slate (dark mode/hero)
        },

        // CONTENT COLORS - Typography
        content: {
          body: '#334155',         // Slate 700 (body text)
          heading: '#0F172A',      // Slate 900 (headings)
          muted: '#64748B',        // Slate 500 (captions, disabled)
          inverse: '#F1F5F9',      // Light text on dark backgrounds
        },

        // SEMANTIC ALIASES (backwards compatibility with existing components)
        // These map to the brand colors above (from worker-olive-sage.webp logo)
        primary: {
          50: '#f0f4f1',           // Lightest tint
          100: '#e0e9e3',          // Very light
          200: '#c1d3c7',          // Light
          300: '#a2bdab',          //
          400: '#83a78f',          // Muted
          500: '#6b7c63',          // MAIN BRAND (brand.secondary - sage from logo)
          600: '#4a6d5a',          // Darker (brand.primary - olive from logo)
          700: '#3d5a4d',          // Hover/active
          800: '#2f4639',          // Dark mode
          900: '#1a251c',          // Darkest
        },

        // ALERT COLORS - Emergency and warnings
        alert: {
          100: '#fee2e2',          // Light tint for backgrounds
          200: '#fecaca',          // Lighter tint
          300: '#fca5a5',          // Medium tint (between 200 and 400)
          400: '#fb923c',          // Warning
          500: '#E85D04',          // PRIMARY ALERT (brand.accent - safety orange)
          600: '#dc2626',          // Critical red
          700: '#b91c1c',          // Pressed state
        },

        // CREAM - Warm backgrounds (from primary-green-badge.webp logo)
        // TODO: Coordinated refactor required to migrate from 'cream' to 'warm'
        // Components using background="cream" or variant="cream": PageHero, IconBulletList,
        // ThreeUpCards, TextWithImage, ProcessSteps, FAQAccordion, CTASection
        // Pages affected: tree-consultation-omaha.tsx, services/[slug].tsx
        // See MASTER-PLAYBOOK.md and COLOR-SYSTEM.md for migration strategy
        cream: {
          50: '#fdfcfa',           // Lightest
          100: '#f5efe0',          // MAIN (from primary-green-badge.webp - same as surface.warm)
          200: '#f0e9d5',          // Medium
          300: '#e8dfc5',          // Borders
        },

        // NEUTRAL GRAYS - Borders, dividers, backgrounds
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },

        // STEEL GRAYS - Trust/professional secondary
        steel: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },

      // TYPOGRAPHY SYSTEM
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        xs: ['clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)', { lineHeight: '1.6' }],
        sm: ['clamp(0.875rem, 0.8rem + 0.3vw, 1rem)', { lineHeight: '1.6' }],
        base: ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.6' }],
        lg: ['clamp(1.125rem, 1rem + 0.5vw, 1.25rem)', { lineHeight: '1.4' }],
        xl: ['clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)', { lineHeight: '1.4' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 0.8vw, 2rem)', { lineHeight: '1.2' }],
        '3xl': ['clamp(1.875rem, 1.6rem + 1.2vw, 2.5rem)', { lineHeight: '1.2' }],
        '4xl': ['clamp(2.25rem, 1.9rem + 1.5vw, 3rem)', { lineHeight: '1.2' }],
        '5xl': ['clamp(3rem, 2.4rem + 2.5vw, 4rem)', { lineHeight: '1.2' }],
        '6xl': ['clamp(3.75rem, 3rem + 3vw, 5rem)', { lineHeight: '1.2' }],
      },
      lineHeight: {
        tight: '1.2',
        snug: '1.4',
        normal: '1.6',
        relaxed: '1.75',
      },
      letterSpacing: {
        tight: '-0.025em',
        normal: '0',
        wide: '0.05em',
        wider: '0.1em',
      },

      // SPACING SYSTEM (8px base unit)
      spacing: {
        1: '0.25rem',  // 4px
        2: '0.5rem',   // 8px (base)
        3: '0.75rem',  // 12px
        4: '1rem',     // 16px
        6: '1.5rem',   // 24px
        8: '2rem',     // 32px
        12: '3rem',    // 48px
        16: '4rem',    // 64px
        24: '6rem',    // 96px
        32: '8rem',    // 128px
      },

      // CONTAINER SYSTEM
      maxWidth: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      // BORDER RADIUS SYSTEM
      borderRadius: {
        sm: '0.25rem',   // 4px
        md: '0.375rem',  // 6px
        lg: '0.5rem',    // 8px
        xl: '0.75rem',   // 12px
        '2xl': '1rem',   // 16px
        full: '9999px',
      },

      // SHADOW SYSTEM
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },

      // MOTION SYSTEM
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '250ms',
        slow: '350ms',
        slower: '500ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        enter: 'cubic-bezier(0, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
        mechanical: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },

      // SCALE UTILITIES (for hover/active states)
      scale: {
        98: '0.98',
        101: '1.01',
        102: '1.02',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Respect prefers-reduced-motion
    function({ addBase }) {
      addBase({
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
          },
        },
      });
    },
  ],
}

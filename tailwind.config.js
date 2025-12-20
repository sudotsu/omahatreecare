/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // LOGO-DERIVED COLOR SYSTEM (from VISUAL-BRANDING-GUIDE.md)
      colors: {
        // PRIMARY: Forest Green (from Primary Badge Logo)
        primary: {
          50: '#f3f6f4',    // Lightest tint
          100: '#e6ece8',   // Hover states on light
          400: '#6b8873',   // Muted/disabled
          500: '#4a6d5a',   // LOGO GREEN (main brand)
          600: '#3d5a4d',   // Darker logo variation
          700: '#2f4639',   // Hover/active states
          800: '#243629',   // Dark mode primary
          900: '#1a251c',   // Text on light backgrounds
        },

        // ALERT: Emergency Red/Orange (from Emergency Logo)
        alert: {
          // Red (helmet color)
          400: '#ef5350',   // Warning states
          500: '#d32f2f',   // PRIMARY ALERT (helmet red)
          600: '#c62828',   // Active emergency
          700: '#b71c1c',   // Pressed state
          // Orange (background color)
          orange: {
            400: '#ffa726', // Soft warning
            500: '#fb8c00', // EMERGENCY BACKGROUND
            600: '#f57c00', // Hover state
          },
        },

        // CREAM: Warm backgrounds (from logo backgrounds)
        cream: {
          50: '#fdfcfa',    // Lightest page background
          100: '#f5efe0',   // Logo background cream
          200: '#f0e9d5',   // Darker cream
          300: '#e8dfc5',   // Borders, dividers
        },

        // SAGE: Olive/green secondary (from Worker Logos)
        sage: {
          400: '#8c9985',   // Muted olive
          500: '#7a8c71',   // Mid-tone sage
          600: '#6b7c63',   // Darker olive
          700: '#5a6952',   // Deep sage
        },

        // TAN: Brown accents (from hard hats)
        tan: {
          400: '#a1887f',   // Light tan
          500: '#8d6e63',   // Hard hat brown
          600: '#795548',   // Darker brown
        },

        // NEUTRAL: Concrete grays (warm undertones for logo harmony)
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          400: '#a8a29e',
          600: '#57534e',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },

        // STEEL: Blue-grays (trust/secondary - keep existing)
        steel: {
          50: '#f1f5f9',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Warm Greys (from existing config)
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
        },
        slate: {
          800: '#1e293b',
          900: '#0f172a',
        },
        // Brand Colors
        primary: {
          DEFAULT: '#52796f',
          dark: '#2f4b43',
          light: '#84a98c',
        },
        accent: {
          DEFAULT: '#e76f51',
          hover: '#d05c40',
        },
        wood: {
          DEFAULT: '#5c4d43',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Crimson Pro', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

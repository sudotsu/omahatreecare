/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // THE FIX: Distinct Warm Greys
        stone: {
            50: '#fafaf9',
            100: '#f5f5f4', // <--- MAIN BACKGROUND (Visible Grey)
            200: '#e7e5e4', // <--- BORDERS
            300: '#d6d3d1',
        },
        slate: {
            800: '#1e293b',
            900: '#0f172a', // Main Text / Dark Backgrounds
        },
        // Brand Colors
        primary: {
          DEFAULT: '#52796f', // Muted Green (Brand)
          dark: '#2f4b43',
          light: '#84a98c',
        },
        // The "Action" Color (Not Ugly Brown)
        accent: {
            DEFAULT: '#e76f51', // Burnt Sienna (Warm/Urgent)
            hover: '#d05c40',
        },
        // Wood tones for text accents only
        wood: {
            DEFAULT: '#5c4d43',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Crimson Pro', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // Premium soft shadow
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
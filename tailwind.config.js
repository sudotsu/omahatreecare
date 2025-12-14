/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Global "Soft White" (Stone-50). Change this one hex to update the whole site.
        site: '#fafaf9',
      },
    },
  },
  plugins: [],
}
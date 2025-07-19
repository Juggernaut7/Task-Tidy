/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This enables dark mode based on the 'dark' class on the HTML element
  theme: {
    extend: {
      colors: {
         danger: '#ef4444',
        // --- Custom Brand Palette ---
        // A vibrant, trustworthy blue for primary actions, branding, and key elements
        'brand-primary': {
          DEFAULT: '#3B82F6', // A solid default for this blue
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        // A fresh, complementary teal for secondary actions, highlights, or success
        'brand-secondary': {
          DEFAULT: '#14B8A6', // A calming default teal
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        // A warm, inviting amber for accents, warnings, or special emphasis
        'brand-accent': {
          DEFAULT: '#FBBF24', // A bright default amber
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#FBBE24',
          600: '#EAB308',
          700: '#CA8A04',
          800: '#A16207',
          900: '#854D09',
          950: '#451A03',
        },
        // Tailwind's default grays are excellent for text and backgrounds,
        // so we'll continue to use them (e.g., text-gray-900, bg-gray-100, dark:bg-gray-900, dark:text-gray-100)
        // You can still use semantic colors like text-red-500, bg-green-500 directly.
      },
      // You can extend other Tailwind properties here like typography, spacing, etc.
    },
  },
  safelist: [
    'focus:ring-brand-accent-500',
    'focus:ring-brand-secondary-500',
    'focus:ring-danger', // Also ensure danger is explicitly listed if dynamic elsewhere
  ],
  plugins: [],
}
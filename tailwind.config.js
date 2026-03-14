/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#e0f2fe',
          DEFAULT: '#0284c7', // Professional medical blue
          dark: '#0369a1',
        },
        secondary: {
          light: '#f0fdfa',
          DEFAULT: '#0d9488', // Calming medical teal
          dark: '#0f766e',
        },
        accent: '#f59e0b', // Soft amber for subtle highlights
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

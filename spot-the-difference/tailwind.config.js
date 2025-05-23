/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        background: 'var(--background-color)',
        textColor: 'var(--text-color)',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      boxShadow: {
        DEFAULT: 'var(--box-shadow)',
      },
      animation: {
        'pulse-slow': 'pulse 1.5s infinite',
      },
    },
  },
  plugins: [],
}

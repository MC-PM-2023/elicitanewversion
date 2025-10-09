/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // or your actual React source path
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1173d4',
          50: '#f0f7fe',
          100: '#e0eefd',
          200: '#c7e0fa',
          300: '#a6cff8',
          400: '#7fb9f4',
          500: '#589eef',
          600: '#3b82e8',
          700: '#2f6fdc',
          800: '#295ab5',
          900: '#264c91',
          950: '#182f58',
        },
        'background-light': '#f8fafc',
        'background-dark': '#0b1120',
        'foreground-light': '#1f2937',
        'foreground-dark': '#e5e7eb',
        'border-light': '#e5e7eb',
        'border-dark': '#374151',
        'input-light': '#ffffff',
        'input-dark': '#1e293b',
        'placeholder-light': '#9ca3af',
        'placeholder-dark': '#6b7280',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      boxShadow: {
        'custom': '0px 1px 4px rgba(0, 0, 0, 0.16)',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

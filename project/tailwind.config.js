/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#e8e4de',
          300: '#d9d3cc',
          400: '#c4b8a9',
          500: '#a89989',
          600: '#8d7a6a',
          700: '#706054',
          800: '#5a4d43',
          900: '#463e36',
        },
        sage: {
          50: '#f7f8f7',
          100: '#eff1ee',
          200: '#dde2da',
          300: '#c8d1c3',
          400: '#adb9a6',
          500: '#8fa085',
          600: '#748267',
          700: '#5d6852',
          800: '#4c5444',
          900: '#3f453a',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
};
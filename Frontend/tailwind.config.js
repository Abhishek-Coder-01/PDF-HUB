/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50: '#f8f7f4',
          100: '#efeee8',
          200: '#dbd8cc',
          300: '#c7c2b0',
          400: '#9f9679',
          500: '#d4a574',
          600: '#b08a5e',
          700: '#8c6e48',
          800: '#685332',
          900: '#44371c',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          light: '#2d2d2d',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f90342',
          light: '#fa3563',
          lighter: '#fc6684',
          dark: '#d7023a',
          darker: '#b50230',
        },
        secondary: {
          DEFAULT: '#2d0a3d',
          light: '#3d0e54',
          lighter: '#4d126a',
          dark: '#1d0628',
          darker: '#0d0312',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-up': 'fadeUp 0.8s ease-out',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
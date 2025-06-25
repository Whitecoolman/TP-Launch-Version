/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#000000',
          50: '#161618',
          100: '#1C1C1F',
          200: '#222225',
          300: '#2A2A2E',
          400: '#323236',
          500: '#3A3A3F',
          600: '#434348',
          700: '#4C4C52',
        },
        accent: {
          DEFAULT: '#007AFF',
          dark: '#0056B3',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
        'glass-hover': 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
      },
      boxShadow: {
        'glass': '0 4px 24px -1px rgba(0, 0, 0, 0.2)',
        'glass-hover': '0 8px 32px -1px rgba(0, 0, 0, 0.3)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-medium': 'float-medium 5s ease-in-out infinite',
        'float-fast': 'float-fast 4s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': { 
            'background-size': '200% 100%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 100%',
            'background-position': 'right center',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
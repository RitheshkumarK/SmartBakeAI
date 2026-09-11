/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F9F5EE',
          200: '#F3ECE0',
          300: '#EBDDC9',
          400: '#DEC4A4',
          500: '#C9A882',
        },
        chocolate: {
          950: '#170D08',
          900: '#2A1810',
          800: '#3D2317',
          700: '#563321',
          600: '#73462D',
          500: '#945C3C',
          400: '#B87A54',
        },
        caramel: {
          50: '#FFF8ED',
          100: '#FEEDD3',
          200: '#FCDAA8',
          300: '#F9C072',
          400: '#F59E0B',
          500: '#E67E22',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        bakery: {
          gold: '#E5A93C',
          berry: '#BE185D',
          mint: '#10B981',
          toast: '#D4A373',
          dough: '#EFE7DA',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 3px 0 rgba(42, 24, 16, 0.05)',
        'warm': '0 4px 20px -2px rgba(42, 24, 16, 0.08), 0 2px 6px -2px rgba(42, 24, 16, 0.04)',
        'warm-lg': '0 10px 30px -4px rgba(42, 24, 16, 0.12), 0 4px 10px -3px rgba(42, 24, 16, 0.06)',
        'warm-xl': '0 20px 40px -8px rgba(42, 24, 16, 0.15)',
        'glow-caramel': '0 0 25px -5px rgba(230, 126, 34, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}

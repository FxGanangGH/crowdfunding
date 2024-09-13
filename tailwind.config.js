/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,html,js}'],
  theme: {
    extend: {
      fontFamily: {
        commissioner: ['Commissioner', 'sans-serif']
      },
      colors: {
        cyan: {
          50: '#ECF9F8',
          100: '#D5F1EF',
          200: '#AFE4E1',
          300: '#85D6D1',
          400: '#5EC9C2',
          500: '#3CB4AB',
          600: '#30918B',
          700: '#246B66',
          800: '#184945',
          900: '#0B2221',
          950: '#061312'
        }
      }
    }
  },
  plugins: []
}

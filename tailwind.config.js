/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        page: '1450px',
      },
      colors: {
        'rify-menu': '#4b5cc4',
        'rify-link': '#057748',
        'rify-primary': '#2979ff',
      },
      screens: {},
      fontFamily: {
        founder: ['founder-youhei', 'sans-serif'],
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        '.n-button': {
          'background-color': 'var(--n-color, var(--n-text-color))',
        },
      });
    },
  ],
};

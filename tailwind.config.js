/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'md': {'max': '850px'},
      // => @media (max-width: 850px)
    },
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'ali-darkblue': '#001E60',
      },
    },
  },
  plugins: [],
}


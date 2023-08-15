/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xxlr': {'max': '1250px'},
      'xlr': {'max': '1050px'},
      'lr': {'max': '850px'},
      'md': {'max': '600px'},
      'sm': {'max': '480px'},
      'xsm': {'max': '350px'},
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


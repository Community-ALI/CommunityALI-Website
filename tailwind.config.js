/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxlr: { max: "1250px" },
      xlr: { max: "1050px" },
      lr: { max: "850px" },
      md: { max: "600px" },
      sm: { max: "480px" },
      xsm: { max: "350px" },
      // => @media (max-width: 850px)

      mdd: { min: "480px" },
      lrr: { min: "600px" },
      xlrr: { min: "850px" },
      txxs: "320px",
      txsm: "414px",
      tsm: "600px",
      tmd: "780px",
      tlg: "1024px",
      txl: "1280px",
      t2xl: "1536px",
      t3xl: "2570px",
    },
    extend: {
      colors: {
        "regal-blue": "#243c5a",
        "ali-backgroundblue": "#0096C9",
        "ali-darkblue": "#001E60",
        "ali-lightblue": "#00468D",
        "ali-orange": "#ecaa1e",
      },
      animation: {
        "ali-spin": "ali-spin 2s infinite ease",
        "ali-fill": "ali-fill 2s infinite ease-in",
        fadeInFast: "fadeIn 0.25s",
      },
      keyframes: {
        "ali-spin": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(180deg)" },
          "50%": { transform: "rotate(180deg)" },
          "75%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "ali-fill": {
          "0%": { transform: "scaleY(0)" },
          "25%": { transform: "scaleY(0)" },
          "50%": { transform: "scaleY(1)" },
          "75%": { transform: "scaleY(1)" },
          "100%": { transform: "scaleY(0)" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px'
    },
    extend: {
      colors:{
        themeLightBlueColor:'#4C94B5',
        backgroundGray:'#F3F3F3',

      },
      
    },
    fontFamily:{

    },
  },
  plugins: [],
}


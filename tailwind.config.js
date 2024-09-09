/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        katex: ["KaTeX_Math"],
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        myPink: '#9f89cd',
        bg2: '#0c0c0c',
        subText: '#b3b4b6',
        greyBorder: '#282D33',
        lightBlue: '#7fdcff'
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
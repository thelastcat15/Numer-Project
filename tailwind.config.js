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
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
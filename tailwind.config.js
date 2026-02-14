/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa",
        secondary: "#333333",
      },
      fontFamily: {
        // Registers 'font-lato' and 'font-roboto'
        // Includes default sans stack as a fallback for better UX
        lato: ["Lato", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        slideInAnimate: {
          "0%": { opacity: "0", transform: "translate3d(0, 100%, 0)" },
          "100%": { opacity: "1", transform: "translateZ(0)" },
        },
      },
      animation: {
        // You can now use 'animate-slideIn' instead of custom CSS classes
        slideIn: "slideInAnimate 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};

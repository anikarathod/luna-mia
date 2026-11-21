/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        chocolate: "#68482E",
        cream: "#F6F0E7",
        champagne: "#C6A36A",
        beige: "#E6D8C8",
        rose: "#D9B9B2",
        espresso: "#30251F",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Cormorant Garamond", "serif"],
        sans: ["Poppins", "Lato", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(104, 72, 46, 0.08)",
      },
    },
  },
  plugins: [],
};
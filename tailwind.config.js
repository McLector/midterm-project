/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "moon-blue": "#1e2a47",
        "moon-indigo": "#2e3a6f",
        "moon-teal": "#2c4c58",
        "moon-purple": "#37294f",
        "moon-gray": "#1b1f2b",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

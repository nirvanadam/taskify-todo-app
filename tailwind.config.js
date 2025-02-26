/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "serif"],
      },
      colors: {
        textColor: {
          accent: "#007FFF",
          secondary: "#8C9DB8",
        },
        background: {
          // primary: "#0C0C0C",
          secondary: "#F5F7F9",
        },
      },
    },
  },
  plugins: [],
};

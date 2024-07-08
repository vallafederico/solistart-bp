/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        gx: "5vw",
        px: "2vh",
      },
    },
  },
  plugins: [],
};

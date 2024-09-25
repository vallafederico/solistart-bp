/** @type {import('tailwindcss').Config} */

const grid = {
  gutter: "1rem",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["soh", "sans-serif"],
    },
    extend: {
      spacing: {
        gx: "5vw",
        px: "2vh",
        gy: "5vh",
        ...grid,
      },
    },
  },
  plugins: [],
};

// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        128: "30rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

// tailwind.config.js
module.exports = {
  content: [
    // Example content paths...
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        "32rem": "32rem",
        "26rem": "26rem",
        "28rem": "28rem",
        "30rem": "30rem",
        "38rem": "38rem",
      },
      maxWidth: {
        "2.5xl": "40rem;",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

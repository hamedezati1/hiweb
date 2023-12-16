module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // other configurations...

  theme: {
    extend: {
      colors: {
        customGreen: "#46B666",
        customGray: "#C9C9C9",
      },
    },
  },
};

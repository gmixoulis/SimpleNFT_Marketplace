
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    
  ],
  theme: {
    debugScreens: {
      prefix: "screen: ",
    },
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    },

    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
    },

    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      unic: "#EAEAEA",
      border: "#343434",
      textgray: "#53565A",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      bubblegum: "#ff77e9",
      bermuda: "#78dcca",
    },

    fontFamily: {
      h1: ["OsnovaPro", "sans-serif"],
      p: ["Helvetica"],
    },
    fontSize: {
      large: ["3.25rem", "3.25rem"],
      medium: ["2.625rem", "1em"],
      small: "1.1rem",
      base: "1.2rem",
      button: "2rem",
      xsmall: "0.875rem",
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwindcss-debug-screens")],
}

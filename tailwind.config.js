const tokens = require("./styles/tailwind-tokens.json"); 


module.exports = {
  darkMode: "class",
  content: [

    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ...(tokens.colors ? { colors: tokens.colors } : {}), // ✅ inject only colors
      ...(tokens.fontFamily ? { fontFamily: tokens.fontFamily } : {}),
      ...(tokens.fontSize ? { fontSize: tokens.fontSize } : {}),
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        heymate: {
          primary: tokens?.colors?.["brand-primary"] || "#7e22ce",
          secondary: tokens?.colors?.["brand-secondary"] || "#db2777",
          accent: "#4ade80",
          neutral: "#1f2937",
          "base-100": "#ffffff",
        },
      },
      "light",
      "dark",
    ],
  },
};

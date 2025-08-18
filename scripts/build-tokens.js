// scripts/build-tokens.js
const fs = require("fs");
const colors = require("../styles/tokens/Colors.json");
const sizes = require("../styles/tokens/Size.json");
const textStyles = require("../styles/tokens/textStyles.json");
const typography = require("../styles/tokens/Typography.json");

function rgbaToCss({ r, g, b, a }) {
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
}

// ---- Colors ----
const tailwindColors = {};
colors.variables.forEach((v) => {
  const value = v.resolvedValuesByMode["2:0"].resolvedValue;
  tailwindColors[v.name.replace(/\s+/g, "-").replace("/", "-")] = rgbaToCss(value);
});

// ---- Sizes ----
const tailwindSpacing = {};
sizes.variables.forEach((v) => {
  tailwindSpacing[v.name.replace("Universal/", "").toLowerCase()] =
    `${v.resolvedValuesByMode["4:0"].resolvedValue}px`;
});

// ---- Typography ----
const tailwindFonts = {
  heading: [typography.variables[0].valuesByMode["12:0"], "sans-serif"],
  body: [typography.variables[1].valuesByMode["12:0"], "sans-serif"],
};

// ---- Text Styles ----
const tailwindFontSizes = {};
textStyles.textStyles.forEach((style) => {
  const key = style.name.split("/").pop().replace(/\s+/g, "-").toLowerCase();
  tailwindFontSizes[key] = `${style.fontSize}px`;
});

// ---- Final Theme ----
const theme = {
  extend: {
    colors: tailwindColors,
    spacing: tailwindSpacing,
    fontFamily: tailwindFonts,
    fontSize: tailwindFontSizes,
  },
};

fs.writeFileSync("styles/tailwind-tokens.json", JSON.stringify(theme, null, 2));

console.log("✅ Tokens transformed into styles/tailwind-tokens.json");

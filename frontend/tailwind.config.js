/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#020617", // slate-950
        primary: "#7c3aed", // violet-600
        secondary: "#c026d3", // fuchsia-600
        accent: "#22d3ee", // cyan-400
        card: "rgba(255, 255, 255, 0.05)",
        border: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["System"], // Use system font for now, can upgrade to Manrope later
      },
    },
  },
  plugins: [],
}

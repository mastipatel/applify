/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      textColor: theme => ({
        ...theme("colors"),
        "primaryBackground": "#F5F5F5",
        "secondaryBackground": "#30353B",
        "primaryForeground": "#0F0A0A",
        "secondaryForeground": "#FAFEFF",
        "accent": "#3B7080",
      }),
      colors: {
        "primaryBackground": "#F5F5F5",
        "secondaryBackground": "#30353B",
        "primaryForeground": "#0F0A0A",
        "secondaryForeground": "#FAFEFF",
        "accent": "#3B7080",
      },
    },
  },
  plugins: [],
}


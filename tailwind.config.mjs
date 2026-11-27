/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cl: {
          "deep-ocean": "#062F45",
          "ocean-card": "#093A56",
          ocean: "#0B4A6B",
          blue: "#1370AF",
          sky: "#8EB5DB",
          white: "#FFFFFF",
          paper: "#F5F7F9",
          amber: "#9E5A10",
        },
      },
      fontFamily: {
        lora: ["var(--font-lora)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

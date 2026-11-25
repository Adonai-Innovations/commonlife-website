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
        clDeepOcean: "#062F45",
        clOceanCard: "#093A56",
        clOcean: "#0B4A6B",
        clBlue: "#1370AF",
        clSky: "#8EB5DB",
        clWhite: "#FFFFFF",
        clPaper: "#F5F7F9",
        clAmber: "#9E5A10",
        brand: {
          navy: "#101832",
          berry: "#4A6CD4",
          lightBerry: "#82AADF",
          navyDark: "#080D1E",
          offWhite: "#F4F6FB",
        },
      },
      fontFamily: {
        heading: ["var(--font-cabin, var(--font-lora))", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        lora: ["var(--font-lora)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

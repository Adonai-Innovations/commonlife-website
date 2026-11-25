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
        brand: {
          navy: "#101832",
          berry: "#4A6CD4",
          lightBerry: "#82AADF",
          navyDark: "#080D1E",
          offWhite: "#F4F6FB",
        },
      },
      fontFamily: {
        heading: ["var(--font-cabin)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
        xl: "1237px",
        lg: "1024px",
        md: "617px",
        sm: "320px",
      },
    },
  },
  plugins: [],
};

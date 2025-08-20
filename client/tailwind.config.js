/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#198754",
        "custom-blue": {
          100: "#E0F2F7",
          500: "#2196F3",
          900: "#0D47A1",
        },
      },
    },
  },
  plugins: [],
};

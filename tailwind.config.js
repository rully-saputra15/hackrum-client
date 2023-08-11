/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {},
  },
  safelist: [
    "bg-[#000000]",
    "bg-[#42b983]",
    "bg-[#36454F]",
    "to-[#36454F]",
    "from-[#36454F]",
    "to-[#F1931B]",
    "from-[#F1931B]",
    "hover:bg-[#36454F]",
    "hover:bg-[#F1931B]",
    "focus:ring-[#36454F]",
  ],
  plugins: [],
};

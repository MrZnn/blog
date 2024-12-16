/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 启用 class 方式的暗黑模式
  content: ["./docs/.vitepress/**/*.{js,ts,vue}", "./docs/**/*.{md,html}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1a202c",
        "dark-text": "#a0aec0",
        "dark-border": "#2d3748",
      },
    },
  },
  plugins: [],
};
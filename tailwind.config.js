/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,jsx}"],
  darkMode: "class",
  purge: {
    content: ["./src/**/*.{tsx,jsx}"],
  },
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        dynamicColor: 'var(--dynamic-color)', // 定义动态颜色变量
      }
    },
  },
  plugins: ['@tailwindcss/forms'],
  corePlugins: {
    preflight: false
  },
};

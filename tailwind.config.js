/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',],
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {
    screens: {
      'sm': { 'max': '639px' },  // Setting max width to 639px for sm screen
      'md': { 'min': '640px', 'max': '767px' },  // Adjusting the max width for md screen to avoid overlap with sm
      'lg': { 'min': '768px', 'max': '1023px' },  // Keeping the existing min and max values for lg screen
      'xl': { 'min': '1024px', 'max': '1279px' },  // Keeping the existing min and max values for xl screen
      '2xl': { 'min': '1280px' },  // Keeping the existing min value for 2xl screen
    },
    colors: {
      'indigo': {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
      },
      'blue': {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      'red': {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#e7e5e4",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
      }
    }
  }
}


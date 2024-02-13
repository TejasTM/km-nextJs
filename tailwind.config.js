/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/utils/**/*.{js,ts,jsx,tsx,mdx}',],
        theme: {
         
            screens: {
              'sm': {'max': '639px'},  // Setting max width to 639px for sm screen
              'md': {'min': '640px', 'max': '767px'},  // Adjusting the max width for md screen to avoid overlap with sm
              'lg': {'min': '768px', 'max': '1023px'},  // Keeping the existing min and max values for lg screen
              'xl': {'min': '1024px', 'max': '1279px'},  // Keeping the existing min and max values for xl screen
              '2xl': {'min': '1280px'},  // Keeping the existing min value for 2xl screen
            }
          }
}


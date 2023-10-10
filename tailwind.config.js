/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#04015E',
        btnHover:'rgba(167, 165, 246, 0.15)',
        secondary: '#45B7FB',
        tertiary: '#549871',
        quaternary: '#F0352D',

      }
    },
  },
  plugins: [],
}


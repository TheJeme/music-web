/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        spotify: '#1DB954',
        appleMusic: '#FC3C44',
        youtube: '#FF0000',
        tidal: '#000000',
      },
    },
  },
  plugins: [],
} 
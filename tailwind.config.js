/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          main: "#11111a",
          secondary: '#25273b',
          tertiary: "#53535e"
        },
        light: {
          main: '#cfcfcf',
          secondary: "#f1f1f1",
          tertiary: "#aaaaaa"
        }
      },
      gridTemplateColumns: {
        'cards': 'repeat(auto-fit, minmax(340px, 1fr))',
        'content': '75px 1fr'
      }
    },
  },
  plugins: [],
}

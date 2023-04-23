/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxHeight: {
        'modal-dialog': 'calc(100vh - 300px)',
      },
      colors: {
        'skeleton': '#53535e50',
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
        'content': '75px 1fr',
        'modal': "30% 70%",
        'modal-50': "50% 50%"
      }
    },
  },
  plugins: [],
}

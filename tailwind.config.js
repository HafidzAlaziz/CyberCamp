/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-green': '#00ff00',
        'cyber-cyan': '#00ffff',
        'cyber-dark': '#0a0a0a',
        'cyber-gray': '#1a1a1a',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'neon-green': '0 0 5px #00ff00, 0 0 20px #00ff00',
        'neon-cyan': '0 0 5px #00ffff, 0 0 20px #00ffff',
      }
    },
  },
  plugins: [],
}

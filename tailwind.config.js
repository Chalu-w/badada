/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        memorial: {
          dark: '#081712',      // Deepest forest black-green
          deep: '#0F2E23',      // Rich royal forest green
          emerald: '#16423C',   // Classic deep green
          forest: '#1E5649',    // Accent forest green
          sage: '#6C8B74',      // Soft sage
          gold: '#C5A059',      // Antique gold
          goldBright: '#DFBE76',// Luminous gold
          goldDark: '#9A7B38',  // Shadowed gold
          cream: '#FAF7F2',     // Soft warm ivory
          parchment: '#F3EFE6', // Antique parchment
          card: '#FFFFFF',
          textDark: '#1A2421',
          textMuted: '#5C6D66',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'memorial': '0 10px 30px -5px rgba(15, 46, 35, 0.15), 0 4px 6px -2px rgba(197, 160, 89, 0.1)',
        'gold-glow': '0 0 25px rgba(197, 160, 89, 0.35)',
        'deep-glow': '0 20px 40px rgba(8, 23, 18, 0.3)',
      }
    },
  },
  plugins: [],
}


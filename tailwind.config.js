/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'call-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(249,115,22,0.6)' },
          '50%': { boxShadow: '0 0 0 12px rgba(249,115,22,0)' },
        },
      },
      animation: {
        'call-pulse': 'call-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'modern-red': '#F60001',
        'modern-red-hover': '#C40001',
        'charcoal': '#1A1A1A',
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

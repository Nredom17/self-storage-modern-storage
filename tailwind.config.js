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
        // Poppins is the default site font; `font-sans` (Tailwind's default)
        // resolves to it. Bebas Neue stays reserved for the brand logo.
        sans: [
          'var(--font-poppins)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

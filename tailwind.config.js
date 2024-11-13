/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scale: {
        '102': '1.02',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      scale: {
        '102': '1.02',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.3)',
      },
      fontFamily: {
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-colors': 'pulseColors 4s infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseColors: {
          '0%': { color: '#ef4444' },    // red-500
          '25%': { color: '#ef4444' },   // hold red longer
          '50%': { color: '#8b5cf6' },   // purple-500
          '75%': { color: '#3b82f6' },   // blue-500
          '100%': { color: '#ef4444' },  // back to red
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
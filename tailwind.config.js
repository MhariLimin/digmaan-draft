/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'team-a': '#1ec7c7',
        'team-b': '#e23a3a',
        'arena-bg': '#1a0e2a',
        'arena-glow': '#7a3aa3',
      },
      fontFamily: {
        display: ['"Russo One"', 'Impact', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'team-a': '0 0 24px 2px rgba(30, 199, 199, 0.55)',
        'team-b': '0 0 24px 2px rgba(226, 58, 58, 0.55)',
      },
      keyframes: {
        spinCoin: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(1800deg)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'coin-spin': 'spinCoin 1.6s ease-out',
        'pulse-glow': 'pulseGlow 1.8s ease-in-out infinite',
        'fade-up': 'fadeUp 220ms ease-out',
      },
    },
  },
  plugins: [],
};

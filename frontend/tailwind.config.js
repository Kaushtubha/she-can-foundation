/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        neon: {
          purple: '#9b5de5',
          pink: '#f15bb5',
          blue: '#00bbf9',
          cyan: '#00f5d4',
        },
        dark: {
          900: '#030014',
          800: '#070a1a',
          700: '#0d1030',
          600: '#111827',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-x': 'gradientX 4s ease infinite',
        'gradient-flow': 'gradientFlow 6s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'orbit': 'orbit 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(155,93,229,0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(155,93,229,0.8), 0 0 100px rgba(241,91,181,0.4)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #030014 0%, #0d1030 50%, #070a1a 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(155,93,229,0.1) 0%, rgba(241,91,181,0.1) 100%)',
        'neon-border': 'linear-gradient(90deg, #9b5de5, #f15bb5, #00bbf9, #9b5de5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(155,93,229,0.5), 0 0 40px rgba(155,93,229,0.2)',
        'neon-pink': '0 0 20px rgba(241,91,181,0.5), 0 0 40px rgba(241,91,181,0.2)',
        'neon-blue': '0 0 20px rgba(0,187,249,0.5), 0 0 40px rgba(0,187,249,0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}

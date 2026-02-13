/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: "#2563EB",
        secondary: "#C026D3",
        accent: "#00E0FF",
        "background-light": "#F2F4F8",
        "background-dark": "#050505",
        "surface-light": "#FFFFFF",
        "surface-dark": "#0F0F0F",
      },
      animation: {
        'blob': 'blob 10s infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'reflection': 'reflection 10s linear infinite',
        'aurora': 'aurora 15s ease-in-out infinite',
        'aurora-2': 'aurora2 12s ease-in-out infinite reverse',
        'aurora-3': 'aurora3 18s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'particle': 'particle 20s linear infinite',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-subtle': 'bounceSoft 2s ease-in-out infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'page-enter': 'pageEnter 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scan: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' },
        },
        reflection: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: '0.4' },
          '25%': { transform: 'translate(50px, -30px) rotate(5deg) scale(1.1)', opacity: '0.6' },
          '50%': { transform: 'translate(-20px, 40px) rotate(-3deg) scale(0.95)', opacity: '0.3' },
          '75%': { transform: 'translate(30px, 20px) rotate(2deg) scale(1.05)', opacity: '0.5' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: '0.3' },
          '33%': { transform: 'translate(-40px, 30px) rotate(-5deg) scale(1.15)', opacity: '0.5' },
          '66%': { transform: 'translate(30px, -40px) rotate(3deg) scale(0.9)', opacity: '0.4' },
        },
        aurora3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(-30px, -20px) scale(1.2)', opacity: '0.4' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pageEnter: {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.99)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-secondary': '0 0 20px rgba(217, 70, 239, 0.5)',
        'glow-sm': '0 0 10px rgba(59, 130, 246, 0.3)',
        'glow-accent': '0 0 20px rgba(0, 224, 255, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.1)',
      }
    },
  },
  plugins: [],
}

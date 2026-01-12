/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Dark Theme - VedixLab
        'vedix-black': '#0B0B0D',
        'vedix-card': '#141417',
        'vedix-red': '#E10600',
        'vedix-red-light': '#FF1A0D',
        'vedix-red-dark': '#B30500',
        'vedix-border': '#1F1F23',
        'vedix-gray': '#8B8B8F',
        'vedix-white': '#FFFFFF',
        // Legacy support (keep for gradual migration)
        'space-black': '#0B0B0D',
        'midnight-blue': '#141417',
        'cyber-navy': '#141417',
      },
      fontFamily: {
        'heading': ['Poppins', 'Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'Urbanist', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        // Apple-style subtle shadows - minimal red glow, only for key actions
        'apple-subtle': '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.06)',
        'apple-medium': '0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
        'apple-large': '0 8px 32px rgba(0, 0, 0, 0.16), 0 4px 16px rgba(0, 0, 0, 0.12)',
        // Red glow only for key actions (buttons, CTAs)
        'apple-red-glow': '0 0 20px rgba(225, 6, 0, 0.3), 0 0 40px rgba(225, 6, 0, 0.1)',
        'apple-red-glow-hover': '0 0 30px rgba(225, 6, 0, 0.5), 0 0 60px rgba(225, 6, 0, 0.2)',
      },
      animation: {
        // Apple-style animations - smooth and subtle
        'apple-fade-in': 'appleFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'apple-slide-up': 'appleSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'apple-scale-in': 'appleScaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'apple-parallax': 'appleParallax 8s ease-in-out infinite alternate',
        'apple-float': 'appleFloat 12s ease-in-out infinite',
        'apple-pulse': 'applePulse 3s ease-in-out infinite',
        // Legacy animations (keep for compatibility)
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        // Apple-style keyframes - smooth and natural
        appleFadeIn: {
          'from': { opacity: '0', transform: 'translateY(24px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        appleSlideUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        appleScaleIn: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        appleParallax: {
          'from': { transform: 'translateY(-10px)' },
          'to': { transform: 'translateY(10px)' },
        },
        appleFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg)' },
          '66%': { transform: 'translateY(8px) rotate(-1deg)' },
        },
        applePulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        // Legacy keyframes (keep for compatibility)
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(225, 6, 0, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(225, 6, 0, 0.8), 0 0 50px rgba(225, 6, 0, 0.4)' },
        },
        redPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(225, 6, 0, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(225, 6, 0, 0.8), 0 0 60px rgba(225, 6, 0, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      borderRadius: {
        'vedix': '12px',
        'vedix-lg': '16px',
        'vedix-xl': '20px',
      },
    },
  },
  plugins: [],
}


import type { Config } from 'tailwindcss'

const config: Config = {
  // darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pink:   { DEFAULT: '#FFB7D5', 2: '#FF7AB6' },
        lav:    { DEFAULT: '#B8A4FF', 2: '#8A6BFF' },
        sky:    '#A8D8FF',
        cyan:   '#6EF2FF',
        peach:  '#FFD4A8',
        night:  { DEFAULT: '#0B0820', 2: '#1A1235', 3: '#241848' },
        ink:    '#1a0f3a',
        paper:  '#FFF6FB',
      },
      fontFamily: {
        kawaii: ['var(--font-kawaii)', 'system-ui', 'sans-serif'],
        serif:  ['var(--font-serif)', 'serif'],
        pixel:  ['var(--font-pixel)', 'monospace'],
        arcade: ['var(--font-arcade)', 'monospace'],
      },
      animation: {
        float:   'float 8s ease-in-out infinite',
        bob:     'bob 4s ease-in-out infinite',
        blink:   'blink 1s infinite',
        spin:    'spin 4s linear infinite',
        load:    'load 2.4s ease-in-out infinite alternate',
        twinkle: 'twinkle 2.4s infinite',
        halo:    'halo 6s ease-in-out infinite',
        fall:    'fall linear infinite',
        trail:   'trail 700ms ease-out forwards',
        visualizer: 'visualizer 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        float:    { '50%': { transform: 'translateY(-12px)' } },
        bob:      { '50%': { transform: 'translateY(-10px)' } },
        blink:    { '50%': { opacity: '0.3' } },
        load:     { '0%': { width: '18%' }, '100%': { width: '88%' } },
        twinkle:  { '50%': { opacity: '0.2', transform: 'scale(0.6)' } },
        halo:     { '50%': { transform: 'scale(1.05)' } },
        fall: {
          '0%':   { transform: 'translate3d(0,-10vh,0) rotate(0deg)' },
          '100%': { transform: 'translate3d(40px,110vh,0) rotate(540deg)' },
        },
        trail: {
          '0%':   { transform: 'translate(-50%,-50%) scale(1)', opacity: '0.9' },
          '100%': { transform: 'translate(-50%,-50%) scale(0)', opacity: '0' },
        },
        visualizer: {
          '0%':   { transform: 'scaleY(0.4)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      backdropBlur: { DEFAULT: '14px' },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
}

export default config
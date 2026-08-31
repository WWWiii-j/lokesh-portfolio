/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Single muted coral/orange accent — warm, not neon.
        primary: {
          DEFAULT: '#c94a0a',
          hover: '#a83d08',
          light: '#fde3cf',
          'ultra-light': '#fdf1e6',
        },
        accent: {
          DEFAULT: '#c94a0a',
          hover: '#a83d08',
          light: '#fde3cf',
        },
        ink: {
          DEFAULT: '#26221d',
          muted: '#6d675e',
          faint: '#a39c90',
        },
        paper: {
          // warm off-whites for light mode
          DEFAULT: '#faf8f4',
          alt: '#f3f0e8',
          // deep charcoal for dark mode (not blue-tinted navy)
          dark: '#181614',
          'dark-alt': '#1f1c19',
          'dark-deep': '#141210',
        },
        'warm-white': '#f0ece3',
      },
      fontFamily: {
        // Editorial display serif — characterful, human-designed, warm.
        display: ['Fraunces', 'Georgia', 'serif'],
        // Body / UI — humanist grotesque, not geometric/rounded.
        body: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        // Metadata, labels, small caps.
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-mobile': ['2.4rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        widest2: '0.22em',
        editorial: '-0.025em',
      },
      borderRadius: {
        pill: '9999px',
        '2px': '2px',
      },
      boxShadow: {
        primary: '0 8px 20px -4px rgba(201, 74, 10, 0.22)',
        soft: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        card: '0 2px 8px rgba(0,0,0,0.05)',
        lift: '0 12px 32px rgba(0,0,0,0.1)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        inout: 'cubic-bezier(0.45, 0, 0.55, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        caret: 'caret 0.8s step-end infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}

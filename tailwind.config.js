/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0052CC',
          dark: '#003D99',
          light: '#2684FF',
        },
        secondary: {
          DEFAULT: '#172B4D',
          dark: '#091E42',
          light: '#344563',
        },
        accent: {
          DEFAULT: '#00B8D9',
          dark: '#0087A3',
          light: '#79E2F2',
        },
        success: {
          DEFAULT: '#4CAF50',
          dark: '#3D8B40',
          light: '#7DC27E',
        },
        warning: {
          DEFAULT: '#FFC107',
          dark: '#E5AC06',
          light: '#FFD54F',
        },
        error: {
          DEFAULT: '#F44336',
          dark: '#D32F2F',
          light: '#EF9A9A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 8px 25px rgba(0, 82, 204, 0.25)',
        'shine': '0 12px 30px rgba(0, 184, 217, 0.2)',
        'card': '0 0 1px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 0 1px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-shine': 'linear-gradient(135deg, #0052CC 0%, #2684FF 50%, #00B8D9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #172B4D 0%, #344563 50%, #172B4D 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      animation: {
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B47E0',
          50: '#E8E5FF',
          100: '#D4CDFF',
          200: '#B7ACFF',
          300: '#998AFF',
          400: '#7A69FF',
          500: '#5B47E0',
          600: '#4835B8',
          700: '#362690',
          800: '#241768',
          900: '#120B40'
        },
        secondary: {
          DEFAULT: '#8B7FE8',
          50: '#F3F1FF',
          100: '#E6E2FF',
          200: '#D4CDFF',
          300: '#C1B8FF',
          400: '#AE9BFF',
          500: '#8B7FE8',
          600: '#6B5BBF',
          700: '#4B3A96',
          800: '#2B1F6D',
          900: '#0B0444'
        },
        accent: {
          DEFAULT: '#FF6B6B',
          50: '#FFE5E5',
          100: '#FFCCCC',
          200: '#FF9999',
          300: '#FF6666',
          400: '#FF3333',
          500: '#FF6B6B',
          600: '#E55555',
          700: '#CC3F3F',
          800: '#B22929',
          900: '#991313'
        },
        success: {
          DEFAULT: '#4ECDC4',
          50: '#E6F7F6',
          100: '#CCF0ED',
          200: '#99E1DB',
          300: '#66D2C9',
          400: '#33C3B7',
          500: '#4ECDC4',
          600: '#3EA49D',
          700: '#2E7B76',
          800: '#1F524F',
          900: '#0F2928'
        },
        warning: {
          DEFAULT: '#FFE66D',
          50: '#FFFEE6',
          100: '#FFFCCC',
          200: '#FFF999',
          300: '#FFF666',
          400: '#FFF333',
          500: '#FFE66D',
          600: '#E6CC5A',
          700: '#CCB347',
          800: '#B39934',
          900: '#998021'
        },
        info: {
          DEFAULT: '#4A90E2',
          50: '#E6F0FB',
          100: '#CCE1F7',
          200: '#99C3EF',
          300: '#66A5E7',
          400: '#3387DF',
          500: '#4A90E2',
          600: '#3B73B5',
          700: '#2C5688',
          800: '#1D395B',
          900: '#0E1C2E'
        }
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-lg': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.5' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(91, 71, 224, 0.3)',
        'task': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'task-hover': '0 4px 12px rgba(0, 0, 0, 0.1)'
      },
      backdropBlur: {
        'xs': '2px'
      },
      animation: {
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'confetti': 'confetti 0.8s ease-out'
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        confetti: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(0.5) rotate(360deg)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}
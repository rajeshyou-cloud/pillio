import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pillio: {
          bg: '#FAFAFA',
          navy: '#0A1128',
          teal: '#00E5FF',
          gold: '#FFB703',
        }
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 183, 3, 0.4)',
      }
    },
  },
  plugins: [],
}
export default config
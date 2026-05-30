/** @type {import('tailwindcss').Config} */
/* PlanE - 高奢极简·东方哲学 Tailwind Config */
export default {
  darkMode: 'class', // 启用 class 模式暗色主题
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* PlanE - 高奢极简·东方哲学 */
        'ink-black': '#1A1918',
        'moon-white': '#FAFAF9',
        'gold-sand': '#C9A962',
        'bamboo-green': '#4A7C59',
        'paper-brown': '#8B7355',
        'warm-gray': '#6B6B6B',
        'light-gray': '#E8E8E6',
        /* Alias */
        primary: '#1A1918',
        secondary: '#8B7355',
        accent: '#C9A962',
        success: '#4A7C59',
        background: '#FAFAF9',
        surface: '#FFFFFF',
        'text-primary': '#1A1918',
        'text-secondary': '#8B7355',
        border: '#E8E8E6',
      },
      fontFamily: {
        heading: ["'Noto Serif SC'", "'Source Han Serif SC'", 'serif'],
        body: ["'Noto Sans SC'", "'Source Han Sans SC'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ["'Noto Serif SC'", 'serif'],
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        md: '4px',
        lg: '8px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(26, 25, 24, 0.05)',
        soft: '0 2px 8px rgba(26, 25, 24, 0.08)',
        medium: '0 4px 16px rgba(26, 25, 24, 0.12)',
        none: 'none',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
};

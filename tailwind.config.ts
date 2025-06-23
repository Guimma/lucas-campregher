import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'display': ['var(--font-playfair)', 'serif'],
        'mono': ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            transform: 'translateY(0%)',
          },
          '50%': {
            transform: 'translateY(-100%)',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            transform: 'translateX(0%)',
          },
          '50%': {
            transform: 'translateX(100%)',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            transform: 'translate(0%, 0%)',
          },
          '25%': {
            transform: 'translate(100%, 0%)',
          },
          '50%': {
            transform: 'translate(100%, 100%)',
          },
          '75%': {
            transform: 'translate(0%, 100%)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config; 
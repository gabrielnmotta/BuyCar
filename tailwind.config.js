/** @type {import('tailwindcss').Config} */

const colors = {
  "primary-200": "var(--primary-200)",
  "primary-100": "var(--primary-100)",
  "primary-300": "var(--primary-300)",
  "primary-400": "var(--primary-400)",
  "primary-500": "var(--primary-500)",
  "primary-600": "var(--primary-600)",
  "primary-700": "var(--primary-700)",
  "primary-800": "var(--primary-800)",
  "primary-900": "var(--primary-900)",
  "primary-1000": "var(--primary-1000)",
  "primary-1100": "var(--primary-1100)",
  "primary-1200": "var(--primary-1200)",
  "primary-1300": "var(--primary-1300)",
  "primary-1400": "var(--primary-1400)",

  "neutral-0": "var(--neutral-0)",
  "neutral-50": "var(--neutral-50)",
  "neutral-100": "var(--neutral-100)",
  "neutral-200": "var(--neutral-200)",
  "neutral-300": "var(--neutral-300)",
  "neutral-400": "var(--neutral-400)",
  "neutral-500": "var(--neutral-500)",
  "neutral-600": "var(--neutral-600)",
  "neutral-700": "var(--neutral-700)",
  "neutral-800": "var(--neutral-800)",
  "neutral-900": "var(--neutral-900)",
  "neutral-1000": "var(--neutral-1000)",

  "critical-background": "var(--critical-background)",
  "critical-primary": "var(--critical-primary)",

  "highlight-background": "var(--highlight-background)",
  "highlight-primary": "var(--highlight-primary)",

  "success-background": "var(--success-background)",
  "success-primary": "var(--success-primary)",

  "warning-background": "var(--warning-background)",
  "warning-primary": "var(--warning-primary)",
};

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: colors,
      textColor: colors,
      fontSize: {
        largeTitle: "3.25rem",
        title1: "2.70rem",
        title2: "2.25rem",
        title3: "1.875rem",
        title4: "1.35rem",
        body: "1.1rem",
        footnote: "0.8125rem",
        subhead: "0.9375rem",
      },
      backgroundImage: {
        "login-background": "url('/Login/rainbow-vortex.svg')",
      },
    },
  },
  plugins: [],
}

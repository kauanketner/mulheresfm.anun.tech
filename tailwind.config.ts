import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FAF7F2",
          200: "#F8F4ED",
          300: "#F2EAD8",
          400: "#E8DFC9",
          500: "#DDD0B3",
        },
        gold: {
          light: "#E8CF7A",
          DEFAULT: "#D3B257",
          dark: "#B8982A",
          deep: "#8B7120",
        },
        charcoal: {
          50: "#F7F6F5",
          100: "#EEECE9",
          200: "#D6D2CB",
          300: "#B0A99E",
          400: "#8A7F72",
          500: "#6B5E52",
          600: "#5A4E44",
          700: "#3D3530",
          800: "#2D2820",
          900: "#1C1A18",
        },
        muted: "#5A5248",
        border: "#E5DDD0",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #D3B257 0%, #E8CF7A 50%, #B8982A 100%)",
        "cream-gradient": "linear-gradient(180deg, #F8F4ED 0%, #FAF7F2 100%)",
        "hero-pattern":
          "radial-gradient(ellipse at 20% 50%, rgba(211,178,87,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(211,178,87,0.06) 0%, transparent 60%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

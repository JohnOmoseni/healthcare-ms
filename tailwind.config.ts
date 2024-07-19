import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        input: "var(--input)",
        ring: "var(--ring)",
        border: {
          DEFAULT: "var(--border)",
          100: "var(--border-100)",
        },
        background: {
          DEFAULT: "var(--background)",
          100: "var(--background-100)",
          200: "var(--background-200)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          100: "var(--foreground-100)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          100: "var(--secondary-100)",
        },
        grey: {
          DEFAULT: "var(--grey)",
          100: "var(--grey-100)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        appointments: "url('/images/appointments-bg.png')",
        pending: "url('/images/pending-bg.png')",
        cancelled: "url('/images/cancelled-bg.png')",
      },
      fontFamily: {
        plus_sans: ["Plus Jakarta Sans", "Arial", "sans-serif"],
        raleway: ["Raleway", "Arial", "sans-serif"],
      },
      fontSize: {
        sm: "0.8rem",
        base: ["0.86rem", { lineHeight: "1.4" }],
        subtitle: ["clamp(1.1rem, 3vw, 20px)", { lineHeight: "1.2" }],
        secondaryFont: ["clamp(2rem, 6vw, 32px) ", { lineHeight: "1.2" }],
        primaryFont: ["clamp(2.5rem, 6vw, 48px)", { lineHeight: "1.2" }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.2s ease-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        ".h-dvh": {
          height: "100dvh",
        },
        "clip-circle": {
          "clip-path": "circle()",
        },
        ".transition-sm": {
          transition: "all 0.3s linear",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
} satisfies Config;

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ===== COLORS ===== */
      colors: {
        // Semantic tokens (reference CSS variables)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Direct color access (for specific use cases)
        cyan: {
          DEFAULT: "hsl(var(--color-cyan))",
          dim: "hsl(var(--color-cyan-dim))",
          glow: "hsl(var(--color-cyan-glow))",
        },
        void: "hsl(var(--color-void))",
        slate: "hsl(var(--color-slate))",
      },

      /* ===== TYPOGRAPHY ===== */
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "9xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
      },

      /* ===== SPACING ===== */
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "page": "var(--space-page)",
        "section": "var(--space-section)",
        "block": "var(--space-block)",
      },

      /* ===== BORDER RADIUS ===== */
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },

      /* ===== BOX SHADOW ===== */
      boxShadow: {
        glow: "var(--shadow-glow)",
        "glow-lg": "0 0 40px rgb(0 220 250 / 0.2)",
      },

      /* ===== ANIMATIONS ===== */
      animation: {
        "fade-in": "fade-in 0.5s ease forwards",
        "slide-up": "slide-up 0.6s ease forwards",
        "slide-in-right": "slide-in-right 0.6s ease forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "count-up": "count-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgb(0 220 250 / 0.2)" },
          "50%": { boxShadow: "0 0 40px rgb(0 220 250 / 0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "scale(0.5)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },

      /* ===== TRANSITIONS ===== */
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },

      /* ===== BACKDROP BLUR ===== */
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    // Add tailwindcss-animate if you want more animation utilities
    // require("tailwindcss-animate"),
  ],
};

export default config;

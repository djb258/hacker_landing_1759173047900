/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
        border: "var(--color-border)", /* darker green variant */
        input: "var(--color-input)", /* elevated surface */
        ring: "var(--color-ring)", /* brighter green accent */
        background: "var(--color-background)", /* near-black */
        foreground: "var(--color-foreground)", /* classic terminal green */
        primary: {
          DEFAULT: "var(--color-primary)", /* classic terminal green */
          foreground: "var(--color-primary-foreground)", /* near-black */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* darker green variant */
          foreground: "var(--color-secondary-foreground)", /* near-black */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* bright red with magenta shift */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* muted gray */
          foreground: "var(--color-muted-foreground)", /* blue-shifted green */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* brighter green accent */
          foreground: "var(--color-accent-foreground)", /* near-black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* elevated surface */
          foreground: "var(--color-popover-foreground)", /* classic terminal green */
        },
        card: {
          DEFAULT: "var(--color-card)", /* elevated surface */
          foreground: "var(--color-card-foreground)", /* classic terminal green */
        },
        success: {
          DEFAULT: "var(--color-success)", /* classic terminal green */
          foreground: "var(--color-success-foreground)", /* near-black */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* classic terminal yellow */
          foreground: "var(--color-warning-foreground)", /* near-black */
        },
        error: {
          DEFAULT: "var(--color-error)", /* bright red with magenta shift */
          foreground: "var(--color-error-foreground)", /* white */
        },
        // Matrix-specific colors
        'matrix-rain': "var(--color-matrix-rain)", /* classic terminal green */
        'matrix-glow': "var(--color-matrix-glow)", /* green glow */
        'terminal-cursor': "var(--color-terminal-cursor)", /* brighter green accent */
        'glitch': "var(--color-glitch)", /* bright red with magenta shift */
      },
      fontFamily: {
        mono: ['Source Code Pro', 'monospace'],
        terminal: ['Source Code Pro', 'monospace'],
      },
      fontSize: {
        'terminal-xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'terminal-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.05em' }],
        'terminal-base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.05em' }],
        'terminal-lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.05em' }],
        'terminal-xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100vh)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        "terminal-glow": {
          "0%, 100%": { boxShadow: "0 0 5px var(--color-matrix-glow)" },
          "50%": { boxShadow: "0 0 20px var(--color-matrix-glow), 0 0 30px var(--color-matrix-glow)" },
        },
        "glitch": {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-2px)" },
          "40%": { transform: "translateX(2px)" },
          "60%": { transform: "translateX(-1px)" },
          "80%": { transform: "translateX(1px)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "blink": "blink 1s infinite",
        "matrix-rain": "matrix-rain 3s linear infinite",
        "terminal-glow": "terminal-glow 2s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      boxShadow: {
        'terminal': '0 0 10px var(--color-matrix-glow)',
        'terminal-lg': '0 0 20px var(--color-matrix-glow), 0 0 30px var(--color-matrix-glow)',
        'glow': '0 0 5px currentColor',
        'glow-lg': '0 0 15px currentColor, 0 0 25px currentColor',
      },
      spacing: {
        'terminal': '0.5ch',
        'terminal-lg': '1ch',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
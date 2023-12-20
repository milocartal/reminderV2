import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary:{
          100:"#BBF7D0",
          200:"#A1D4B3",
          300:"#82AB90",
          400:"#63826E",
          500:"#44594B",
          600:"#29362D",
        }
      }
    },
  },
  plugins: [],
} satisfies Config;

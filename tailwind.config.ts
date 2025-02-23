import type { Config } from "tailwindcss";

import daisyui from "daisyui";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui(), // ✅ Corrected Heroui plugin usage
    daisyui, // ✅ Corrected DaisyUI plugin usage
  ],
};

export default config;

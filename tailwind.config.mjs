/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: [daisyui]
}

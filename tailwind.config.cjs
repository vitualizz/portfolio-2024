const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fredoka Variable', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'custom-gray': '#A8A8A8',
        'color-1': '#9CEF5A',
        'color-2': '#F38181',
        'custom-yellow': '#F3D463'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light']
        }
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          'base-100': '#1D1C1A',
          'base-content': '#FFF'
        }
      }
    ]
  }
}

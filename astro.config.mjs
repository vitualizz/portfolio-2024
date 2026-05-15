import { defineConfig } from 'astro/config'
import vercelServerless from '@astrojs/vercel/serverless'
import tailwindcss from '@tailwindcss/vite'

import playformCompress from '@playform/compress'

// https://astro.build/config
export default defineConfig({
  site: 'https://vitualizz.vercel.app',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [playformCompress()],
  output: 'server',
  adapter: vercelServerless({
    maxDuration: 6
  }),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en']
  }
})

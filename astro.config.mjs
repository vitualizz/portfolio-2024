import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercelServerless from '@astrojs/vercel/serverless'

import playformCompress from '@playform/compress'

// https://astro.build/config
export default defineConfig({
  site: 'https://vitualizz.vercel.app',
  integrations: [tailwind(), playformCompress()],
  output: 'server',
  adapter: vercelServerless({
    maxDuration: 6
  }),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en']
  }
})

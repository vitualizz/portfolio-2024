import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

import playformCompress from '@playform/compress'

// https://astro.build/config
export default defineConfig({
  sitre: 'https://vitualizz.vercel.app',
  integrations: [tailwind(), playformCompress()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en']
  }
})


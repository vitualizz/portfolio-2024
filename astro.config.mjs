import { defineConfig } from 'astro/config'
import vercelServerless from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'

import playformCompress from '@playform/compress'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://vitualizz.vercel.app',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US'
        }
      }
    }),
    playformCompress(),
    mdx()
  ],
  output: 'server',
  adapter: vercelServerless({
    maxDuration: 15
  }),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en']
  }
})

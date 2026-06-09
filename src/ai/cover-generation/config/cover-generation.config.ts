// CLI config — uses process.env, NOT import.meta.env (Astro-only)
// This file is loaded by tsx --env-file .env, not by the Astro bundler.
import type { CoverConfig } from '../types.js'

export const defaultConfig: CoverConfig = {
  width: 1200,
  height: 630,
  // gpt-image-1 landscape; Sharp crops to 1200×630. dall-e-3 is deprecated on many accounts.
  generationSize: '1536x1024',
  imageQuality: 'medium',
  quality: 85,
  provider: 'openai',
  model: 'gpt-image-1',
  styleGuide: [
    'Dark background, minimalist, technical aesthetic.',
    'No text, no words, no letters in the image.',
    'No cartoon, no anime, no stock photography, no illustrations.',
    'Professional, abstract, cinematic lighting.',
    'High contrast, moody atmosphere.'
  ].join(' '),
  topicMap: {
    rails:
      'Ruby on Rails — deep crimson gemstone formations, cascading water through carved stone channels, elegant Victorian railway arches, layered geological strata with rich red tones, warm amber and burgundy light.',
    'ai-llm':
      'AI / LLM — cosmic nebulae and star clusters, bioluminescent deep-sea organisms, aurora borealis curtains, abstract fluid dynamics with flowing color gradients, crystalline lattice structures viewed from within.',
    'aws-devops':
      'AWS / DevOps — aerial cityscape at night with light trails, intricate mechanical clock gears macro photography, industrial pipe and valve networks, atmospheric cloud formations from above, monumental bridge infrastructure.',
    general:
      'Software engineering — abstract geometric forms with layered depth, architectural interior spaces with dramatic lighting, prism light diffraction on dark surfaces, mathematical spiral and fractal patterns, blueprint line art.'
  }
}

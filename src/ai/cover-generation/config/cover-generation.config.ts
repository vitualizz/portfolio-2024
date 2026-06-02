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
    'rails': 'Ruby on Rails — red gemstones, railway tracks, server racks, database schemas, elegant code.',
    'ai-llm': 'AI / LLM — neural network nodes, glowing circuits, data streams, language models, digital synapses.',
    'aws-devops': 'AWS / DevOps — cloud infrastructure, server clusters, deployment pipelines, network diagrams, containers.',
    'general': 'Software engineering — abstract code structures, glowing terminals, digital architecture, clean technology.'
  }
}

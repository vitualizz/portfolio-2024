import { describe, it, expect } from 'vitest'
import { getProvider } from '../providers/index.js'
import { OpenAIImageProvider } from '../providers/openai.provider.js'
import type { CoverConfig } from '../types.js'

const baseConfig: CoverConfig = {
  width: 1200,
  height: 630,
  generationSize: '1536x1024',
  imageQuality: 'medium',
  quality: 85,
  provider: 'openai',
  model: 'gpt-image-1',
  styleGuide: 'Dark, minimalist.',
  topicMap: {
    rails: 'Rails visual.',
    'ai-llm': 'AI visual.',
    'aws-devops': 'AWS visual.',
    general: 'General visual.'
  }
}

describe('getProvider', () => {
  it('returns OpenAIImageProvider for provider: openai', () => {
    const provider = getProvider(baseConfig)
    expect(provider).toBeInstanceOf(OpenAIImageProvider)
  })

  it('throws a descriptive error for unknown provider', () => {
    const badConfig = { ...baseConfig, provider: 'unknown' as 'openai' }
    expect(() => getProvider(badConfig)).toThrow('Unknown image provider')
    expect(() => getProvider(badConfig)).toThrow('unknown')
  })
})

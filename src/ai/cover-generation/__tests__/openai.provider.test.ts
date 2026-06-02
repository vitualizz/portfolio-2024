import { describe, it, expect, vi, beforeEach } from 'vitest'
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
    rails: 'Rails.',
    'ai-llm': 'AI.',
    'aws-devops': 'AWS.',
    general: 'General.'
  }
}

describe('OpenAIImageProvider', () => {
  beforeEach(() => {
    vi.stubEnv('OPENAI_API_KEY', 'test-key')
    global.fetch = vi.fn()
  })

  it('calls OpenAI Images API without response_format for gpt-image models', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        data: [{ b64_json: 'abc123' }]
      })
    } as unknown as Response)

    const provider = new OpenAIImageProvider()
    const result = await provider.generate('A dark technical cover', baseConfig)

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/images/generations',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt: 'A dark technical cover',
          n: 1,
          size: '1536x1024',
          quality: 'medium'
        })
      })
    )
    expect(result).toEqual({ kind: 'base64', data: 'abc123' })
  })

  it('returns url when API responds with url (dall-e models)', async () => {
    const dalleConfig: CoverConfig = { ...baseConfig, model: 'dall-e-3', generationSize: '1792x1024' }

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        data: [{ url: 'https://example.com/image.png' }]
      })
    } as unknown as Response)

    const provider = new OpenAIImageProvider()
    const result = await provider.generate('prompt', dalleConfig)

    const body = JSON.parse(vi.mocked(global.fetch).mock.calls[0][1]?.body as string)
    expect(body).not.toHaveProperty('response_format')
    expect(body).not.toHaveProperty('quality')
    expect(result).toEqual({ kind: 'url', data: 'https://example.com/image.png' })
  })

  it('throws with API error body on non-OK response', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 400,
      text: vi.fn().mockResolvedValue('{"error":{"message":"bad request"}}')
    } as unknown as Response)

    const provider = new OpenAIImageProvider()
    await expect(provider.generate('prompt', baseConfig)).rejects.toThrow('OpenAI image generation failed (400)')
  })
})

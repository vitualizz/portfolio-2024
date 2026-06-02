import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('ai', () => ({
  generateText: vi.fn()
}))

vi.mock('@ai-sdk/openai', () => ({
  createOpenAI: vi.fn(() => {
    const modelFn = vi.fn(() => 'mock-model')
    return modelFn
  })
}))

import { generateText } from 'ai'
import { buildCoverPrompt } from '../prompt-builders/cover-prompt-builder.js'
import type { ContentAnalysis, CoverConfig } from '../types.js'

const mockGenerateText = vi.mocked(generateText)

const baseAnalysis: ContentAnalysis = {
  slug: 'test-post',
  title: 'Test Post',
  shortDescription: 'A test post',
  longDescription: 'A longer description of the test post',
  tags: ['TypeScript', 'Backend'],
  concepts: ['Architecture', 'Patterns'],
  primaryTopic: 'general'
}

const baseConfig: CoverConfig = {
  width: 1200,
  height: 630,
  generationSize: '1536x1024',
  imageQuality: 'medium',
  quality: 85,
  provider: 'openai',
  model: 'gpt-image-1',
  styleGuide: 'Dark background, minimalist, technical. No text. No cartoon.',
  topicMap: {
    rails: 'Ruby on Rails — railway tracks, gemstones.',
    'ai-llm': 'AI/LLM — neural networks, glowing circuits.',
    'aws-devops': 'AWS/DevOps — cloud infrastructure, containers.',
    general: 'Software engineering — abstract code structures.'
  }
}

describe('buildCoverPrompt', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('injects the style guide into the user message', async () => {
    mockGenerateText.mockResolvedValue({
      text: 'A dark minimalist image'
    } as ReturnType<typeof generateText> extends Promise<infer T> ? T : never)

    await buildCoverPrompt(baseAnalysis, baseConfig)

    const callArgs = mockGenerateText.mock.calls[0][0]
    const messages = callArgs.messages as { role: string; content: string }[]
    const userContent = messages[0].content
    expect(userContent).toContain(baseConfig.styleGuide)
  })

  it('system prompt forbids text in image', async () => {
    mockGenerateText.mockResolvedValue({
      text: 'Dark neural network image'
    } as ReturnType<typeof generateText> extends Promise<infer T> ? T : never)

    await buildCoverPrompt(baseAnalysis, baseConfig)

    const callArgs = mockGenerateText.mock.calls[0][0]
    const system = callArgs.system as string
    expect(system).toContain('NO text')
    expect(system).toContain('NO cartoon')
    expect(system).toContain('anime')
    expect(system).toContain('NO stock photography')
  })

  it('applies AI/LLM topic cues for AI-tagged post', async () => {
    mockGenerateText.mockResolvedValue({
      text: 'Neural network glow'
    } as ReturnType<typeof generateText> extends Promise<infer T> ? T : never)

    const aiAnalysis: ContentAnalysis = {
      ...baseAnalysis,
      tags: ['AI', 'LLM', 'agents'],
      primaryTopic: 'ai-llm'
    }

    await buildCoverPrompt(aiAnalysis, baseConfig)

    const callArgs = mockGenerateText.mock.calls[0][0]
    const messages = callArgs.messages as { role: string; content: string }[]
    const userContent = messages[0].content
    expect(userContent).toContain('ai-llm')
    expect(userContent).toContain('neural networks')
  })

  it('applies Rails topic cues for Rails-tagged post', async () => {
    mockGenerateText.mockResolvedValue({
      text: 'Railway tracks and rubies'
    } as ReturnType<typeof generateText> extends Promise<infer T> ? T : never)

    const railsAnalysis: ContentAnalysis = {
      ...baseAnalysis,
      tags: ['Rails', 'Ruby'],
      primaryTopic: 'rails'
    }

    await buildCoverPrompt(railsAnalysis, baseConfig)

    const callArgs = mockGenerateText.mock.calls[0][0]
    const messages = callArgs.messages as { role: string; content: string }[]
    const userContent = messages[0].content
    expect(userContent).toContain('rails')
    expect(userContent).toContain('railway tracks')
  })

  it('returns PromptResult with trimmed prompt and topic', async () => {
    mockGenerateText.mockResolvedValue({
      text: '  Dark image prompt  '
    } as ReturnType<typeof generateText> extends Promise<infer T> ? T : never)

    const result = await buildCoverPrompt(baseAnalysis, baseConfig)
    expect(result.prompt).toBe('Dark image prompt')
    expect(result.topic).toBe('general')
  })
})

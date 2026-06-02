import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock all pipeline dependencies before importing the CLI
vi.mock('../analyzers/content-analyzer.js', () => ({
  analyzeContent: vi.fn()
}))

vi.mock('../prompt-builders/cover-prompt-builder.js', () => ({
  buildCoverPrompt: vi.fn()
}))

vi.mock('../providers/index.js', () => ({
  getProvider: vi.fn(() => ({
    generate: vi.fn()
  }))
}))

vi.mock('../processors/image-processor.js', () => ({
  processImage: vi.fn()
}))

vi.mock('../config/cover-generation.config.js', () => ({
  defaultConfig: {
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
}))

vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn()
  }
}))

vi.mock('node:path', async (importOriginal) => {
  const original = await importOriginal<typeof import('node:path')>()
  return {
    default: {
      ...original,
      resolve: (_cwd: string, ..._parts: string[]) => '/fake/blog',
      join: (...parts: string[]) => parts.join('/')
    }
  }
})

import fs from 'node:fs'
import { main } from '../../../scripts/generate-blog-cover.js'
import { analyzeContent } from '../analyzers/content-analyzer.js'
import { buildCoverPrompt } from '../prompt-builders/cover-prompt-builder.js'
import { getProvider } from '../providers/index.js'
import { processImage } from '../processors/image-processor.js'

const mockExistsSync = vi.mocked(fs.existsSync)
const mockAnalyze = vi.mocked(analyzeContent)
const mockBuildPrompt = vi.mocked(buildCoverPrompt)
const mockGetProvider = vi.mocked(getProvider)
const mockProcessImage = vi.mocked(processImage)

function makeExitSpy() {
  return vi.spyOn(process, 'exit').mockImplementation((_code?: string | number | null | undefined) => {
    throw new Error(`process.exit(${_code})`)
  })
}

describe('CLI guard — overwrite protection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.OPENAI_API_KEY = 'test-key'
  })

  it('refuses overwrite without --force when cover.webp exists', async () => {
    const exitSpy = makeExitSpy()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Slug dir exists, cover.webp exists
    mockExistsSync.mockImplementation((p: string | URL | Buffer) => {
      const str = String(p)
      return str.includes('my-slug') && !str.includes('cover.webp')
        ? true
        : str.includes('cover.webp')
    })

    await expect(main(['node', 'generate-blog-cover.ts', 'my-slug'])).rejects.toThrow('process.exit(1)')
    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('--force'))

    exitSpy.mockRestore()
    consoleSpy.mockRestore()
  })

  it('proceeds with --force when cover.webp exists', async () => {
    // Slug dir exists, cover.webp exists — but --force is passed
    mockExistsSync.mockReturnValue(true)

    mockAnalyze.mockReturnValue({
      slug: 'my-slug',
      title: 'Test',
      shortDescription: 'desc',
      longDescription: 'long desc',
      tags: ['TypeScript'],
      concepts: [],
      primaryTopic: 'general'
    })
    mockBuildPrompt.mockResolvedValue({ prompt: 'A dark image', topic: 'general' })
    const mockGenerate = vi.fn().mockResolvedValue({ kind: 'base64' as const, data: 'abc' })
    mockGetProvider.mockReturnValue({ generate: mockGenerate })
    mockProcessImage.mockResolvedValue('/fake/blog/my-slug/cover.webp')

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await expect(main(['node', 'generate-blog-cover.ts', 'my-slug', '--force'])).resolves.toBeUndefined()

    consoleSpy.mockRestore()
  })
})

describe('CLI guard — --preview stub', () => {
  it('exits 0 with "not yet implemented" message for --preview', async () => {
    const exitSpy = makeExitSpy()
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await expect(main(['node', 'generate-blog-cover.ts', 'any-slug', '--preview'])).rejects.toThrow('process.exit(0)')
    expect(exitSpy).toHaveBeenCalledWith(0)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('not yet implemented'))

    exitSpy.mockRestore()
    consoleSpy.mockRestore()
  })
})

describe('CLI guard — --variants stub', () => {
  it('exits 0 with "not yet implemented" message for --variants', async () => {
    const exitSpy = makeExitSpy()
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await expect(main(['node', 'generate-blog-cover.ts', 'any-slug', '--variants=3'])).rejects.toThrow('process.exit(0)')
    expect(exitSpy).toHaveBeenCalledWith(0)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('not yet implemented'))

    exitSpy.mockRestore()
    consoleSpy.mockRestore()
  })
})

describe('CLI guard — missing slug', () => {
  it('exits 1 with usage message when no slug provided', async () => {
    const exitSpy = makeExitSpy()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await expect(main(['node', 'generate-blog-cover.ts'])).rejects.toThrow('process.exit(1)')
    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Usage'))

    exitSpy.mockRestore()
    consoleSpy.mockRestore()
  })
})

describe('CLI guard — CliFlags parsing', () => {
  it('parses --force flag correctly (no error when cover does not exist)', async () => {
    // No cover.webp — should proceed to pipeline
    mockExistsSync.mockImplementation((p: string | URL | Buffer) => {
      return !String(p).includes('cover.webp')
    })

    mockAnalyze.mockReturnValue({
      slug: 'my-slug',
      title: 'Test',
      shortDescription: 'desc',
      longDescription: 'long desc',
      tags: ['TypeScript'],
      concepts: [],
      primaryTopic: 'general'
    })
    mockBuildPrompt.mockResolvedValue({ prompt: 'A dark image', topic: 'general' })
    const mockGenerate = vi.fn().mockResolvedValue({ kind: 'base64' as const, data: 'abc' })
    mockGetProvider.mockReturnValue({ generate: mockGenerate })
    mockProcessImage.mockResolvedValue('/fake/blog/my-slug/cover.webp')

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await expect(main(['node', 'generate-blog-cover.ts', 'my-slug', '--force'])).resolves.toBeUndefined()

    consoleSpy.mockRestore()
  })

  it('exits 1 when OPENAI_API_KEY is missing', async () => {
    const exitSpy = makeExitSpy()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    delete process.env.OPENAI_API_KEY

    mockExistsSync.mockImplementation((p: string | URL | Buffer) => !String(p).includes('cover.webp'))

    await expect(main(['node', 'generate-blog-cover.ts', 'my-slug'])).rejects.toThrow('process.exit(1)')
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('OPENAI_API_KEY'))

    exitSpy.mockRestore()
    consoleSpy.mockRestore()
  })
})

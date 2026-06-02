import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock sharp before importing the module under test
const mockWebp = vi.fn().mockReturnThis()
const mockToFile = vi.fn().mockResolvedValue(undefined)
const mockResize = vi.fn().mockReturnThis()
const mockSharpInstance = {
  resize: mockResize,
  webp: mockWebp,
  toFile: mockToFile
}

vi.mock('sharp', () => ({
  default: vi.fn(() => mockSharpInstance)
}))

vi.mock('node:path', async (importOriginal) => {
  const original = await importOriginal<typeof import('node:path')>()
  return {
    default: {
      ...original,
      resolve: () => '/fake',
      join: (...parts: string[]) => parts.join('/')
    }
  }
})

global.fetch = vi.fn()

import sharp from 'sharp'
import { processImage } from '../processors/image-processor.js'
import type { CoverConfig, ImageResult } from '../types.js'

const mockSharp = vi.mocked(sharp)
const mockFetch = vi.mocked(global.fetch)

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

describe('processImage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockResize.mockReturnThis()
    mockWebp.mockReturnThis()
    mockToFile.mockResolvedValue(undefined)
    mockSharp.mockReturnValue(mockSharpInstance as ReturnType<typeof sharp>)
  })

  it('calls sharp with correct resize dimensions and fit:cover', async () => {
    const imageResult: ImageResult = {
      kind: 'base64',
      data: Buffer.from('fake-image-data').toString('base64')
    }

    await processImage(imageResult, 'test-slug', baseConfig)

    expect(mockResize).toHaveBeenCalledWith(1200, 630, { fit: 'cover' })
  })

  it('calls webp with correct quality', async () => {
    const imageResult: ImageResult = {
      kind: 'base64',
      data: Buffer.from('fake-image-data').toString('base64')
    }

    await processImage(imageResult, 'test-slug', baseConfig)

    expect(mockWebp).toHaveBeenCalledWith({ quality: 85 })
  })

  it('calls resize before webp before toFile (correct order)', async () => {
    const imageResult: ImageResult = {
      kind: 'base64',
      data: Buffer.from('fake-image-data').toString('base64')
    }

    await processImage(imageResult, 'test-slug', baseConfig)

    const resizeOrder = mockResize.mock.invocationCallOrder[0]
    const webpOrder = mockWebp.mock.invocationCallOrder[0]
    const toFileOrder = mockToFile.mock.invocationCallOrder[0]

    expect(resizeOrder).toBeLessThan(webpOrder)
    expect(webpOrder).toBeLessThan(toFileOrder)
  })

  it('handles base64 image result without fetching', async () => {
    const imageResult: ImageResult = {
      kind: 'base64',
      data: Buffer.from('fake-data').toString('base64')
    }

    await processImage(imageResult, 'test-slug', baseConfig)

    expect(mockFetch).not.toHaveBeenCalled()
    expect(mockSharp).toHaveBeenCalled()
  })

  it('fetches URL when image result kind is url', async () => {
    const fakeBuffer = new ArrayBuffer(8)
    mockFetch.mockResolvedValue({
      ok: true,
      arrayBuffer: vi.fn().mockResolvedValue(fakeBuffer)
    } as unknown as Response)

    const imageResult: ImageResult = {
      kind: 'url',
      data: 'https://example.com/image.png'
    }

    await processImage(imageResult, 'test-slug', baseConfig)

    expect(mockFetch).toHaveBeenCalledWith('https://example.com/image.png')
    expect(mockSharp).toHaveBeenCalled()
  })

  it('throws on failed URL fetch', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    } as Response)

    const imageResult: ImageResult = {
      kind: 'url',
      data: 'https://example.com/bad.png'
    }

    await expect(
      processImage(imageResult, 'test-slug', baseConfig)
    ).rejects.toThrow('Failed to fetch image')
  })

  it('writes to correct output path', async () => {
    const imageResult: ImageResult = {
      kind: 'base64',
      data: Buffer.from('x').toString('base64')
    }

    const outputPath = await processImage(imageResult, 'my-slug', baseConfig)

    expect(outputPath).toContain('my-slug')
    expect(outputPath).toContain('cover.webp')
  })
})

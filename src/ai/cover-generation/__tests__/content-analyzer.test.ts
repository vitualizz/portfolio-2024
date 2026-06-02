import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('node:fs', () => {
  const ES_MDX = `---
title: 'Guía de Rails'
shortDescription: 'Una guía completa de Ruby on Rails'
longDescription: 'Aprende Rails desde cero con ejemplos prácticos y buenas prácticas.'
tags: ['Rails', 'Ruby', 'Backend']
lang: 'es'
---

# Introducción

## Arquitectura MVC

## ActiveRecord

`

  const EN_MDX = `---
title: 'Rails Guide'
shortDescription: 'A complete Ruby on Rails guide'
longDescription: 'Learn Rails from scratch with practical examples and best practices.'
tags: ['Rails', 'Ruby', 'Backend', 'TypeScript']
lang: 'en'
---

# Introduction

## MVC Architecture

## ActiveRecord Basics

`

  const existsSyncMap: Record<string, boolean> = {
    '/fake/blog/valid-slug': true,
    '/fake/blog/valid-slug/es.mdx': true,
    '/fake/blog/valid-slug/en.mdx': true,
    '/fake/blog/missing-en': true,
    '/fake/blog/missing-en/es.mdx': true,
    '/fake/blog/missing-en/en.mdx': false
  }

  const readFileSyncMap: Record<string, string> = {
    '/fake/blog/valid-slug/es.mdx': ES_MDX,
    '/fake/blog/valid-slug/en.mdx': EN_MDX,
    '/fake/blog/missing-en/es.mdx': ES_MDX
  }

  return {
    default: {
      existsSync: (p: string) => existsSyncMap[p] ?? false,
      readFileSync: (p: string) => {
        if (readFileSyncMap[p]) return readFileSyncMap[p]
        throw new Error(`File not found: ${p}`)
      }
    }
  }
})

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

import { analyzeContent } from '../analyzers/content-analyzer.js'

describe('analyzeContent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns ContentAnalysis with all fields for a valid bilingual post', () => {
    const result = analyzeContent('valid-slug')
    expect(result.slug).toBe('valid-slug')
    expect(result.title).toBeTruthy()
    expect(result.shortDescription).toBeTruthy()
    expect(result.longDescription).toBeTruthy()
    expect(result.tags.length).toBeGreaterThan(0)
    expect(result.tags).toContain('Rails')
    expect(result.primaryTopic).toBe('rails')
  })

  it('extracts h2 concepts from post body', () => {
    const result = analyzeContent('valid-slug')
    expect(result.concepts.length).toBeGreaterThan(0)
  })

  it('deduplicates tags across both language files', () => {
    const result = analyzeContent('valid-slug')
    const railsCount = result.tags.filter((t) => t === 'Rails').length
    expect(railsCount).toBe(1)
  })

  it('includes tags from both language files', () => {
    const result = analyzeContent('valid-slug')
    expect(result.tags).toContain('TypeScript')
  })

  it('exits non-zero on missing en.mdx', () => {
    const exitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation((_code?: string | number | null | undefined) => {
        throw new Error('process.exit')
      })
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => analyzeContent('missing-en')).toThrow('process.exit')
    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Missing file')
    )

    exitSpy.mockRestore()
    consoleSpy.mockRestore()
  })

  it('exits non-zero for unknown slug', () => {
    const exitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation((_code?: string | number | null | undefined) => {
        throw new Error('process.exit')
      })
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => analyzeContent('no-such-slug')).toThrow('process.exit')
    expect(exitSpy).toHaveBeenCalledWith(1)

    exitSpy.mockRestore()
    consoleSpy.mockRestore()
  })
})

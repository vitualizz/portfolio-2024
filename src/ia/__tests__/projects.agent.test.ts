import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../lib/server/ai', () => ({
  generateDomainAnswer: vi.fn()
}))

vi.mock('../tools/loaders', () => ({
  loadProjects: vi.fn(() => [
    {
      title: 'Portfolio 2024',
      description_es: 'Mi portfolio personal.',
      description_en: 'My personal portfolio.',
      image: 'portfolio.png',
      stack: [{ icon: 'astro', tooltip: 'Astro' }],
      demo: 'https://lee.dev',
      githubUrl: 'https://github.com/lee/portfolio'
    }
  ])
}))

import { projectsAgent } from '../agents/projects.agent'
import { generateDomainAnswer } from '../../lib/server/ai'

const mockGenerate = generateDomainAnswer as ReturnType<typeof vi.fn>

beforeEach(() => {
  mockGenerate.mockReset()
})

describe('projectsAgent', () => {
  it('returns DomainAnswer with content on success', async () => {
    mockGenerate.mockResolvedValue('Lee built Portfolio 2024 using Astro.')
    const result = await projectsAgent.answer('what has Lee built?', [], 'en')
    expect(result.hasContent).toBe(true)
    expect(result.content).toContain('Portfolio 2024')
    expect(result.domain).toBe('projects')
    expect(result.sourceLabel).toBe('projects.json')
  })

  it('returns hasContent: false when generateDomainAnswer throws', async () => {
    mockGenerate.mockRejectedValue(new Error('API error'))
    const result = await projectsAgent.answer('what has Lee built?', [], 'en')
    expect(result.hasContent).toBe(false)
  })

  it('passes formatted project data to generateDomainAnswer', async () => {
    mockGenerate.mockResolvedValue('Lee built Portfolio 2024.')
    await projectsAgent.answer('show me projects', [], 'es')
    expect(mockGenerate).toHaveBeenCalledOnce()
    const [system] = mockGenerate.mock.calls[0]
    expect(system).toContain('Portfolio 2024')
    expect(system).toContain('Astro')
  })
})

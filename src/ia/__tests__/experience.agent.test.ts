import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../lib/server/ai', () => ({
  generateDomainAnswer: vi.fn()
}))

vi.mock('../tools/loaders', () => ({
  loadExperience: vi.fn(() => [
    {
      company: 'Sperant',
      role: 'Backend Engineer',
      period: { start: '2020-01', end: '2022-05' },
      description_es: 'Backend en Rails.',
      description_en: 'Backend in Rails.',
      tech: ['Ruby on Rails', 'PostgreSQL']
    }
  ])
}))

import { experienceAgent } from '../agents/experience.agent'
import { generateDomainAnswer } from '../../lib/server/ai'

const mockGenerate = generateDomainAnswer as ReturnType<typeof vi.fn>

beforeEach(() => {
  mockGenerate.mockReset()
})

describe('experienceAgent', () => {
  it('returns DomainAnswer with content on success', async () => {
    mockGenerate.mockResolvedValue(
      'Lee worked at Sperant as a Backend Engineer.'
    )
    const result = await experienceAgent.answer('where did Lee work?', [], 'en')
    expect(result.hasContent).toBe(true)
    expect(result.content).toContain('Sperant')
    expect(result.domain).toBe('experience')
    expect(result.sourceLabel).toBe('experience.json')
  })

  it('returns hasContent: false when generateDomainAnswer throws', async () => {
    mockGenerate.mockRejectedValue(new Error('API error'))
    const result = await experienceAgent.answer('where did Lee work?', [], 'en')
    expect(result.hasContent).toBe(false)
  })

  it('passes formatted experience data to generateDomainAnswer', async () => {
    mockGenerate.mockResolvedValue('Lee worked at Sperant.')
    await experienceAgent.answer('what did Lee do?', [], 'es')
    expect(mockGenerate).toHaveBeenCalledOnce()
    const [system] = mockGenerate.mock.calls[0]
    expect(system).toContain('Sperant')
    expect(system).toContain('Backend Engineer')
  })
})

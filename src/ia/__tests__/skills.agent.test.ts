import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../lib/server/ai', () => ({
  generateDomainAnswer: vi.fn()
}))

vi.mock('../tools/loaders', () => ({
  loadSkills: vi.fn(() => [
    {
      label: 'Backend · donde vivo',
      items: [{ label: 'Ruby on Rails' }, { label: 'PostgreSQL' }]
    }
  ])
}))

import { skillsAgent } from '../agents/skills.agent'
import { generateDomainAnswer } from '../../lib/server/ai'

const mockGenerate = generateDomainAnswer as ReturnType<typeof vi.fn>

beforeEach(() => {
  mockGenerate.mockReset()
})

describe('skillsAgent', () => {
  it('returns DomainAnswer with content on success', async () => {
    mockGenerate.mockResolvedValue(
      'Lee is proficient in Ruby on Rails and PostgreSQL.'
    )
    const result = await skillsAgent.answer('what is Lee tech stack?', [], 'en')
    expect(result.hasContent).toBe(true)
    expect(result.content).toContain('Ruby on Rails')
    expect(result.domain).toBe('skills')
    expect(result.sourceLabel).toBe('skills.ts')
  })

  it('returns hasContent: false when generateDomainAnswer throws', async () => {
    mockGenerate.mockRejectedValue(new Error('API error'))
    const result = await skillsAgent.answer('what can Lee do?', [], 'en')
    expect(result.hasContent).toBe(false)
  })

  it('passes formatted skills data to generateDomainAnswer', async () => {
    mockGenerate.mockResolvedValue('Lee knows Ruby on Rails.')
    await skillsAgent.answer('tech stack?', [], 'es')
    expect(mockGenerate).toHaveBeenCalledOnce()
    const [system] = mockGenerate.mock.calls[0]
    expect(system).toContain('Backend · donde vivo')
    expect(system).toContain('Ruby on Rails')
  })
})

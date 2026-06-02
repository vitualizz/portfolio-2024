import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../router/intent-router', () => ({
  intentRouter: { route: vi.fn() }
}))

vi.mock('../../lib/server/ai', () => ({
  streamAskAnswer: vi.fn(),
  generateDomainAnswer: vi.fn()
}))

vi.mock('../agents/experience.agent', () => ({
  experienceAgent: {
    domain: 'experience',
    sourceLabel: 'experience.json',
    answer: vi.fn()
  }
}))

vi.mock('../agents/projects.agent', () => ({
  projectsAgent: {
    domain: 'projects',
    sourceLabel: 'projects.json',
    answer: vi.fn()
  }
}))

vi.mock('../agents/skills.agent', () => ({
  skillsAgent: {
    domain: 'skills',
    sourceLabel: 'skills.ts',
    answer: vi.fn()
  }
}))

vi.mock('../agents/blog.agent', () => ({
  blogAgent: {
    domain: 'blog',
    sourceLabel: 'blog posts',
    answer: vi.fn()
  }
}))

import { askLeeOrchestrator } from '../orchestrator/ask-lee.orchestrator'
import { intentRouter } from '../router/intent-router'
import { streamAskAnswer } from '../../lib/server/ai'
import { experienceAgent } from '../agents/experience.agent'

const mockRoute = intentRouter.route as ReturnType<typeof vi.fn>
const mockStream = streamAskAnswer as ReturnType<typeof vi.fn>
const mockExpAgent = experienceAgent.answer as ReturnType<typeof vi.fn>

const makeFakeStream = () =>
  ({
    textStream: (async function* () {
      yield 'test'
    })()
  }) as unknown as ReturnType<typeof streamAskAnswer>

beforeEach(() => {
  mockRoute.mockReset()
  mockStream.mockReset()
  mockExpAgent.mockReset()
  mockStream.mockReturnValue(makeFakeStream())
})

describe('askLeeOrchestrator', () => {
  it('direct mode skips all agents', async () => {
    mockRoute.mockResolvedValue({ mode: 'direct', toolKeys: [] })
    const req = { messages: [{ role: 'user' as const, content: 'Hola!' }] }
    const res = await askLeeOrchestrator(req)
    expect(mockExpAgent).not.toHaveBeenCalled()
    expect(res.meta.sources).toEqual([])
    expect(res.meta.confidence).toBe('high')
  })

  it('retrieve mode runs selected agents in parallel', async () => {
    mockRoute.mockResolvedValue({ mode: 'retrieve', toolKeys: ['experience'] })
    mockExpAgent.mockResolvedValue({
      domain: 'experience',
      sourceLabel: 'experience.json',
      content: 'Lee worked at Sperant.',
      hasContent: true
    })
    const req = { messages: [{ role: 'user' as const, content: 'where did Lee work?' }] }
    const res = await askLeeOrchestrator(req)
    expect(mockExpAgent).toHaveBeenCalledOnce()
    expect(res.meta.sources).toContain('experience.json')
  })

  it('no content from agents returns confidence: low', async () => {
    mockRoute.mockResolvedValue({ mode: 'retrieve', toolKeys: ['experience'] })
    mockExpAgent.mockResolvedValue({
      domain: 'experience',
      sourceLabel: 'experience.json',
      content: '',
      hasContent: false
    })
    const req = { messages: [{ role: 'user' as const, content: 'test' }] }
    const res = await askLeeOrchestrator(req)
    expect(res.meta.confidence).toBe('low')
  })

  it('single active agent streams directly without synthesis call', async () => {
    mockRoute.mockResolvedValue({ mode: 'retrieve', toolKeys: ['experience'] })
    mockExpAgent.mockResolvedValue({
      domain: 'experience',
      sourceLabel: 'experience.json',
      content: 'Lee worked at Sperant.',
      hasContent: true
    })
    const req = { messages: [{ role: 'user' as const, content: 'career?' }] }
    await askLeeOrchestrator(req)
    // streamAskAnswer should be called exactly once (direct stream, no synthesis)
    expect(mockStream).toHaveBeenCalledOnce()
  })
})

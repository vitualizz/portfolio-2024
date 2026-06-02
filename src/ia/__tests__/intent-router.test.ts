import { describe, it, expect, vi, beforeEach } from 'vitest'
import { intentRouter } from '../router/intent-router'

vi.mock('../../lib/server/ai', () => ({
  generateRouterDecision: vi.fn()
}))

import { generateRouterDecision } from '../../lib/server/ai'

const mockGenerateRouterDecision = vi.mocked(generateRouterDecision)

describe('intentRouter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('(1) single tool — retrieve projects', async () => {
    mockGenerateRouterDecision.mockResolvedValue('{"mode":"retrieve","toolKeys":["projects"]}')
    const decision = await intentRouter.route('What projects has Lee built?')
    expect(decision.mode).toBe('retrieve')
    expect(decision.toolKeys).toEqual(['projects'])
  })

  it('(2) multi-tool — retrieve skills and projects', async () => {
    mockGenerateRouterDecision.mockResolvedValue('{"mode":"retrieve","toolKeys":["skills","projects"]}')
    const decision = await intentRouter.route("Tell me about Lee's skills and projects")
    expect(decision.mode).toBe('retrieve')
    expect(decision.toolKeys).toContain('skills')
    expect(decision.toolKeys).toContain('projects')
    expect(decision.toolKeys).toHaveLength(2)
  })

  it('(3) direct mode — greeting returns mode:direct with empty toolKeys', async () => {
    mockGenerateRouterDecision.mockResolvedValue('{"mode":"direct","toolKeys":[]}')
    const decision = await intentRouter.route('Hola!')
    expect(decision.mode).toBe('direct')
    expect(decision.toolKeys).toHaveLength(0)
  })

  it('(4) malformed JSON → SAFE_FALLBACK (retrieve all 4)', async () => {
    mockGenerateRouterDecision.mockResolvedValue('not json at all')
    const decision = await intentRouter.route('some question')
    expect(decision.mode).toBe('retrieve')
    expect(decision.toolKeys).toContain('experience')
    expect(decision.toolKeys).toContain('projects')
    expect(decision.toolKeys).toContain('skills')
    expect(decision.toolKeys).toContain('blog')
  })

  it('(5) invalid mode value → SAFE_FALLBACK', async () => {
    mockGenerateRouterDecision.mockResolvedValue('{"mode":"weird","toolKeys":["projects"]}')
    const decision = await intentRouter.route('some question')
    expect(decision.mode).toBe('retrieve')
    expect(decision.toolKeys).toHaveLength(4)
  })

  it('(6) retrieve with empty toolKeys → SAFE_FALLBACK', async () => {
    mockGenerateRouterDecision.mockResolvedValue('{"mode":"retrieve","toolKeys":[]}')
    const decision = await intentRouter.route('some question')
    expect(decision.mode).toBe('retrieve')
    expect(decision.toolKeys).toHaveLength(4)
  })

  it('(7) fenced JSON is stripped and parsed correctly', async () => {
    mockGenerateRouterDecision.mockResolvedValue('```json\n{"mode":"retrieve","toolKeys":["blog"]}\n```')
    const decision = await intentRouter.route('any articles?')
    expect(decision.mode).toBe('retrieve')
    expect(decision.toolKeys).toEqual(['blog'])
  })

  it('(8) empty input string → SAFE_FALLBACK without calling LLM', async () => {
    const decision = await intentRouter.route('')
    expect(mockGenerateRouterDecision).not.toHaveBeenCalled()
    expect(decision.mode).toBe('retrieve')
    expect(decision.toolKeys).toHaveLength(4)
  })

  it('(9) generateRouterDecision throws → SAFE_FALLBACK', async () => {
    mockGenerateRouterDecision.mockRejectedValue(new Error('Network error'))
    const decision = await intentRouter.route('some question')
    expect(decision.mode).toBe('retrieve')
    expect(decision.toolKeys).toHaveLength(4)
  })

  it('(10) github key is filtered out from toolKeys', async () => {
    mockGenerateRouterDecision.mockResolvedValue('{"mode":"retrieve","toolKeys":["projects","github"]}')
    const decision = await intentRouter.route('projects and github repos')
    expect(decision.mode).toBe('retrieve')
    expect(decision.toolKeys).toContain('projects')
    expect(decision.toolKeys).not.toContain('github')
  })
})

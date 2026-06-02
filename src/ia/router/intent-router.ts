import type { ToolKey } from '../tools/types'
import type { RouterDecision, RouterMode } from '../types'
import { generateRouterDecision } from '../../lib/server/ai'

const ALL_RETRIEVE_KEYS: ToolKey[] = ['experience', 'projects', 'skills', 'blog']
const VALID_KEYS = new Set<ToolKey>(ALL_RETRIEVE_KEYS)

const SAFE_FALLBACK: RouterDecision = { mode: 'retrieve', toolKeys: ALL_RETRIEVE_KEYS }

const ROUTER_PROMPT = `You are an intent router for a portfolio assistant about Lee Palacios.
Decide whether the user message needs data retrieval and which tools to use.

Tools (domains):
- experience: Lee's work history, jobs, companies, roles, career timeline.
- projects: products/apps Lee built, portfolio work, what he shipped.
- skills: technologies, stack, languages, frameworks, tools Lee knows.
- blog: articles/posts Lee wrote.

Rules:
- If the message is a greeting, small talk, thanks, a compliment, meta ("who are you"), or anything that does NOT need Lee's data, return mode "direct" with an empty toolKeys array.
- Otherwise return mode "retrieve" with ONLY the relevant tool keys.
- If retrieval is needed but the topic is broad/ambiguous ("tell me about Lee"), include all four: experience, projects, skills, blog.
- Never include "github".
- Decide based on MEANING in ANY language (Spanish, English, French, etc.). Do not rely on exact keywords.

Respond with ONE line of strict JSON, no markdown, no explanation:
{"mode":"direct"|"retrieve","toolKeys":["experience","projects","skills","blog"]}`

const parseDecision = (raw: string): RouterDecision => {
  try {
    const json = raw.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim()
    const parsed = JSON.parse(json) as unknown
    if (!parsed || typeof parsed !== 'object') return SAFE_FALLBACK
    const obj = parsed as Record<string, unknown>
    const mode = obj.mode
    if (mode !== 'direct' && mode !== 'retrieve') return SAFE_FALLBACK
    const keysRaw = Array.isArray(obj.toolKeys) ? obj.toolKeys : []
    const toolKeys = keysRaw.filter(
      (k): k is ToolKey => typeof k === 'string' && VALID_KEYS.has(k as ToolKey)
    )
    if (mode === 'retrieve' && toolKeys.length === 0) return SAFE_FALLBACK
    return { mode: mode as RouterMode, toolKeys: mode === 'direct' ? [] : toolKeys }
  } catch {
    return SAFE_FALLBACK
  }
}

export const intentRouter = {
  route: async (text: string): Promise<RouterDecision> => {
    const trimmed = text.trim()
    if (!trimmed) return SAFE_FALLBACK
    try {
      const raw = await generateRouterDecision(ROUTER_PROMPT, trimmed)
      return parseDecision(raw)
    } catch {
      return SAFE_FALLBACK
    }
  }
}

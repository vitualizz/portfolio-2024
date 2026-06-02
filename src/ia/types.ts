import type { ToolKey } from './tools/types'

export type Lang = 'es' | 'en'
export type Confidence = 'high' | 'low'
export type RouterMode = 'direct' | 'retrieve'

export type RouterDecision = {
  mode: RouterMode
  toolKeys: ToolKey[]
}

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

export type AgentRequest = {
  messages: ChatMessage[]
  lang?: Lang
}

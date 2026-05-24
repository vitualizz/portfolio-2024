import { createOpenAI } from '@ai-sdk/openai'
import { generateText, type ModelMessage } from 'ai'

const openai = createOpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY
})

export type ChatMessage = { role: string; content: string }

export const OPENAI_MODEL = 'gpt-5-mini'
export const MAX_OUTPUT_TOKENS = 4000

type AskOptions = {
  system: string
  messages: ChatMessage[]
  fallbackAnswer: string
}

export const jsonAnswer = (answer: string, status = 200) =>
  new Response(JSON.stringify({ answer }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })

export const normalizeMessages = (value: unknown): ChatMessage[] => {
  if (!Array.isArray(value)) return []

  return value
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== 'object') return false

      const candidate = item as Partial<ChatMessage>
      return (
        typeof candidate.role === 'string' &&
        typeof candidate.content === 'string'
      )
    })
    .map((item) => ({ role: item.role, content: item.content }))
    .slice(-6)
}

const toModelMessage = (message: ChatMessage): ModelMessage => ({
  role: message.role === 'assistant' ? 'assistant' : 'user',
  content: message.content
})

export const generateAskAnswer = async ({
  system,
  messages,
  fallbackAnswer
}: AskOptions) => {
  if (!import.meta.env.OPENAI_API_KEY || messages.length === 0) {
    return fallbackAnswer
  }

  try {
    const { text } = await generateText({
      model: openai(OPENAI_MODEL),
      system,
      messages: messages.map(toModelMessage),
      maxOutputTokens: MAX_OUTPUT_TOKENS
    })

    return text.trim() || fallbackAnswer
  } catch (error) {
    return fallbackAnswer
  }
}

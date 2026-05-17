import type { APIRoute } from 'astro'

const LEE_SYSTEM_PROMPT = `You are "Lee-AI", a portfolio assistant that speaks AS IF you were Lee Palacios. Be warm, concise, and direct. Match the asker's language (Spanish or English) automatically.

FACTS ABOUT LEE PALACIOS:
- Software Engineer based in Lima, Peru. 7+ years of experience.
- Currently: Senior Fullstack Engineer at Patrimore (2025—present).
- Previous: Senior Fullstack Engineer at ComunidadFeliz (Jun 2022—Aug 2024) — Ruby on Rails + React + Postgres SaaS for thousands of buildings.
- Previous: Tech Lead at Influgo (Jan 2020—May 2022) — campaign management system from scratch, Rails + React + React Native + AWS Lambda.
- Side project (paused): Inmology — AI agents for real estate automation (GPT, N8N, Python, Postgres, AWS Lambda).
- Backend at heart: loves Ruby, Python, Postgres, SQL, AWS Lambda, optimized queries.
- AI Builder: actively explores LLMs, agent orchestration with N8N, prompt engineering, Claude/GPT.
- Frontend when needed: TypeScript, React, React Native, Tailwind.
- Three cats. Will mention them charmingly when asked about personal life.
- Languages: Spanish (native), English (fluent).

STYLE RULES:
- 1-3 short paragraphs MAX.
- Be honest and concrete. Drop real examples (e.g. "una vez optimicé una query de 8s a 30ms").
- End with one short follow-up question when natural.
- Never break character.`

type ChatMessage = { role: string; content: string }

const toAnthropicMessage = (message: ChatMessage) => ({
  role: message.role === 'assistant' ? 'assistant' : 'user',
  content: message.content
})

const normalizeMessages = (value: unknown): ChatMessage[] => {
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
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const messages = normalizeMessages(
      (body as { messages?: unknown }).messages
    )
    const apiKey = import.meta.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          answer:
            'API key not configured. Por favor escríbeme directamente por el formulario de contacto.'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 400,
        system: LEE_SYSTEM_PROMPT,
        messages: messages.map(toAnthropicMessage)
      })
    })
    const data = await response.json()
    const answer = data.content?.[0]?.text || 'No pude generar una respuesta.'
    return new Response(JSON.stringify({ answer }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(
      JSON.stringify({
        answer: 'Error procesando tu pregunta. Intenta de nuevo.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

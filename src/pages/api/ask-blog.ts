import type { APIRoute } from 'astro'

type ChatMessage = { role: string; content: string }
type PostContext = {
  title?: string
  subtitle?: string
  tag?: string
  body?: string
}

const toAnthropicMessage = (m: ChatMessage) => ({
  role: m.role === 'assistant' ? 'assistant' : 'user',
  content: m.content,
})

const normalizeMessages = (value: unknown): ChatMessage[] => {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== 'object') return false
      const c = item as Partial<ChatMessage>
      return typeof c.role === 'string' && typeof c.content === 'string'
    })
    .map((item) => ({ role: item.role, content: item.content }))
}

const buildSystemPrompt = (ctx: PostContext) =>
  `Sos "Lee-AI", un asistente embebido en el blog de Lee Palacios (vitualizz.dev). Respondés preguntas SOBRE el post que el lector está leyendo.

POST · ${ctx.tag ?? ''}
TÍTULO: ${ctx.title ?? ''}
SUBTÍTULO: ${ctx.subtitle ?? ''}

CONTENIDO DEL POST:
"""
${(ctx.body ?? '').slice(0, 6000)}
"""

REGLAS:
- Respondé en el idioma del usuario (por defecto español).
- Mantenete anclado al contenido del post. Si preguntan algo no cubierto, decilo brevemente y sugerí el formulario de contacto.
- 1-3 párrafos cortos. Directo, conversacional, sin relleno.
- Hablá como Lee en primera persona ("yo", "en mi experiencia") cuando suene natural.
- Cuando ayude, citá una frase específica del post o resumí un paso.
- Nunca rompas el personaje.`

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const messages = normalizeMessages((body as { messages?: unknown }).messages)
    const ctx: PostContext = (body as { context?: PostContext }).context ?? {}
    const apiKey = import.meta.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          answer:
            'API key no configurada. Escribime directamente por el formulario de contacto.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 400,
        system: buildSystemPrompt(ctx),
        messages: messages.map(toAnthropicMessage),
      }),
    })

    const data = await response.json()
    const answer = data.content?.[0]?.text ?? 'No pude generar una respuesta.'

    return new Response(JSON.stringify({ answer }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(
      JSON.stringify({
        answer: 'Error procesando tu pregunta. Intentá de nuevo.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  }
}

import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages, system } = await request.json()
    const apiKey = import.meta.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ answer: 'API key not configured. Por favor escríbeme directamente por el formulario de contacto.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
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
        system,
        messages: messages.map((m: {role: string; content: string}) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }))
      })
    })
    const data = await response.json()
    const answer = data.content?.[0]?.text || 'No pude generar una respuesta.'
    return new Response(JSON.stringify({ answer }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ answer: 'Error procesando tu pregunta. Intenta de nuevo.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

import type { APIRoute } from 'astro'
import {
  generateAskAnswer,
  jsonAnswer,
  normalizeMessages
} from '../../lib/server/ai'

type PostContext = {
  title?: string
  subtitle?: string
  tag?: string
  body?: string
  lang?: string
  language?: string
}

const buildSystemPrompt = (ctx: PostContext) =>
  `Sos "Lee-AI", un asistente embebido en el blog de Lee Palacios (vitualizz.dev). Respondés preguntas SOBRE el post que el lector está leyendo.

POST · ${ctx.tag ?? ''}
TÍTULO: ${ctx.title ?? ''}
SUBTÍTULO: ${ctx.subtitle ?? ''}
IDIOMA DEL POST/SITIO: ${ctx.lang ?? ctx.language ?? 'español'}

CONTENIDO DEL POST:
"""
${(ctx.body ?? '').slice(0, 6000)}
"""

REGLAS:
- Respondé en el idioma de la última pregunta del usuario cuando sea detectable.
- Si el idioma de la última pregunta es ambiguo, usá el idioma del post/sitio indicado arriba; si tampoco está disponible, respondé en español.
- Mantenete anclado al contenido del post. Si preguntan algo no cubierto, decilo brevemente y sugerí el formulario de contacto.
- 1-3 párrafos cortos. Directo, conversacional, sin relleno.
- Hablá como Lee en primera persona ("yo", "en mi experiencia") cuando suene natural.
- Cuando ayude, citá una frase específica del post o resumí un paso.
- Nunca rompas el personaje.`

const FALLBACK_ANSWER =
  'No pude generar una respuesta ahora. Escribime directamente por el formulario de contacto.'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const messages = normalizeMessages(
      (body as { messages?: unknown }).messages
    )
    const ctx: PostContext = (body as { context?: PostContext }).context ?? {}
    const answer = await generateAskAnswer({
      system: buildSystemPrompt(ctx),
      messages,
      fallbackAnswer: FALLBACK_ANSWER
    })

    return jsonAnswer(answer)
  } catch {
    return jsonAnswer('Error procesando tu pregunta. Intentá de nuevo.')
  }
}

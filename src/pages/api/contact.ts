import { Resend } from 'resend'
import type { APIRoute } from 'astro'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const prerender = false
const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()

  const email = data.get('email')?.toString() ?? ''
  const name = data.get('name')?.toString() ?? ''
  const description = data.get('description')?.toString() ?? ''

  if (!email || !description) {
    return new Response(JSON.stringify({ error: 'Faltan campos' }), {
      status: 400
    })
  }

  if (!EMAIL_REGEX.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400
    })
  }

  if (name && name.length > 200) {
    return new Response(JSON.stringify({ error: 'Name too long' }), {
      status: 400
    })
  }

  if (description && description.length > 2000) {
    return new Response(JSON.stringify({ error: 'Message too long' }), {
      status: 400
    })
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'vitualizz@gmail.com',
      subject: 'Portfolio - Contacto',
      html: `
        <h2>Solicitud de consulta gratuita</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p>${escapeHtml(description)}</p>
      `
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('Unknown error in contact endpoint')
    }
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500
    })
  }
}

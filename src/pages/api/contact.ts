import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const prerender = false;
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const email = data.get('email')?.toString() ?? '';
  const description = data.get('description')?.toString() ?? '';

  if (!email || !description) {
    return new Response(JSON.stringify({ error: 'Faltan campos' }), {
      status: 400,
    });
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'vitualizz@gmail.com',
      subject: 'Portfolio - Contacto',
      html: `
        <h2>Solicitud de consulta gratuita</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>${description}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};

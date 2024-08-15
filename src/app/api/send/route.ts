import { Resend } from 'resend'

import { EmailTemplate } from '@/components/email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  const { data, error } = await resend.emails.send({
    from: 'Teste <onboarding@resend.dev>',
    to: ['joaoguibc@gmail.com'],
    subject: 'testando mais!',
    react: EmailTemplate({ firstName: 'John' }),
    reply_to: ['joaoguibc30@gmail.com'],
  })

  if (error) {
    return Response.json(error, { status: 400 })
  }

  return Response.json(data, { status: 200 })
}

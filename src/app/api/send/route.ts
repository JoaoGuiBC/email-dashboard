import { Resend } from 'resend'
import { z } from 'zod'

import { EmailTemplate } from '@/components/email-template'
import { env } from '@/env'
import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmailSchema = z.object({
  subject: z.string(),
  title: z.string(),
  message: z.string(),
  contactsId: z.array(z.string()),
})

export async function POST(request: Request) {
  const response = await request.json()

  const { subject, title, message, contactsId } =
    sendEmailSchema.parse(response)

  const contacts = await prisma.contact.findMany({
    where: { id: { in: contactsId } },
    select: { email: true },
  })

  const emails = contacts.map((contact) => contact.email)

  const { error } = await resend.emails.send({
    from: `E-mail Dashboard <${env.EMAIL_SENDER}>`,
    to: emails,
    subject,
    react: EmailTemplate({ title, message }),
  })

  if (error) {
    return Response.json(error, { status: 400 })
  }

  return Response.json(
    { message: 'E-mail enviado com sucesso' },
    { status: 200 },
  )
}

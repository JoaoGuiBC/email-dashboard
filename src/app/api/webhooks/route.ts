import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const payloadSchema = z.object({
  created_at: z.string(),
  data: z.object({
    created_at: z.string(),
    email_id: z.string(),
    from: z.string(),
    subject: z.string(),
    to: z.array(z.string()),
  }),
  type: z.enum(['email.opened']),
})

export async function POST(request: Request) {
  const body = await request.json()
  const { success, data: payload } = payloadSchema.safeParse(body)

  if (success && payload.type === 'email.opened') {
    await prisma.email.update({
      where: { id: payload.data.email_id },
      data: { numberOfViews: { increment: 1 } },
    })
  }

  return Response.json({ status: 200 })
}

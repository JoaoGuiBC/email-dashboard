import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const registerAnswerSchema = z.object({
  emailId: z.string(),
  recipient: z.string(),
  text: z.string(),
  isAPositiveFeedback: z.boolean(),
})

export async function POST(request: Request) {
  const response = await request.json()

  const { success, data } = registerAnswerSchema.safeParse(response)

  if (!success) {
    return NextResponse.json(
      { message: 'Erro nos campos do formulário' },
      { status: 400 },
    )
  }

  await prisma.emailAnswer.create({
    data: {
      recipient: data.recipient,
      text: data.text,
      isAPositiveFeedback: data.isAPositiveFeedback,
      emailId: data.emailId,
    },
  })

  return Response.json(
    { message: 'Resposta registrada com sucesso!' },
    { status: 201 },
  )
}

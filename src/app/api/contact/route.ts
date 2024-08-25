import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const createContactSchema = z.object({
  email: z
    .string({ message: 'Informe o e-mail' })
    .email({ message: 'E-mail inválido' }),
  name: z
    .string({ message: 'Informe o nome do contato' })
    .min(4, { message: 'Informe o nome do contato' }),
  phone: z.coerce.string({ message: 'Tel. inválido' }).optional(),
  categoryId: z.string({ message: 'Categoria inválida' }).optional(),
})

export async function POST(request: Request) {
  const response = await request.json()

  const { success, data } = createContactSchema.safeParse(response)

  if (!success) {
    return NextResponse.json(
      { message: 'Erro nos campos do formulário' },
      { status: 400 },
    )
  }

  await prisma.contact.create({
    data: {
      email: data.email,
      name: data.name,
      phone: data.phone,
      categoryId: data.categoryId,
    },
  })

  return Response.json(
    { message: 'Contato criado com sucesso!' },
    { status: 200 },
  )
}

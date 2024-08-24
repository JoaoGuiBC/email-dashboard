import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const createCategorySchema = z.object({
  name: z
    .string({ message: 'Informe o nome da categoria' })
    .min(4, { message: 'Informe o nome da categoria' }),
})

export async function POST(request: Request) {
  const response = await request.json()

  const { success, data } = createCategorySchema.safeParse(response)

  if (!success) {
    return NextResponse.json(
      { message: 'Erro nos campos do formulário' },
      { status: 400 },
    )
  }

  await prisma.contactCategory.create({ data: { name: data.name } })

  return Response.json(
    { message: 'Categoria criada com sucesso!' },
    { status: 200 },
  )
}

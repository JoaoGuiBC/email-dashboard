import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const createCategorySchema = z.object({
  name: z
    .string({ message: 'Informe o nome da categoria' })
    .min(4, { message: 'Informe o nome da categoria' }),
})

const deleteCategorySchema = z.object({
  categoryId: z.string(),
})

export async function GET() {
  const categories = await prisma.contactCategory.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  return Response.json(categories)
}

export async function POST(request: Request) {
  const response = await request.json()

  const { success, data } = createCategorySchema.safeParse(response)

  if (!success) {
    return Response.json(
      { message: 'Erro nos campos do formulário' },
      { status: 400 },
    )
  }

  await prisma.contactCategory.create({ data: { name: data.name } })

  return Response.json(
    { message: 'Categoria criada com sucesso!' },
    { status: 201 },
  )
}

export async function DELETE(request: Request) {
  const response = await request.json()

  const { categoryId } = deleteCategorySchema.parse(response)

  await prisma.contactCategory.delete({ where: { id: categoryId } })

  revalidateTag('category')

  return Response.json(
    { message: 'Categoria apagada com sucesso!' },
    { status: 200 },
  )
}

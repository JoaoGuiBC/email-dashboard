'use server'

import { z } from 'zod'

import { api } from '@/http/api'
import { ActionReturn, RETURN_TYPES } from '@/utils/actions-return-type'

interface CreateCategoryResponse {
  message: string
}

const createCategorySchema = z.object({
  name: z
    .string({ message: 'Informe o nome da categoria' })
    .min(4, { message: 'Informe o nome da categoria' }),
})

export default async function createCategory(
  _: unknown,
  formData: FormData,
): Promise<ActionReturn> {
  const validatedFields = createCategorySchema.safeParse({
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    return {
      type: RETURN_TYPES.VALIDATION_ERROR,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const { message } = await api
      .post('category', { json: { name: validatedFields.data.name } })
      .json<CreateCategoryResponse>()

    return { type: RETURN_TYPES.SUCCESS, message }
  } catch (error) {
    const { message }: { message: string } = await new Response(
      error.response.body,
    ).json()

    return { type: RETURN_TYPES.SERVER_ERROR, message }
  }
}

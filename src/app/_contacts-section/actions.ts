'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { api } from '@/http/api'
import { ActionReturn, RETURN_TYPES } from '@/utils/actions-return-type'

interface CreateContactResponse {
  message: string
}

interface CreateCategoryResponse {
  message: string
}

const createContactSchema = z.object({
  email: z
    .string({ message: 'Informe o e-mail' })
    .email({ message: 'E-mail inválido' }),
  name: z
    .string({ message: 'Informe o nome do contato' })
    .min(4, { message: 'Informe o nome do contato' }),
  phone: z.string({ message: 'Tel. inválido' }).optional(),
  category: z
    .string({ message: 'Categoria inválida' })
    .transform((val) => (val === 'none' ? undefined : val)),
})

const createCategorySchema = z.object({
  name: z
    .string({ message: 'Informe o nome da categoria' })
    .min(4, { message: 'Informe o nome da categoria' }),
})

export async function createContact(
  _: unknown,
  formData: FormData,
): Promise<ActionReturn> {
  const validatedFields = createContactSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    category: formData.get('category'),
  })

  if (!validatedFields.success) {
    return {
      type: RETURN_TYPES.VALIDATION_ERROR,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const { message } = await api
      .post('contact', {
        json: {
          email: validatedFields.data.email,
          name: validatedFields.data.name,
          phone: validatedFields.data.phone,
          categoryId: validatedFields.data.category,
        },
      })
      .json<CreateContactResponse>()

    revalidateTag('contacts')

    return { type: RETURN_TYPES.SUCCESS, message }
  } catch (error) {
    const { message }: { message: string } = await new Response(
      error.response.body,
    ).json()

    return { type: RETURN_TYPES.SERVER_ERROR, message }
  }
}

export async function createCategory(
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

    revalidateTag('category')

    return { type: RETURN_TYPES.SUCCESS, message }
  } catch (error) {
    const { message }: { message: string } = await new Response(
      error.response.body,
    ).json()

    return { type: RETURN_TYPES.SERVER_ERROR, message }
  }
}

export async function deleteContact(data: FormData) {
  const [...formKeys] = data.keys()
  const contactsId = formKeys.filter((value) => !value.startsWith('$ACTION_ID'))

  if (contactsId.length === 0) return

  await api.delete('contact', { json: { contactsId } })

  revalidateTag('contacts')
}

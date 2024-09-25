'use server'

import { redirect } from 'next/navigation'

import { api } from '@/http/api'

export async function sendEmail(formData: FormData): Promise<void> {
  const subject = formData.get('subject')
  const title = formData.get('title')
  const message = formData.get('message')

  const [...formKeys] = formData.keys()
  const contactsId = formKeys.filter(
    (value) =>
      !value.startsWith('message') &&
      !value.startsWith('title') &&
      !value.startsWith('$ACTION_ID'),
  )

  if (contactsId.length === 0) return redirect('/')

  await api.post('send', { json: { subject, title, message, contactsId } })

  redirect('/')
}

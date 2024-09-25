'use client'

import { useRouter } from 'next/navigation'

import { CreateEmailForm } from '@/app/send-email/_create-email-form'
import { api } from '@/http/api'

export function Form({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  async function sendEmail(formData: FormData) {
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

    if (contactsId.length === 0) return router.back()

    await api.post('send', { json: { subject, title, message, contactsId } })

    router.back()
  }

  return <CreateEmailForm action={sendEmail}>{children}</CreateEmailForm>
}

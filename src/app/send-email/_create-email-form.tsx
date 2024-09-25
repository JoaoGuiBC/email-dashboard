import { Label } from '@radix-ui/react-label'
import { FormHTMLAttributes } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { sendEmail } from './actions'

export function CreateEmailForm({
  action,
  children,
}: FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form
      action={action ?? sendEmail}
      id="send-email"
      className="mt-1 flex flex-col items-stretch justify-end gap-2 px-8"
    >
      <div className="space-y-1">
        <Label htmlFor="subject">Assunto do e-mail</Label>
        <Input className="text-" id="subject" name="subject" required />
      </div>

      <div className="space-y-1">
        <Label htmlFor="title">Título da mensagem</Label>
        <Input className="text-" id="title" name="title" required />
      </div>

      <div className="space-y-1">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          name="message"
          className="h-18 resize-none"
          placeholder="lorem ipsum..."
          required
        />
      </div>

      <div className="mb-3 mt-1 h-64 space-y-1 pb-3">
        <strong>Escolha para quais contatos enviar</strong>
        {children}
      </div>
    </form>
  )
}

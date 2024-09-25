import Link from 'next/link'

import { ContactsList } from '@/components/contacts-list'
import { Button } from '@/components/ui/button'

import { CreateEmailForm } from './_create-email-form'

export default function SendEmailPage() {
  return (
    <div className="flex flex-col gap-2">
      <header className="mb-2 flex items-center justify-between px-8 pt-4">
        <h1 className="text-2xl font-bold">Novo e-mail</h1>

        <Button asChild>
          <Link href="/">Voltar</Link>
        </Button>
      </header>

      <CreateEmailForm>
        <ContactsList allowEdit={false} />
      </CreateEmailForm>

      <Button
        type="submit"
        form="send-email"
        className="ml-auto mr-9 w-fit px-5"
      >
        Enviar
      </Button>
    </div>
  )
}

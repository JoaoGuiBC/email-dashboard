'use client'

import { ContactsList } from '@/components/contacts-list'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function SendEmailMenu() {
  function sendEmail(data: FormData) {
    console.log(data.get('message'))
  }
  return (
    <Drawer>
      <Button asChild>
        <DrawerTrigger>Enviar novo e-mail</DrawerTrigger>
      </Button>

      <DrawerContent className="px-28 pb-4">
        <DrawerHeader>
          <DrawerTitle>Novo e-mail</DrawerTitle>
          <DrawerDescription className="sr-only">
            Formulário para enviar novos e-mails
          </DrawerDescription>
        </DrawerHeader>
        <form
          action={sendEmail}
          id="send-email"
          className="mt-4 flex flex-col items-end justify-end gap-1 px-8"
        >
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="email">Mensagem</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="lorem ipsum..."
              required
            />

            <strong className="mt-8">Escolha para quais contatos enviar</strong>
            <ContactsList className="mb-6 h-72" allowEdit={false} />
          </div>
        </form>
        <DrawerFooter className="flex flex-row justify-end">
          <Button type="submit" form="send-email" className="px-4">
            Enviar
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

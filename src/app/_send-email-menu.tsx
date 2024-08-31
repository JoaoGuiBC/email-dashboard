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
import { api } from '@/http/api'

export async function SendEmailMenu() {
  async function sendEmail(data: FormData) {
    'use server'

    const message = data.get('message')

    const [...formKeys] = data.keys()
    const contactsId = formKeys.filter((value) => !value.startsWith('message'))
    // console.log(contactsId)
    // console.log(data.get('message'))

    await api.post('send', { json: { message, contactsId } })
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
          className="mt-1 flex flex-col items-stretch justify-end gap-2 px-8"
        >
          <div className="space-y-1">
            <Label htmlFor="email">Mensagem</Label>
            <Textarea
              id="message"
              name="message"
              className="h-24 resize-none"
              placeholder="lorem ipsum..."
              required
            />
          </div>

          <div className="mb-3 mt-1 h-64 space-y-1 pb-3">
            <strong>Escolha para quais contatos enviar</strong>
            <ContactsList allowEdit={false} />
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

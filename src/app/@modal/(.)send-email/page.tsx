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
} from '@/components/ui/drawer'

import { Form } from './_form'

export default function SendEmailModal() {
  return (
    <Drawer open={true}>
      <DrawerContent className="px-28 pb-2">
        <DrawerHeader>
          <DrawerTitle>Novo e-mail</DrawerTitle>
          <DrawerDescription className="sr-only">
            Formulário para enviar novos e-mails
          </DrawerDescription>
        </DrawerHeader>

        <Form>
          <ContactsList allowEdit={false} />
        </Form>

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

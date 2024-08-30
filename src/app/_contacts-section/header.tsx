import { PlusCircledIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { CreateCategoryDialog } from './create-category-dialog'
import { CreateContactDialog } from './create-contact-dialog'

export async function ContactsSectionHeader() {
  return (
    <div className="mb-2 flex items-center">
      <h2 className="text-xl">Contatos salvos</h2>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto mr-2 px-2">
            <PlusCircledIcon className="size-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="flex flex-col items-center">
          <span>O que você deseja criar?</span>

          <div className="mt-2 flex w-full justify-evenly">
            <CreateCategoryDialog />

            <CreateContactDialog />
          </div>
        </PopoverContent>
      </Popover>

      <Button
        form="deleteContact"
        type="submit"
        variant="destructive"
        size="sm"
      >
        Apagar selecionados
      </Button>
    </div>
  )
}

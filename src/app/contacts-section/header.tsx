'use client'

import { PlusCircledIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function ContactsSectionHeader() {
  return (
    <div className="mb-2 flex items-center">
      <h2 className="text-xl">Contatos salvos</h2>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto mr-2 px-2">
            <PlusCircledIcon className="size-4" />

            <PopoverContent className="flex flex-col items-center">
              <span>O que você deseja criar?</span>

              <div className="mt-2 flex w-full justify-evenly">
                <Button
                  variant="outline"
                  onClick={() => console.log('Categoria')}
                >
                  Categoria
                </Button>

                <Button
                  variant="outline"
                  onClick={() => console.log('contato')}
                >
                  Contato
                </Button>
              </div>
            </PopoverContent>
          </Button>
        </PopoverTrigger>
      </Popover>

      <Button variant="destructive" size="sm">
        Apagar selecionados
      </Button>
    </div>
  )
}

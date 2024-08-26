'use client'

import { ReloadIcon } from '@radix-ui/react-icons'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ActionReturn, RETURN_TYPES } from '@/utils/actions-return-type'

import { createCategory } from './actions'

export function CreateCategoryDialog() {
  const { mutate } = useSWRConfig()

  const [{ errors, type, message }, formAction, isPending] = useActionState(
    createCategory,
    {} as ActionReturn,
  )

  useEffect(() => {
    if (!isPending) {
      if (type === RETURN_TYPES.SERVER_ERROR) {
        toast.error(message)
      }

      if (type === RETURN_TYPES.SUCCESS) {
        mutate('/category')
        mutate('/contact')
        toast.success(message)
      }
    }
  }, [type, message, isPending, mutate])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Categoria</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar uma nova categoria</DialogTitle>
          <DialogDescription className="sr-only">
            Formulário para criar uma nova categoria nos contatos
          </DialogDescription>
        </DialogHeader>

        <form
          action={formAction}
          className="mt-2 flex flex-col items-end justify-end gap-3"
        >
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="name" errorMessage={errors?.name?.[0]}>
              Nome da categoria
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              isErrored={!!errors?.name?.[0]}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? <ReloadIcon className="animate-spin" /> : 'Adicionar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

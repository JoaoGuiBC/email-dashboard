'use client'

import { ReloadIcon } from '@radix-ui/react-icons'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCategories } from '@/http/swr-routes'
import { ActionReturn, RETURN_TYPES } from '@/utils/actions-return-type'

import { createContact } from './actions'

export function CreateContactDialog() {
  const { categories } = useCategories()
  const [{ errors, type, message }, formAction, isPending] = useActionState(
    createContact,
    {} as ActionReturn,
  )

  useEffect(() => {
    if (!isPending) {
      if (type === RETURN_TYPES.SERVER_ERROR) {
        toast.error(message)
      }

      if (type === RETURN_TYPES.SUCCESS) {
        toast.success(message)
      }
    }
  }, [type, message, isPending])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Contato</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar um novo contato</DialogTitle>
        </DialogHeader>

        <form
          action={formAction}
          className="mt-2 flex flex-col items-end justify-end gap-1"
        >
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="email" errorMessage={errors?.email?.[0]}>
              E-mail
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              isErrored={!!errors?.email?.[0]}
              required
            />
          </div>

          <div className="flex w-full gap-2">
            <div className="grid w-full items-center gap-1">
              <Label htmlFor="name" errorMessage={errors?.name?.[0]}>
                Nome
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                isErrored={!!errors?.name?.[0]}
                required
              />
            </div>

            <div className="grid w-full items-center gap-1">
              <Label htmlFor="phone" errorMessage={errors?.phone?.[0]}>
                Telefone{' '}
                <span className="text-xs text-muted-foreground">
                  - opcional
                </span>
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="479999999999"
                isErrored={!!errors?.phone?.[0]}
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="category" errorMessage={errors?.category?.[0]}>
              Categoria
            </Label>
            <Select name="category">
              <SelectTrigger id="category">
                <SelectValue placeholder="Nenhuma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhuma</SelectItem>

                {categories &&
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? <ReloadIcon className="animate-spin" /> : 'Adicionar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

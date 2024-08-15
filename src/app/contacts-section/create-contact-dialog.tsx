import { Label } from '@radix-ui/react-label'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CreateContactDialog() {
  function handleCreateContact(data: FormData) {
    console.log(data.get('phone'))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => console.log('contato')}>
          Contato
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar um novo contato</DialogTitle>
        </DialogHeader>

        <form
          action={handleCreateContact}
          className="mt-2 flex flex-col items-end justify-end gap-1"
        >
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="flex w-full gap-2">
            <div className="grid w-full items-center gap-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="grid w-full items-center gap-1">
              <Label htmlFor="phone">
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
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="category">Categoria</Label>
            <Select name="category">
              <SelectTrigger id="category">
                <SelectValue placeholder="Nenhuma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhuma</SelectItem>
                <SelectItem value="exemplo1">Categoria 1</SelectItem>
                <SelectItem value="exemplo2">Categoria 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="mt-3">
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

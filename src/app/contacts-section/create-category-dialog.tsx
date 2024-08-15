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

export function CreateCategoryDialog() {
  function handleCreateCategory(data: FormData) {
    console.log(data.get('name'))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => console.log('categoria')}>
          Categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar uma nova categoria</DialogTitle>
        </DialogHeader>

        <form
          action={handleCreateCategory}
          className="mt-2 flex flex-col items-end justify-end gap-3"
        >
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="name">Nome da categoria</Label>
            <Input type="text" id="name" name="name" />
          </div>

          <Button type="submit">Adicionar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

import { Pencil1Icon } from '@radix-ui/react-icons'

import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'

export function ContactCard() {
  return (
    <div className="flex justify-between rounded-md bg-zinc-900 p-4">
      <div>
        <strong className="leading-3">Contato de exemplo</strong>
        <p className="text-xs leading-none">contato@exemplo.com</p>
        <p className="mt-0.5 text-xs leading-none text-muted-foreground">
          (47) 9 9999-9999
        </p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <Checkbox className="mr-0.5" />
        <Button variant="ghost" className="h-fit p-1">
          <Pencil1Icon />
        </Button>
      </div>
    </div>
  )
}

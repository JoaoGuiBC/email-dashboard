import { Pencil1Icon } from '@radix-ui/react-icons'

import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Skeleton } from './ui/skeleton'

interface ContactCardProps {
  name: string
  email: string
  phone: string | null
}

export function ContactCard({ name, email, phone }: ContactCardProps) {
  return (
    <div className="flex justify-between rounded-md bg-zinc-900 p-4">
      <div>
        <strong className="leading-3">{name}</strong>
        <p className="text-xs leading-none">{email}</p>
        <p className="mt-0.5 text-xs leading-none text-muted-foreground">
          {phone}
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

export function LoadingContactCard() {
  return (
    <div className="flex justify-between rounded-md bg-zinc-900 p-4">
      <div className="flex-1">
        <Skeleton className="mb-1 h-4 w-2/3 rounded-full" />
        <Skeleton className="h-3 w-1/2 rounded-full" />
        <Skeleton className="mt-px h-3 w-1/2 rounded-full" />
      </div>

      <div className="flex flex-col items-end gap-1">
        <Skeleton className="mr-0.5 h-4 w-4 shrink-0 rounded-sm" />
        <Skeleton className="mr-0.5 h-4 w-4 shrink-0 rounded-sm" />
      </div>
    </div>
  )
}

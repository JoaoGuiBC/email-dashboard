'use client'

import { CaretSortIcon, TrashIcon } from '@radix-ui/react-icons'

import { ContactCard } from '@/components/contact-card'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { ContactsSectionHeader } from './header'

export function Contacts() {
  return (
    <section className="col-span-2 flex h-full flex-col">
      <ContactsSectionHeader />

      <ScrollArea>
        <Collapsible className="pb-2">
          <div className="mb-2 ml-4 flex items-center gap-2">
            <h3 className="font-light">Categoria de exemplo 1</h3>

            <Button variant="outline" size="icon" className="ml-auto">
              <TrashIcon className="h-4 w-4" />
            </Button>

            <CollapsibleTrigger asChild>
              <Button variant="outline" size="icon">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
          </CollapsibleContent>
        </Collapsible>

        <Separator className="mx-auto mb-4 w-10/12 bg-zinc-500" />

        <Collapsible className="pb-2">
          <div className="mb-2 ml-4 flex items-center gap-2">
            <h3 className="font-light">Categoria de exemplo 2</h3>

            <Button variant="outline" size="icon" className="ml-auto">
              <TrashIcon className="h-4 w-4" />
            </Button>

            <CollapsibleTrigger asChild>
              <Button variant="outline" size="icon">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
            <Separator className="mx-auto my-2 w-2/3" />
            <ContactCard />
          </CollapsibleContent>
        </Collapsible>

        <Separator className="mx-auto mb-4 w-10/12 bg-zinc-500" />

        <ContactCard />
        <Separator className="mx-auto my-2 w-2/3" />
        <ContactCard />
        <Separator className="mx-auto my-2 w-2/3" />
        <ContactCard />
      </ScrollArea>
    </section>
  )
}

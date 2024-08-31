import { CaretSortIcon } from '@radix-ui/react-icons'
import React, { Fragment } from 'react'

import { ContactCard } from '@/components/contact-card'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { api } from '@/http/api'

import { DeleteCategoryButton } from './delete-category-button'

type Contact = {
  email: string
  name: string
  phone: string | null
  id: string
}

type ContactsResponse = {
  categories: {
    name: string
    id: string
    contacts: Contact[]
  }[]
  contacts: Contact[]
}

async function listContacts() {
  const response = await api.get('contact', {
    cache: 'force-cache',
    next: { tags: ['contacts', 'category'] },
  })
  const contacts = (await response.json()) as ContactsResponse

  return contacts
}

interface ContactsListProps {
  allowEdit?: boolean
}

export async function ContactsList({ allowEdit = true }: ContactsListProps) {
  const data = await listContacts()

  return (
    <ScrollArea className="h-full">
      {data.categories.map((category) => (
        <Fragment key={category.id}>
          <Collapsible className="pb-2">
            <div className="mb-2 ml-4 flex items-center gap-2">
              <h3 className="mr-auto font-light">{category.name}</h3>

              {allowEdit && <DeleteCategoryButton categoryId={category.id} />}

              <CollapsibleTrigger asChild>
                <Button variant="outline" size="icon">
                  <CaretSortIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              {category.contacts.map((contact, index) => (
                <Fragment key={contact.id}>
                  <ContactCard
                    id={contact.id}
                    name={contact.name}
                    email={contact.email}
                    phone={contact.phone}
                    editable={allowEdit}
                  />
                  {index + 1 !== category.contacts.length && (
                    <Separator className="mx-auto my-2 w-2/3" />
                  )}
                </Fragment>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Separator className="mx-auto mb-6 w-10/12 bg-zinc-500" />
        </Fragment>
      ))}

      {data.contacts.map((contact, index) => (
        <Fragment key={contact.id}>
          <ContactCard
            id={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            editable={allowEdit}
          />
          {index + 1 !== data.contacts.length && (
            <Separator className="mx-auto my-2 w-2/3" />
          )}
        </Fragment>
      ))}
    </ScrollArea>
  )
}

'use client'

import { CaretSortIcon, TrashIcon } from '@radix-ui/react-icons'
import React, { Fragment } from 'react'

import { ContactCard, LoadingContactCard } from '@/components/contact-card'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useContacts } from '@/http/swr-routes'

interface ContactsListProps extends React.HTMLAttributes<HTMLDivElement> {
  allowEdit?: boolean
}

export function ContactsList({
  className,
  allowEdit = true,
}: ContactsListProps) {
  const { data, isLoading } = useContacts()
  return (
    <ScrollArea className={className}>
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <Fragment key={index}>
              <LoadingContactCard />
              <Separator className="mx-auto my-2 w-2/3" />
            </Fragment>
          ))}
        </>
      ) : (
        <>
          {data?.categories.map((category) => (
            <Fragment key={category.id}>
              <Collapsible className="pb-2">
                <div className="mb-2 ml-4 flex items-center gap-2">
                  <h3 className="font-light">{category.name}</h3>

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
                  {category.contacts.map((contact, index) => (
                    <Fragment key={contact.id}>
                      <ContactCard
                        key={contact.id + index}
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

              <Separator className="mx-auto mb-4 w-10/12 bg-zinc-500" />
            </Fragment>
          ))}

          {data?.contacts.map((contact, index) => (
            <Fragment key={contact.id}>
              <ContactCard
                key={contact.id}
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
        </>
      )}
    </ScrollArea>
  )
}

import { ContactsList } from '@/components/contacts-list'

import { ContactsSectionHeader } from './header'

export function Contacts() {
  return (
    <section className="col-span-2 flex h-full flex-col">
      <ContactsSectionHeader />

      <ContactsList />
    </section>
  )
}

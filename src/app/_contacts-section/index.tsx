import { ContactsList } from '@/components/contacts-list'

import { deleteContact } from './actions'
import { ContactsSectionHeader } from './header'

export async function Contacts() {
  return (
    <section className="relative col-span-2 grid grid-cols-1 grid-rows-12">
      <ContactsSectionHeader />

      <form action={deleteContact} id="deleteContact" className="row-span-11">
        <ContactsList />
      </form>
    </section>
  )
}

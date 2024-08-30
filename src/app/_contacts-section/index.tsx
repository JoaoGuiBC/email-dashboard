import { ContactsList } from '@/components/contacts-list'

import { deleteContact } from './actions'
import { ContactsSectionHeader } from './header'

export async function Contacts() {
  return (
    <form
      action={deleteContact}
      id="deleteContact"
      className="col-span-2 flex h-full flex-col"
    >
      <ContactsSectionHeader />

      <ContactsList />
    </form>
  )
}

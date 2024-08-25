import { ContactsSectionHeader } from './header'
import { ScrollableContent } from './scrollable-content'

export function Contacts() {
  return (
    <section className="col-span-2 flex h-full flex-col">
      <ContactsSectionHeader />

      <ScrollableContent />
    </section>
  )
}

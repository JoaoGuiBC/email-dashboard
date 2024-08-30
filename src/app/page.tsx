import '../env'

import { Contacts } from './_contacts-section'
import { SendEmailMenu } from './_send-email-menu'

export default function Home() {
  return (
    <div className="grid h-screen grid-cols-1 grid-rows-10 space-y-6 px-12 py-4 antialiased">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tighter">
          E-mail dashboard
        </h1>
        <SendEmailMenu />
      </header>

      <main className="row-span-9 grid grid-cols-7 grid-rows-1 gap-4">
        <Contacts />
        <section className="col-span-3">middle</section>
        <section className="col-span-2">right</section>
      </main>
    </div>
  )
}

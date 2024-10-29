import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { Contacts } from './_contacts-section'
import { Emails } from './_emails-section'

export default function Home() {
  return (
    <div className="grid h-screen grid-cols-1 grid-rows-10 space-y-6 px-12 py-4 antialiased">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tighter">
          E-mail dashboard
        </h1>

        <Button asChild>
          <Link href="/send-email">Enviar novo e-mail</Link>
        </Button>
      </header>

      <main className="row-span-9 grid grid-cols-7 grid-rows-1 gap-4">
        <Contacts />
        <section className="col-span-3">middle</section>
        <Emails />
      </main>
    </div>
  )
}

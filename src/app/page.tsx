import { ContactCard } from '@/components/contact-card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <div className="h-screen px-12 py-4 antialiased space-y-6 grid grid-cols-1 grid-rows-10">
      <header className="flex items-center justify-between">
        <h1 className="font-bold text-2xl tracking-tighter">
          E-mail dashboard
        </h1>
        <Button>Enviar novo e-mail</Button>
      </header>

      <main className="row-span-9 grid grid-rows-1 grid-cols-7 gap-4">
        <section className="flex flex-col h-full col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl">Contatos salvos</h2>
            <Button variant="destructive" size="sm">
              Apagar selecionados
            </Button>
          </div>

          <ScrollArea>
            <ContactCard />
            <Separator className="my-2 w-2/3 mx-auto" />

            <ContactCard />
            <Separator className="my-2 w-2/3 mx-auto" />

            <ContactCard />
            <Separator className="my-2 w-2/3 mx-auto" />

            <ContactCard />
            <Separator className="my-2 w-2/3 mx-auto" />

            <ContactCard />
            <Separator className="my-2 w-2/3 mx-auto" />

            <ContactCard />
            <Separator className="my-2 w-2/3 mx-auto" />

            <ContactCard />
            <Separator className="my-2 w-2/3 mx-auto" />

            <ContactCard />
            <Separator className="my-2 w-2/3 mx-auto" />

            <ContactCard />
          </ScrollArea>
        </section>

        <section className="bg-indigo-800 col-span-3">middle</section>
        <section className="bg-blue-800 col-span-2">right</section>
      </main>
    </div>
  )
}

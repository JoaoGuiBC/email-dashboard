'use client'

import dayjs from 'dayjs'
import Link from 'next/link'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useEmails } from '@/http/swr-routes'
import { getFeedBackPercentage } from '@/utils/get-feedback-percentage'

import { Header } from './header'

export function Emails() {
  const { emails } = useEmails()

  return (
    <section className="relative col-span-2 grid grid-cols-1 grid-rows-12">
      <Header />

      {emails && (
        <ScrollArea className="row-span-11 h-full gap-2">
          {emails.map((email) => (
            <Link key={email.id} href={`/emails/${email.id}`}>
              <div className="mb-4 flex w-full flex-col rounded-md bg-zinc-900 p-4">
                <h3 className="font-bold leading-4">{email.subject}</h3>
                <span className="text-xs leading-tight">
                  {dayjs(email.createdAt).format('D [de] MMM [de] YYYY')}
                </span>

                <Separator className="my-1 bg-gray-800" />

                <div className="flex h-fit w-full items-center justify-between">
                  <span>
                    {email.numberOfViews} de {email.numberOfRecipients}{' '}
                    visualizaram
                  </span>
                  <Separator
                    decorative
                    orientation="vertical"
                    className="h-4 bg-gray-700"
                  />
                  <span>{email.answers.length} respostas</span>
                </div>

                <span
                  className={`mt-2 text-sm font-medium ${getFeedBackPercentage(email.answers).color}`}
                >
                  {email.answers.length > 0 &&
                    `${getFeedBackPercentage(email.answers).percentage}% das respostas são positivas`}
                </span>
              </div>
            </Link>
          ))}
        </ScrollArea>
      )}
    </section>
  )
}

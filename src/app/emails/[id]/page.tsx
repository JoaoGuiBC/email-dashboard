'use client'

import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/http/api'
import { useEmailDetails } from '@/http/swr-routes'
import { formatEmailDate } from '@/utils/format-email-creation-date'
import { getFeedBackPercentage } from '@/utils/get-feedback-percentage'

const registerAnswerSchema = z.object({
  recipient: z.string(),
  text: z.string(),
})

export default function EmailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [newAnswerIsVisible, setNewAnswerIsVisible] = useState(false)
  const [newAnswerFeedbackType, setNewAnswerFeedbackType] = useState(true)

  const { email } = useEmailDetails(id)

  async function registerAnswerAction(formData: FormData) {
    const { success, data } = registerAnswerSchema.safeParse({
      recipient: formData.get('recipient'),
      text: formData.get('text'),
    })

    if (!success) return

    try {
      const response = await api.post('email/answer', {
        json: {
          emailId: id,
          recipient: data.recipient,
          text: data.text,
          isAPositiveFeedback: newAnswerFeedbackType,
        },
      })

      const responseData = await response.json<{ message: string }>()

      mutate(`/email/list`)
      mutate(`/email?emailId=${id}`)

      setNewAnswerIsVisible(false)
      setNewAnswerFeedbackType(true)

      return toast.success(responseData.message)
    } catch (error) {
      const { message }: { message: string } = await new Response(
        error.response.body,
      ).json()

      return toast.error(message)
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center px-96 py-5">
      <h1 className="my-3 text-2xl font-medium">{email?.subject}</h1>

      <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-2">
        <div className="col-span-1 row-span-1 rounded-md border border-zinc-700 bg-zinc-900 p-2">
          <h3 className="text-xs font-medium">ID</h3>
          <p>{id}</p>
        </div>
        <div className="col-span-1 row-span-1 rounded-md border border-zinc-700 bg-zinc-900 p-2">
          <h3 className="text-xs font-medium">Data de envio</h3>
          <p>{formatEmailDate(email?.createdAt)}</p>
        </div>
        <div className="col-span-1 row-span-1 rounded-md border border-zinc-700 bg-zinc-900 p-2">
          <h3 className="text-xs font-medium">Quantas pessoas visualizaram</h3>
          <p>
            {email?.numberOfViews} de {email?.numberOfRecipients} visualizaram
          </p>
        </div>
        <div className="col-span-1 row-span-1 rounded-md border border-zinc-700 bg-zinc-900 p-2">
          <h3 className="text-xs font-medium">Quantas pessoas responderam</h3>
          <p>{email?.answers.length} respostas</p>
        </div>
      </div>

      <Separator className="mt-4 bg-zinc-700" />

      <div className="mt-4 flex w-full items-center justify-between">
        <span className="text-lg font-medium leading-none">
          Respostas{' '}
          {email && email.answers.length > 0 && (
            <span
              className={`text-xs font-normal ${getFeedBackPercentage(email.answers).color}`}
            >
              {`${getFeedBackPercentage(email.answers).percentage}% das respostas são positivas`}
            </span>
          )}
        </span>
        <Button onClick={() => setNewAnswerIsVisible(true)}>
          Adicionar nova resposta
        </Button>
      </div>

      <ScrollArea className="mt-2 w-full">
        {newAnswerIsVisible && (
          <div className="mb-5 flex flex-col">
            <form
              action={registerAnswerAction}
              id="register-answer"
              className="rounded-md rounded-b-none border border-zinc-700"
            >
              <div className="flex justify-between px-2">
                <Input
                  name="recipient"
                  className="w-1/2 border-0 bg-none p-0 font-medium"
                  type="text"
                  placeholder="Nome do correspondente"
                />

                <div className="flex items-center">
                  <span className="mr-2 text-xs">é uma resposta positiva?</span>
                  <button
                    type="button"
                    className={`mr-1 ${newAnswerFeedbackType ? 'text-green-500' : 'text-zinc-400'}`}
                    onClick={() => setNewAnswerFeedbackType(true)}
                  >
                    <CheckCircledIcon />
                  </button>
                  <button
                    type="button"
                    className={`${!newAnswerFeedbackType ? 'text-red-500' : 'text-zinc-400'}`}
                    onClick={() => setNewAnswerFeedbackType(false)}
                  >
                    <CrossCircledIcon />
                  </button>
                </div>
              </div>

              <Textarea
                className="min-h-20 w-full resize-y"
                name="text"
                placeholder="Resposta"
              />
            </form>

            <Button
              variant="outline"
              className="rounded-t-none"
              form="register-answer"
            >
              Salvar
            </Button>
          </div>
        )}

        {email?.answers.map((answer) => (
          <div
            key={answer.id}
            className="mb-5 rounded-md border border-zinc-700"
          >
            <div className="flex justify-between px-2">
              <Input
                className="w-1/2 border-0 bg-none p-0 font-medium"
                type="text"
                readOnly
                value={answer.recipient}
              />

              <div className="flex items-center">
                <span className="mr-2 text-xs">é uma resposta positiva?</span>
                <button
                  type="button"
                  className={`mr-1 ${answer.isAPositiveFeedback ? 'text-green-500' : 'text-zinc-400'} cursor-default`}
                >
                  <CheckCircledIcon />
                </button>
                <button
                  type="button"
                  className={`${!answer.isAPositiveFeedback ? 'text-red-500' : 'text-zinc-400'} cursor-default`}
                >
                  <CrossCircledIcon />
                </button>
              </div>
            </div>
            <Textarea
              className="min-h-20 w-full resize-y"
              readOnly
              defaultValue={answer.text}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

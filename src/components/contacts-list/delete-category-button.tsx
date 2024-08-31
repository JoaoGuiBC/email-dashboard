'use client'

import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'

import { api } from '@/http/api'

import { Button } from '../ui/button'

interface DeleteCategoryResponse {
  message: string
}

interface DeleteCategoryButtonProps {
  categoryId: string
}

export function DeleteCategoryButton({
  categoryId,
}: DeleteCategoryButtonProps) {
  const [isPending, setIsPending] = useState(false)
  const { mutate } = useSWRConfig()
  const router = useRouter()

  async function handleDeleteCategory() {
    setIsPending(true)

    try {
      const { message } = await api
        .delete('category', { json: { categoryId } })
        .json<DeleteCategoryResponse>()

      router.push('/')
      router.refresh()
      mutate('/category')

      toast.success(message)
    } catch (error) {
      const { message }: { message: string } = await new Response(
        error.response.body,
      ).json()

      toast.error(message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button
      onClick={handleDeleteCategory}
      variant="outline"
      size="icon"
      className="ml-auto"
      disabled={isPending}
    >
      {isPending ? (
        <ReloadIcon className="animate-spin" />
      ) : (
        <TrashIcon className="h-4 w-4" />
      )}
    </Button>
  )
}

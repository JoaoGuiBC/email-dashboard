import useSWR from 'swr'

import { fetcher } from '@/lib/swr'

type UseCategoriesResponse = {
  name: string
  id: string
}[]

type Email = {
  subject: string
  id: string
  createdAt: Date
  numberOfRecipients: number
  numberOfViews: number
  answers: {
    id: string
    text: string
    recipient: string
    isAPositiveFeedback: boolean
  }[]
}

type UseEmailsResponse = {
  emails: Email[]
}

export function useCategories() {
  const { data, error, isLoading } = useSWR<UseCategoriesResponse>(
    '/category',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60 * 6, // 6 hours
    },
  )

  return {
    categories: data,
    isLoading,
    isError: error,
  }
}

export function useEmails() {
  const { data, error, isLoading } = useSWR<UseEmailsResponse>(
    '/email/list',
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 1000 * 10, // 10 seconds
      revalidateOnMount: true,
    },
  )

  return {
    emails: data?.emails,
    isLoading,
    isError: error,
  }
}

export function useEmailDetails(emailId: string) {
  const { data, error, isLoading } = useSWR<{ email: Email }>(
    `/email?emailId=${emailId}`,
    fetcher,
    {
      refreshInterval: 1000 * 60 * 5, // 5 minutes
    },
  )

  return {
    email: data?.email,
    isLoading,
    isError: error,
  }
}

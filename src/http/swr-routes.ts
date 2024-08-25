import useSWR from 'swr'

import { fetcher } from '@/lib/swr'

type Contact = {
  email: string
  name: string
  phone: string | null
  id: string
}

type UseContactsResponse = {
  categories: {
    name: string
    id: string
    contacts: Contact[]
  }[]
  contacts: Contact[]
}

type UseCategoriesResponse = {
  name: string
  id: string
}[]

export function useContacts() {
  const { data, error, isLoading } = useSWR<UseContactsResponse>(
    '/contact',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60 * 6, // 6 hours
    },
  )

  return {
    data,
    isLoading,
    isError: error,
  }
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

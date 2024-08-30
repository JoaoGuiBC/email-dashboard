import useSWR from 'swr'

import { fetcher } from '@/lib/swr'

type UseCategoriesResponse = {
  name: string
  id: string
}[]

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

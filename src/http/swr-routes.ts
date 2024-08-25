import useSWR from 'swr'

import { fetcher } from '@/lib/swr'

type Categories = {
  name: string
  id: string
}[]

export function useCategories() {
  const { data, error, isLoading } = useSWR<Categories>('/category', fetcher, {
    // revalidateIfStale: false,
    revalidateOnFocus: false,
    // revalidateOnMount: false,
    // revalidateOnReconnect: false,
    dedupingInterval: 1000 * 60 * 60 * 6,
  })

  return {
    categories: data,
    isLoading,
    isError: error,
  }
}

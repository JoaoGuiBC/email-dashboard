import { env } from '@/env'

export const fetcher = (route: string) =>
  fetch(`${env.NEXT_PUBLIC_API_URL}${route}`).then((res) => res.json())

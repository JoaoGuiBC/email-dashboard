import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string(),
    EMAIL_SENDER: z.string().email(),
    DATABASE_URL: z.string().url(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  emptyStringAsUndefined: false,
})

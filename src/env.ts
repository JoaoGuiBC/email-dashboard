import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

// const envSchema = z.object({
//   RESEND_API_KEY: z.string(),
//   DATABASE_URL: z.string(),
// })

// export const env = envSchema.parse(process.env.EMAIL_SERVER)

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string(),
    DATABASE_URL: z.string().url(),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  emptyStringAsUndefined: false,
})

import 'dotenv/config'

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    TURSO_DATABASE_URL: z.string().min(1),
    TURSO_DATABASE_AUTH_TOKEN: z.string().min(1),
  },
  experimental__runtimeEnv: {},
})

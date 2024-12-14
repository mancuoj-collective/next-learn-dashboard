import type { Config } from 'drizzle-kit'

import { env } from '@/config/env'

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_DATABASE_AUTH_TOKEN,
  },
  tablesFilter: 'tmpl_*',
} satisfies Config

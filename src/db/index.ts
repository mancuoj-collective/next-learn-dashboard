import type { Client } from '@libsql/client'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import { env } from '@/config/env'

import * as schema from './schema'

const globalForDb = globalThis as unknown as {
  client: Client | undefined
}

export const client = globalForDb.client ?? createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_DATABASE_AUTH_TOKEN,
})
if (env.NODE_ENV !== 'production') {
  globalForDb.client = client
}

export const db = drizzle(client, { schema })

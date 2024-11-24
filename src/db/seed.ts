import 'dotenv/config'

import { db } from '.'
import { customers, invoices, revenue, users } from './placeholder-data'
import { customers as customersTable, invoices as invoicesTable, revenue as revenueTable, users as usersTable } from './schema'

async function seed() {
  await db.delete(invoicesTable)
  await db.delete(customersTable)
  await db.delete(revenueTable)
  await db.delete(usersTable)

  await db.insert(usersTable).values(users)
  await db.insert(customersTable).values(customers)
  await db.insert(invoicesTable).values(invoices)
  await db.insert(revenueTable).values(revenue)
}

void seed()

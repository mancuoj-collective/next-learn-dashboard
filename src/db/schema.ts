import { int, real, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'

export const createTable = sqliteTableCreator(name => `tmpl_${name}`)

export const users = createTable('user', {
  id: text('id', { length: 255 }).notNull().primaryKey(),
  name: text('name', { length: 255 }),
  email: text('email', { length: 255 }).notNull(),
  password: text('password', { length: 255 }).notNull(),
})

export const customers = createTable('customer', {
  id: text('id', { length: 255 }).notNull().primaryKey(),
  name: text('name', { length: 255 }).notNull(),
  email: text('email', { length: 255 }).notNull(),
  image_url: text('image_url').notNull(),
})

export const invoices = createTable('invoice', {
  id: int('id').primaryKey({ autoIncrement: true }),
  customer_id: text('customer_id').notNull().references(() => customers.id),
  amount: int('amount').notNull(),
  status: text('status', { enum: ['pending', 'paid'] }).notNull(),
  date: text('date').notNull(),
})

export const revenue = createTable('revenue', {
  month: text('month', { length: 3 }).notNull().primaryKey(),
  revenue: real('revenue').notNull(),
})

export type InsertUser = typeof users.$inferInsert
export type InsertCustomer = typeof customers.$inferInsert
export type InsertInvoice = typeof invoices.$inferInsert
export type InsertRevenue = typeof revenue.$inferInsert

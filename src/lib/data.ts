import { asc, desc, eq, like, or, sql } from 'drizzle-orm'

import { siteConfig } from '@/config/site'
import { db } from '@/db'
import { customers, invoices, revenue } from '@/db/schema'

import { formatCurrency, lower, lowerText } from './utils'

export async function fetchRevenue() {
  try {
    const revenueData = await db.select().from(revenue)
    return revenueData
  }
  catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}

export async function fetchLatestInvoice() {
  try {
    const invoicesData = await db
      .select({
        id: invoices.id,
        amount: invoices.amount,
        name: customers.name,
        email: customers.email,
        imageUrl: customers.image_url,
      })
      .from(invoices)
      .innerJoin(customers, eq(invoices.customer_id, customers.id))
      .orderBy(desc(invoices.date), desc(invoices.id))
      .limit(5)

    return invoicesData.map(invoice => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }))
  }
  catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch the latest invoices.')
  }
}

export async function fetchCardData() {
  try {
    const [invoiceCount, customerCount, invoiceStats] = await Promise.all([
      db.select({
        count: sql<number>`count(*)`.mapWith(Number),
      }).from(invoices),

      db.select({
        count: sql<number>`count(*)`.mapWith(Number),
      }).from(customers),

      db.select({
        paid: sql<number>`sum(case when status = 'paid' then amount else 0 end)`.mapWith(Number),
        pending: sql<number>`sum(case when status = 'pending' then amount else 0 end)`.mapWith(Number),
      }).from(invoices),
    ])

    return {
      numberOfInvoices: invoiceCount[0].count,
      numberOfCustomers: customerCount[0].count,
      totalPaidInvoices: formatCurrency(invoiceStats[0].paid),
      totalPendingInvoices: formatCurrency(invoiceStats[0].pending),
    }
  }
  catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch card data.')
  }
}

export async function fetchInvoicePages(query: string) {
  try {
    const count = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(invoices)
      .innerJoin(customers, eq(invoices.customer_id, customers.id))
      .where(
        or(
          like(lower(customers.name), `%${query}%`),
          like(lower(customers.email), `%${query}%`),
          like(lowerText(invoices.amount), `%${query}%`),
          like(lowerText(invoices.date), `%${query}%`),
          like(lower(invoices.status), `%${query}%`),
        ),
      )
    const totalPages = Math.ceil(count[0].count / siteConfig.itemsPerPage)
    return totalPages
  }
  catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of invoices.')
  }
}

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * siteConfig.itemsPerPage
  try {
    const invoicesData = await db
      .select({
        id: invoices.id,
        amount: invoices.amount,
        date: invoices.date,
        status: invoices.status,
        name: customers.name,
        email: customers.email,
        imageUrl: customers.image_url,
      })
      .from(invoices)
      .innerJoin(customers, eq(invoices.customer_id, customers.id))
      .where(
        or(
          like(lower(customers.name), `%${query}%`),
          like(lower(customers.email), `%${query}%`),
          like(lowerText(invoices.amount), `%${query}%`),
          like(lowerText(invoices.date), `%${query}%`),
          like(lower(invoices.status), `%${query}%`),
        ),
      )
      .orderBy(desc(invoices.date), desc(invoices.id))
      .limit(siteConfig.itemsPerPage)
      .offset(offset)
    return invoicesData
  }
  catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoices.')
  }
}

export async function fetchInvoiceById(id: number) {
  try {
    const invoice = await db.select().from(invoices).where(eq(invoices.id, id))
    return invoice[0]
  }
  catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoice.')
  }
}

export async function fetchCustomers() {
  try {
    const customersData = await db
      .select()
      .from(customers)
      .orderBy(asc(customers.name))
    return customersData
  }
  catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch all customers.')
  }
}

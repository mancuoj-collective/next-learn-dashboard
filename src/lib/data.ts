import { desc, eq, sql } from 'drizzle-orm'

import { db } from '@/db'
import { customers, invoices, revenue } from '@/db/schema'

import { formatCurrency } from './utils'

export async function fetchRevenue() {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
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
    await new Promise(resolve => setTimeout(resolve, 1500))
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
      .orderBy(desc(invoices.date))
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

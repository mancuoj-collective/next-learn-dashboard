'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { FormSchema } from '@/components/invoices'
import { db } from '@/db'
import { invoices } from '@/db/schema'

export type State = {
  message?: string | null
}

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return {
      message: 'Missing Fields. Failed to Create Invoice.',
    }
  }

  const { customerId, amount, status } = validatedFields.data
  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

  try {
    await db.insert(invoices).values({
      customer_id: customerId,
      amount: amountInCents,
      status,
      date,
    })
  }
  catch {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

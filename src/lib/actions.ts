'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'
import { z } from 'zod'

import { db } from '@/db'
import { invoices } from '@/db/schema'

import { signIn } from '../../auth'

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.' }),
  date: z.string(),
})

export type State = {
  message?: string | null
  errors?: {
    customerId?: string[]
    amount?: string[]
    status?: string[]
  }
}

const CreateInvoice = FormSchema.omit({ id: true, date: true })

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
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
  } catch {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard/invoices')
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true })

export async function updateInvoice(id: number, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    }
  }

  const { customerId, amount, status } = validatedFields.data
  const amountInCents = amount * 100

  try {
    await db.update(invoices)
      .set({ customer_id: customerId, amount: amountInCents, status })
      .where(eq(invoices.id, id))
  } catch {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard/invoices')
}

export async function deleteInvoice(id: number) {
  try {
    await db.delete(invoices).where(eq(invoices.id, id))
    revalidatePath('/dashboard')
    return { message: 'Deleted Invoice.' }
  } catch {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    }
  }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return 'Invalid credentials.'
        }
        default: {
          return 'Something went wrong.'
        }
      }
    }
    throw error
  }
}

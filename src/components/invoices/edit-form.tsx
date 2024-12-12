'use client'

import { DollarSign, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import type { InsertCustomer } from '@/db/schema'
import type { State } from '@/lib/actions'
import { updateInvoice } from '@/lib/actions'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { StatusBadge } from './badge'

export function EditForm({ invoice, customers }: {
  invoice: {
    id: number
    customer_id: string
    amount: number
    status: string
  }
  customers: InsertCustomer[]
}) {
  const initialState: State = { message: null, errors: {} }
  const updateInvoiceAction = updateInvoice.bind(null, invoice.id)
  const [state, formAction, isPending] = useActionState(updateInvoiceAction, initialState)

  useEffect(() => {
    if (state.message) {
      toast.error(state.message)
    }
  }, [state.message])

  return (
    <form action={formAction}>
      <div className="rounded-lg bg-secondary p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className={cn(
                'peer block w-full cursor-pointer rounded-md bg-background',
                'py-2 pl-9 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-primary',
              )}
              defaultValue={invoice.customer_id}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircle className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId && state.errors.customerId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              defaultValue={invoice.amount / 100}
              placeholder="Enter USD amount"
              className={cn(
                'peer block w-full rounded-md bg-background',
                'py-2 pl-10 text-sm placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary',
              )}
              aria-describedby="amount-error"
            />
            <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
          </div>

          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount && state.errors.amount.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border bg-background p-3">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="size-4 cursor-pointer accent-primary"
                  defaultChecked={invoice.status === 'pending'}
                />
                <label htmlFor="pending">
                  <StatusBadge status="pending" />
                </label>
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="size-4 cursor-pointer accent-primary"
                  defaultChecked={invoice.status === 'paid'}
                />
                <label htmlFor="paid">
                  <StatusBadge status="paid" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status && state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="secondary" asChild>
          <Link href="/dashboard/invoices">Cancel</Link>
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Editing...' : 'Edit invoice'}
        </Button>
      </div>
    </form>
  )
}

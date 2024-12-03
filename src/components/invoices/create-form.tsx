'use client'

import { DollarSign, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'

import type { InsertCustomer } from '@/db/schema'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { StatusBadge } from './badge'

export function CreateForm({ customers }: { customers: InsertCustomer[] }) {
  return (
    <form action="">
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
                'py-2 pl-10 text-sm placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary',
              )}
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>Select a customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step={0.01}
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
                  type="radio"
                  id="pending"
                  name="status"
                  value="pending"
                  className="size-4 cursor-pointer"
                />
                <label htmlFor="pending">
                  <StatusBadge status="pending" />
                </label>
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="radio"
                  id="paid"
                  name="status"
                  value="paid"
                  className="size-4 cursor-pointer"
                />
                <label htmlFor="paid">
                  <StatusBadge status="paid" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button variant="secondary" asChild>
          <Link href="/dashboard/invoices">Cancel</Link>
        </Button>
        <Button type="submit">Create invoice</Button>
      </div>
    </form>
  )
}

import { PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export function CreateInvoiceButton() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className={cn(
        'flex h-10 items-center gap-1.5',
        'rounded-md px-4 text-sm font-medium',
        'bg-primary text-primary-foreground transition-colors hover:bg-primary/80',
      )}
    >
      <span className="hidden md:block">Create Invoice</span>
      <span className="i-mingcute-add-line size-4" />
    </Link>
  )
}

export function UpdateInvoiceButton() {
  return (
    <button type="submit" className="rounded-md border p-2 hover:bg-secondary">
      <PencilIcon className="size-4" />
      <span className="sr-only">Edit</span>
    </button>
  )
}

export function DeleteInvoiceButton() {
  return (
    <button type="submit" className="rounded-md border p-2 hover:bg-secondary">
      <TrashIcon className="size-4" />
      <span className="sr-only">Delete</span>
    </button>
  )
}

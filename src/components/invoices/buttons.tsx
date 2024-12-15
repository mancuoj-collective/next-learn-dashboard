import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteInvoice } from '@/lib/actions'
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
      <PlusIcon className="size-4" />
    </Link>
  )
}

export function UpdateInvoiceButton({ id }: { id: number }) {
  return (
    <Link href={`/dashboard/invoices/${id}/edit`} className="rounded-md border p-2 hover:bg-secondary">
      <PencilIcon className="size-4" />
      <span className="sr-only">Edit</span>
    </Link>
  )
}

export function DeleteInvoiceButton({ id }: { id: number }) {
  async function deleteInvoiceWithId(_formData: FormData) {
    'use server'
    await deleteInvoice(id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" className="rounded-md border p-2 hover:bg-secondary">
          <TrashIcon className="size-4" />
          <span className="sr-only">Delete</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this invoice?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your invoice and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteInvoiceWithId}>
            <AlertDialogAction type="submit" className="w-full">
              Delete
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

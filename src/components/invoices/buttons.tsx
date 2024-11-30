import { PencilIcon, TrashIcon } from 'lucide-react'

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

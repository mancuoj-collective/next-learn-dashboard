import Image from 'next/image'

import { fetchFilteredInvoices } from '@/lib/data'
import { cn, formatCurrency, formatDate } from '@/lib/utils'

import { StatusBadge } from './badge'
import { DeleteInvoiceButton, UpdateInvoiceButton } from './buttons'

export async function InvoicesTable({ query, currentPage }: {
  query: string
  currentPage: number
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-secondary p-4 md:pt-0">
          <div className="md:hidden">
            {invoices.map(invoice => (
              <div key={invoice.id} className="mb-3 w-full rounded-md bg-background p-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.imageUrl}
                        alt={`${invoice.name}'s profile picture`}
                        width={28}
                        height={28}
                        className="mr-2 rounded-full"
                      />
                      <p className="text-sm font-medium">{invoice.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{invoice.email}</p>
                  </div>
                  <StatusBadge status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{formatCurrency(invoice.amount)}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoiceButton />
                    <DeleteInvoiceButton />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <table className="hidden min-w-full md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="py-5 pl-6 pr-4 text-left font-medium">Customer</th>
                <th scope="col" className="px-3 py-5 font-medium">Email</th>
                <th scope="col" className="px-3 py-5 font-medium">Amount</th>
                <th scope="col" className="px-3 py-5 font-medium">Date</th>
                <th scope="col" className="px-3 py-5 font-medium">Status</th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-background">
              {invoices.map(invoice => (
                <tr
                  key={invoice.id}
                  className={cn(
                    'w-full border-b text-sm',
                    'last-of-type:border-none',
                    '[&:first-child>td:first-child]:rounded-tl-lg',
                    '[&:first-child>td:last-child]:rounded-tr-lg',
                    '[&:last-child>td:first-child]:rounded-bl-lg',
                    '[&:last-child>td:last-child]:rounded-br-lg',
                  )}
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.imageUrl}
                        alt={`${invoice.name}'s profile picture`}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap p-3">{invoice.email}</td>
                  <td className="whitespace-nowrap p-3">{formatCurrency(invoice.amount)}</td>
                  <td className="whitespace-nowrap p-3">{formatDate(invoice.date)}</td>
                  <td className="whitespace-nowrap p-3">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <UpdateInvoiceButton />
                      <DeleteInvoiceButton />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

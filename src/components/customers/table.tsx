import Image from 'next/image'

import { cn, formatCurrency } from '@/lib/utils'

import { EmptyState } from '../empty-state'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

export function CustomersTable({ customers }: { customers: {
  id: string
  name: string
  email: string
  imageUrl: string
  total_invoices: number
  total_pending: number
  total_paid: number
}[] }) {
  return (
    <div className="mt-6 rounded-lg bg-secondary p-4 md:pt-0">
      <div className="md:hidden">
        {customers.length > 0 ? customers.map(customer => (
          <div key={customer.id} className="mb-3 w-full rounded-md bg-background p-4">
            <div className="border-b pb-3">
              <div className="mb-2 flex items-center">
                <Image src={customer.imageUrl} alt={`${customer.name}'s profile picture`} width={28} height={28} className="mr-2 rounded-full" />
                <p className="text-sm font-medium">{customer.name}</p>
              </div>
              <p className="text-sm text-muted-foreground">{customer.email}</p>
            </div>
            <div className="flex w-full items-center justify-between border-b py-3">
              <div className="w-1/2 space-y-1">
                <p className="text-xs">Pending</p>
                <p className="font-medium">{formatCurrency(customer.total_pending)}</p>
              </div>
              <div className="w-1/2 space-y-1">
                <p className="text-xs">Paid</p>
                <p className="font-medium">{formatCurrency(customer.total_paid)}</p>
              </div>
            </div>
            <p className="pt-3 text-sm">{customer.total_invoices} invoices</p>
          </div>
        )) : <EmptyState className="rounded-lg bg-background" />}
      </div>

      <Table className="hidden min-w-full md:table">
        <TableHeader className="rounded-lg text-left text-sm">
          <TableRow className="whitespace-nowrap border-none">
            <TableHead className="px-4 py-5 sm:pl-6">Name</TableHead>
            <TableHead className="px-3 py-5">Email</TableHead>
            <TableHead className="px-3 py-5">Total Invoices</TableHead>
            <TableHead className="px-3 py-5">Total Pending</TableHead>
            <TableHead className="px-4 py-5">Total Paid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-background">
          {customers.length > 0
            ? customers.map(customer => (
                <TableRow
                  key={customer.id}
                  className={cn(
                    '[&:first-child>td:first-child]:rounded-tl-lg',
                    '[&:first-child>td:last-child]:rounded-tr-lg',
                    '[&:last-child>td:first-child]:rounded-bl-lg',
                    '[&:last-child>td:last-child]:rounded-br-lg',
                  )}
                >
                  <TableCell className="whitespace-nowrap px-4 py-5 sm:pl-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={customer.imageUrl}
                        alt={`${customer.name}'s profile picture`}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <p>{customer.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-5">{customer.email}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-5">{customer.total_invoices}</TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-5">{formatCurrency(customer.total_pending)}</TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-5">{formatCurrency(customer.total_paid)}</TableCell>
                </TableRow>
              ))
            : (
                <TableRow>
                  <TableCell colSpan={7} className="rounded-lg">
                    <EmptyState />
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>
    </div>
  )
}

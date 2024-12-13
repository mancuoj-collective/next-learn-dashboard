import { cn } from '@/lib/utils'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const shimmer = cn(
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
  'before:bg-gradient-to-r before:from-transparent before:via-muted-foreground/50 before:to-transparent',
  'before:z-[1]',
  'relative',
)

export function CustomersPageSkeleton() {
  return (
    <>
      <div className={cn('relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-muted-foreground/20 md:mb-8 md:h-9', shimmer)} />
      <div className={cn('relative h-10 overflow-hidden rounded-md bg-muted-foreground/20', shimmer)} />
      <CustomersTableSkeleton />
    </>
  )
}

export function CustomersTableSkeleton() {
  return (
    <div className={cn('relative mt-6 overflow-hidden rounded-lg bg-secondary p-4 md:pt-0', shimmer)}>
      <div className="md:hidden">
        <CustomersTableMobileRowSkeleton />
        <CustomersTableMobileRowSkeleton />
        <CustomersTableMobileRowSkeleton />
        <CustomersTableMobileRowSkeleton />
        <CustomersTableMobileRowSkeleton />
        <CustomersTableMobileRowSkeleton />
      </div>
      <Table className="hidden min-w-full md:table">
        <TableHeader className="rounded-lg text-left text-sm font-normal">
          <TableRow className="whitespace-nowrap border-none">
            <TableHead className="px-4 py-5 sm:pl-6">Name</TableHead>
            <TableHead className="px-3 py-5">Email</TableHead>
            <TableHead className="px-3 py-5">Total Invoices</TableHead>
            <TableHead className="px-3 py-5">Total Pending</TableHead>
            <TableHead className="px-4 py-5">Total Paid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-background">
          <CustomersTableRowSkeleton />
          <CustomersTableRowSkeleton />
          <CustomersTableRowSkeleton />
          <CustomersTableRowSkeleton />
          <CustomersTableRowSkeleton />
          <CustomersTableRowSkeleton />
        </TableBody>
      </Table>
    </div>
  )
}

export function CustomersTableMobileRowSkeleton() {
  return (
    <div className="mb-3 w-full rounded-md bg-background p-4">
      <div className="border-b pb-3">
        <div className="mb-2 flex items-center">
          <div className="mr-2 size-[28px] rounded-full bg-muted-foreground/20" />
          <div className="h-5 w-20 rounded bg-muted-foreground/20" />
        </div>
        <div className="h-5 w-24 rounded bg-muted-foreground/20" />
      </div>
      <div className="flex w-full items-center justify-between border-b py-3">
        <div className="w-1/2 space-y-1">
          <div className="h-4 w-12 rounded bg-muted-foreground/20" />
          <div className="h-6 w-20 rounded bg-muted-foreground/20" />
        </div>
        <div className="w-1/2 space-y-1">
          <div className="h-4 w-12 rounded bg-muted-foreground/20" />
          <div className="h-6 w-20 rounded bg-muted-foreground/20" />
        </div>
      </div>
      <div className="pt-3">
        <div className="h-6 w-16 rounded bg-muted-foreground/20" />
      </div>
    </div>
  )
}

export function CustomersTableRowSkeleton() {
  return (
    <TableRow
      className={cn(
        '[&:first-child>td:first-child]:rounded-tl-lg',
        '[&:first-child>td:last-child]:rounded-tr-lg',
        '[&:last-child>td:first-child]:rounded-bl-lg',
        '[&:last-child>td:last-child]:rounded-br-lg',
      )}
    >
      <TableCell className="whitespace-nowrap px-4 py-5 sm:pl-6">
        <div className="flex items-center gap-3">
          <div className="size-7 rounded-full bg-muted-foreground/20" />
          <div className="h-6 w-32 rounded bg-muted-foreground/20" />
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap px-3 py-5">
        <div className="h-6 w-36 rounded bg-muted-foreground/20" />
      </TableCell>
      <TableCell className="whitespace-nowrap px-3 py-5">
        <div className="h-6 w-24 rounded bg-muted-foreground/20" />
      </TableCell>
      <TableCell className="whitespace-nowrap px-3 py-5">
        <div className="h-6 w-24 rounded bg-muted-foreground/20" />
      </TableCell>
      <TableCell className="whitespace-nowrap px-4 py-5">
        <div className="h-6 w-24 rounded bg-muted-foreground/20" />
      </TableCell>
    </TableRow>
  )
}

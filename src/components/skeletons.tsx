import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const shimmer = cn(
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
  'before:bg-gradient-to-r before:from-transparent before:via-muted-foreground/50 before:to-transparent',
)

export function DashboardPageSkeleton() {
  return (
    <>
      <div className={cn('relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-muted-foreground/20 md:h-9', shimmer)} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardGroupSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  )
}

export function InvoicesPageSkeleton() {
  return (
    <>
      <div className={cn('relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-muted-foreground/20 md:mb-8 md:h-9', shimmer)} />
      <div className="flex items-center justify-between gap-2.5">
        <div className="relative flex-1 overflow-hidden">
          <div className={cn('h-10 rounded-md bg-muted-foreground/20', shimmer)} />
        </div>
        <div className="relative overflow-hidden">
          <div className={cn('h-10 w-36 rounded-md bg-muted-foreground/20', shimmer)} />
        </div>
      </div>
      <InvoicesTableSkeleton />
      <div className="mt-5 flex w-full justify-center gap-2 md:gap-4">
        <div className={cn('relative size-10 overflow-hidden rounded-md bg-muted-foreground/20', shimmer)} />
        <div className={cn('relative h-10 w-32 overflow-hidden rounded-md bg-muted-foreground/20', shimmer)} />
        <div className={cn('relative size-10 overflow-hidden rounded-md bg-muted-foreground/20', shimmer)} />
      </div>
    </>
  )
}

export function CardSkeleton() {
  return (
    <div className={cn('relative overflow-hidden rounded-lg bg-secondary p-3 shadow-sm', shimmer)}>
      <div className="flex p-2 md:p-4">
        <div className="size-5 rounded-md bg-muted-foreground/20" />
        <div className="ml-2 h-5 w-16 rounded-md bg-muted-foreground/20 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center rounded-lg bg-background px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-muted-foreground/20" />
      </div>
    </div>
  )
}

export function CardGroupSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  )
}

export function RevenueChartSkeleton() {
  return (
    <div className={cn('relative w-full overflow-hidden md:col-span-4', shimmer)}>
      <div className="mb-4 h-8 w-36 rounded-md bg-muted-foreground/20" />
      <div className="rounded-lg bg-secondary p-4">
        <div className="rounded-md bg-background p-4">
          <div className="aspect-square min-h-[260px] w-full md:aspect-video md:h-[360px]" />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="size-5 rounded-full bg-muted-foreground/20" />
          <div className="ml-2 h-5 w-20 rounded-md bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  )
}

export function InvoiceSkeleton() {
  return (
    <div className="flex items-center justify-between border-muted-foreground py-4">
      <div className="flex items-center">
        <div className="mr-2 size-8 rounded-full bg-muted-foreground/20" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-muted-foreground/20" />
          <div className="mt-2 h-4 w-12 rounded-md bg-muted-foreground/20" />
        </div>
      </div>
      <div className="h-4 w-12 rounded-md bg-muted-foreground/20" />
    </div>
  )
}

export function LatestInvoicesSkeleton() {
  return (
    <div className={cn('relative flex w-full flex-col overflow-hidden md:col-span-4', shimmer)}>
      <div className="mb-4 h-8 w-36 rounded-md bg-muted-foreground/20" />
      <div className="flex grow flex-col justify-between rounded-lg bg-secondary p-4">
        <div className="grow divide-y rounded-lg bg-background px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="size-5 rounded-full bg-muted-foreground/20" />
          <div className="ml-2 h-5 w-20 rounded-md bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  )
}

export function InvoicesTableSkeleton() {
  return (
    <div className="relative mt-6 w-full overflow-hidden">
      <div className="rounded-lg bg-secondary p-4 md:pt-0">
        <div className="md:hidden">
          {Array.from({ length: siteConfig.itemsPerPage }).map((_, i) => (
            <InvoicesMobileRowSkeleton key={i} />
          ))}
        </div>
        <Table className="hidden min-w-full md:table">
          <TableHeader className="rounded-lg text-left text-sm font-normal">
            <TableRow className="border-none">
              <TableHead className="py-5 pl-6 pr-4 text-left font-medium">Customer</TableHead>
              <TableHead className="px-3 py-5 font-medium">Email</TableHead>
              <TableHead className="px-3 py-5 font-medium">Amount</TableHead>
              <TableHead className="px-3 py-5 font-medium">Date</TableHead>
              <TableHead className="px-3 py-5 font-medium">Status</TableHead>
              <TableHead className="relative py-3 pl-6 pr-3">
                <span className="sr-only">Edit</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-background">
            {Array.from({ length: siteConfig.itemsPerPage }).map((_, i) => (
              <InvoicesTableSkeletonRow key={i} />
            ))}
          </TableBody>
        </Table>
        <div className={cn('absolute inset-0', shimmer)} />
      </div>
    </div>
  )
}

export function InvoicesMobileRowSkeleton() {
  return (
    <div className="mb-3 w-full rounded-md bg-background p-4">
      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <div className="mb-2 flex items-center">
            <div className="mr-2 size-[28px] rounded-full bg-muted-foreground/20" />
            <div className="h-5 w-20 rounded bg-muted-foreground/20" />
          </div>
          <div className="h-5 w-24 rounded bg-muted-foreground/20" />
        </div>
        <div className="h-5 w-12 rounded bg-muted-foreground/20" />
      </div>
      <div className="flex w-full items-center justify-between pt-3">
        <div className="space-y-1">
          <div className="h-5 w-12 rounded bg-muted-foreground/20" />
          <div className="h-4 w-20 rounded bg-muted-foreground/20" />
        </div>
        <div className="flex justify-end gap-2">
          <div className="size-8 rounded bg-muted-foreground/20" />
          <div className="size-8 rounded bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  )
}

export function InvoicesTableSkeletonRow() {
  return (
    <TableRow
      className={cn(
        '[&:first-child>td:first-child]:rounded-tl-lg',
        '[&:first-child>td:last-child]:rounded-tr-lg',
        '[&:last-child>td:first-child]:rounded-bl-lg',
        '[&:last-child>td:last-child]:rounded-br-lg',
      )}
    >
      <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-muted-foreground/20" />
          <div className="h-8 w-24 rounded bg-muted-foreground/20" />
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap p-3">
        <div className="h-8 w-32 rounded bg-muted-foreground/20" />
      </TableCell>
      <TableCell className="whitespace-nowrap p-3">
        <div className="h-8 w-16 rounded bg-muted-foreground/20" />
      </TableCell>
      <TableCell className="whitespace-nowrap p-3">
        <div className="h-8 w-16 rounded bg-muted-foreground/20" />
      </TableCell>
      <TableCell className="whitespace-nowrap p-3">
        <div className="h-8 w-16 rounded bg-muted-foreground/20" />
      </TableCell>
      <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-2">
          <div className="size-8 rounded bg-muted-foreground/20" />
          <div className="size-8 rounded bg-muted-foreground/20" />
        </div>
      </TableCell>
    </TableRow>
  )
}

export function FormSkeleton() {
  return (
    <div className={cn('relative h-[280px] overflow-hidden rounded-lg bg-secondary p-4 md:p-6', shimmer)} />
  )
}

export function FormPageSkeleton() {
  return (
    <>
      <div className={cn('relative mb-6 h-8 w-80 overflow-hidden rounded-md bg-muted-foreground/20 md:h-9', shimmer)} />
      <FormSkeleton />
      <div className="mt-6 flex justify-end gap-4">
        <div className={cn('relative h-9 w-24 overflow-hidden rounded-md bg-muted-foreground/20', shimmer)} />
        <div className={cn('relative h-9 w-28 overflow-hidden rounded-md bg-muted-foreground/20', shimmer)} />
      </div>
    </>
  )
}

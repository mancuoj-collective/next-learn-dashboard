import { cn } from '@/lib/utils'

const shimmer = cn(
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
  'before:bg-gradient-to-r before:from-transparent before:via-muted-foreground/50 before:to-transparent',
)

export function DashboardPageSkeleton() {
  return (
    <>
      <div className={cn('relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-muted-foreground/20 md:mb-8 md:h-9', shimmer)} />
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

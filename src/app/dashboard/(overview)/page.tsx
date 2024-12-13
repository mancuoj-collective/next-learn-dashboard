import { Suspense } from 'react'

import { CardGroup, LatestInvoices, RevenueChart } from '@/components/dashboard'
import { lusitana } from '@/components/fonts'
import { CardGroupSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/components/skeletons'
import { cn } from '@/lib/utils'

export default function Page() {
  return (
    <main>
      <h1 className={cn('mb-4 pl-1 text-2xl md:mb-8 md:text-3xl', lusitana.className)}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardGroupSkeleton />}>
          <CardGroup />
        </Suspense>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  )
}

import { Suspense } from 'react'

import {
  CardGroup,
  CardGroupSkeleton,
  LatestInvoices,
  LatestInvoicesSkeleton,
  RevenueChart,
  RevenueChartSkeleton,
} from '@/components/dashboard'

export default function Page() {
  return (
    <main>
      <h1 className="mb-4 pl-1 font-serif text-2xl md:mb-8 md:text-3xl">Dashboard</h1>
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

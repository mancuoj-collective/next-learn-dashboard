import type { Metadata } from 'next'
import type { SearchParams } from 'nuqs'
import { Suspense } from 'react'

import { CustomersTable, CustomersTableSkeleton } from '@/components/customers'
import { Search } from '@/components/search'
import { searchParamsCache } from '@/components/search-params'
import { fetchFilteredCustomers } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Customers',
}

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { query } = await searchParamsCache.parse(searchParams)
  const customers = await fetchFilteredCustomers(query)

  return (
    <main>
      <h1 className="mb-4 pl-1 font-serif text-2xl md:mb-8 md:text-3xl">Customers</h1>
      <Search placeholder="Search customers ..." />
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </main>
  )
}

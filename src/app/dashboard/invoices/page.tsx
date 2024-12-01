import type { Metadata } from 'next'
import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

import { lusitana } from '@/components/fonts'
import { InvoicesPagination, InvoicesTable, searchParamsCache } from '@/components/invoices'
import { InvoicesTableSkeleton } from '@/components/skeletons'
import { fetchInvoicePages } from '@/lib/data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Invoices',
}

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { query, page: currentPage } = await searchParamsCache.parse(searchParams)
  const totalPages = await fetchInvoicePages(query)

  return (
    <main>
      <h1 className={cn('mb-4 pl-1 text-2xl md:text-3xl', lusitana.className)}>Invoices</h1>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <InvoicesPagination totalPages={totalPages} />
      </div>
    </main>
  )
}

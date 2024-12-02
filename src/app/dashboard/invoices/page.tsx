import type { Metadata } from 'next'
import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

import { lusitana } from '@/components/fonts'
import { CreateInvoiceButton, InvoicesPagination, InvoicesTable } from '@/components/invoices'
import { Search } from '@/components/search'
import { searchParamsCache } from '@/components/search-params'
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
      <h1 className={cn('mb-4 pl-1 text-2xl md:mb-8 md:text-3xl', lusitana.className)}>Invoices</h1>
      <div className="flex items-center justify-between gap-2.5">
        <Search placeholder="Search invoices ..." />
        <CreateInvoiceButton />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {totalPages > 0 && <InvoicesPagination totalPages={totalPages} />}
      </div>
    </main>
  )
}

import type { Metadata } from 'next'
import { Suspense } from 'react'

import { lusitana } from '@/components/fonts'
import { InvoicesTable, Pagination } from '@/components/invoices'
import { fetchInvoicePages } from '@/lib/data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Invoices',
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = await fetchInvoicePages(query)

  return (
    <main>
      <h1 className={cn('mb-4 pl-1 text-2xl md:text-3xl', lusitana.className)}>Invoices</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}

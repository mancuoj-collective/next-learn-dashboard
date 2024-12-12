import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Breadcrumb, CreateForm } from '@/components/invoices'
import { FormSkeleton } from '@/components/skeletons'
import { fetchCustomers } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Create Invoice',
}

export default async function Page() {
  const customers = await fetchCustomers()

  return (
    <main>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          { label: 'Create Invoices', href: '/dashboard/invoices/create', active: true },
        ]}
      />
      <Suspense fallback={<FormSkeleton />}>
        <CreateForm customers={customers} />
      </Suspense>
    </main>
  )
}

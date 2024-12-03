import type { Metadata } from 'next'

import { Breadcrumb, CreateForm } from '@/components/invoices'
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
      <CreateForm customers={customers} />
    </main>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { Breadcrumb, FormSkeleton } from '@/components/invoices'
import { EditForm } from '@/components/invoices/edit-form'
import { fetchCustomers, fetchInvoiceById } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Edit Invoice',
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(Number(id)),
    fetchCustomers(),
  ])

  if (!invoice) {
    notFound()
  }

  return (
    <main>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<FormSkeleton />}>
        <EditForm invoice={invoice} customers={customers} />
      </Suspense>
    </main>
  )
}

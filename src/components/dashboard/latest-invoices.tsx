import Image from 'next/image'

import { fetchLatestInvoice } from '@/lib/data'
import { cn } from '@/lib/utils'

import { lusitana } from '../fonts'

export async function LatestInvoices() {
  const invoices = await fetchLatestInvoice()

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={cn('mb-4 text-xl md:text-2xl', lusitana.className)}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-lg bg-secondary p-4">
        <div className="grow divide-y rounded-lg bg-background px-6">
          {invoices.map(invoice => (
            <div key={invoice.id} className="flex items-center justify-between py-4">
              <div className="flex items-center">
                <Image
                  src={invoice.imageUrl}
                  alt={`${invoice.name}'s profile picture`}
                  className="mr-4 rounded-full"
                  width={32}
                  height={32}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">{invoice.name}</p>
                  <p className="hidden truncate text-sm text-muted-foreground md:block">{invoice.email}</p>
                </div>
              </div>
              <p className={cn('truncate text-sm font-medium md:text-base', lusitana.className)}>
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="i-mingcute-refresh-2-line size-5 bg-muted-foreground" />
          <h3 className="ml-2 text-sm text-muted-foreground">Updated just now</h3>
        </div>
      </div>
    </div>
  )
}

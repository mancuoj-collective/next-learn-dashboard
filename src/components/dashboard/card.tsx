import { ClockIcon, CreditCardIcon, InboxIcon, UsersIcon } from 'lucide-react'

import { fetchCardData } from '@/lib/data'
import { cn } from '@/lib/utils'

import { lusitana } from '../fonts'

interface CardProps {
  title: string
  value: number | string
  type: 'invoices' | 'customers' | 'pending' | 'collected'
}

const iconMap = {
  invoices: InboxIcon,
  customers: UsersIcon,
  pending: ClockIcon,
  collected: CreditCardIcon,
}

export function Card({ title, value, type }: CardProps) {
  const Icon = iconMap[type]

  return (
    <div className="rounded-lg bg-secondary p-3 shadow-sm">
      <div className="flex px-2 py-4">
        <Icon className="size-5 text-muted-foreground" />
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className={cn('truncate rounded-lg bg-background px-4 py-8 text-center text-2xl', lusitana.className)}>
        {value}
      </p>
    </div>
  )
}

export async function CardGroup() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData()

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </>
  )
}

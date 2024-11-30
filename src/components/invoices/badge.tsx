import { CheckIcon, ClockIcon } from 'lucide-react'

import type { InsertInvoice } from '@/db/schema'
import { cn } from '@/lib/utils'

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-secondary text-secondary-foreground',
    icon: ClockIcon,
  },
  paid: {
    label: 'Paid',
    className: 'bg-primary text-primary-foreground',
    icon: CheckIcon,
  },
}

export function StatusBadge({ status }: { status: InsertInvoice['status'] }) {
  const { label, className, icon: Icon } = statusConfig[status]

  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs', className)}>
      {label}
      <Icon className="ml-1 size-3.5" />
    </span>
  )
}

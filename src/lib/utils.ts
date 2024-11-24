import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { InsertRevenue } from '@/db/schema'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateYAxis = (revenue: InsertRevenue[]) => {
  const yAxisLabels = []
  const highestRecord = Math.max(...revenue.map(month => month.revenue))
  const topLabel = Math.ceil(highestRecord / 1000) * 1000

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`)
  }

  return { yAxisLabels, topLabel }
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

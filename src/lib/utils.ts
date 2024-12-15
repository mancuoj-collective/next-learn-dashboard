import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { sql } from 'drizzle-orm'
import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay() {
  const random = Math.floor(Math.random() * 2000) + 1000
  return new Promise(resolve => setTimeout(resolve, random))
}

export function formatCurrency(amount: number) {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export function formatDate(dateStr: string, locale = 'en-US') {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function lower(col: AnySQLiteColumn) {
  return sql`lower(${col})`
}

export function lowerText(col: AnySQLiteColumn) {
  return sql`lower(CAST(${col} AS TEXT))`
}

export function generatePagination(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}

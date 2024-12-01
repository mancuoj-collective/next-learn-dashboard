import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { cn, generatePagination } from '@/lib/utils'

import { searchParamsCache, serialize } from './search-params'

export function InvoicesPagination({ totalPages }: { totalPages: number }) {
  const currentPage = searchParamsCache.get('page')

  const createPageURL = (pageNumber: number) => {
    return serialize('/dashboard/invoices', { page: pageNumber })
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <div className="inline-flex items-center gap-2 md:gap-4">
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        isDisabled={currentPage === 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'middle' | 'single' | undefined
          if (index === 0) position = 'first'
          if (index === allPages.length - 1) position = 'last'
          if (allPages.length === 1) position = 'single'
          if (page === '...') position = 'middle'
          return (
            <PaginationNumber
              key={`${page}-${index}`}
              page={page}
              href={typeof page === 'number' ? createPageURL(page) : ''}
              isActive={currentPage === page}
              position={position}
            />
          )
        })}
      </div>

      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        isDisabled={currentPage === totalPages}
      />
    </div>
  )
}

function PaginationNumber({ page, href, isActive, position }: {
  page: number | string
  href: string
  isActive: boolean
  position?: 'first' | 'last' | 'middle' | 'single'
}) {
  const className = cn(
    'flex size-10 items-center justify-center border text-sm',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-primary text-primary-foreground': isActive,
      'hover:bg-secondary': !isActive && position !== 'middle',
      'text-muted-foreground': position === 'middle',
    },
  )

  return isActive || position === 'middle'
    ? (
        <div className={className}>{page}</div>
      )
    : (
        <Link href={href} className={className}>{page}</Link>
      )
}

function PaginationArrow({ href, direction, isDisabled }: {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
}) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  const className = cn(
    'flex size-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-muted-foreground/20': isDisabled,
      'hover:bg-secondary': !isDisabled,
    },
  )

  return isDisabled
    ? (
        <div className={className}><Icon /></div>
      )
    : (
        <Link href={href} className={className}><Icon /></Link>
      )
}

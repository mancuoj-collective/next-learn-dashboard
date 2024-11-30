'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { cn, generatePagination } from '@/lib/utils'

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <div className="inline-flex">
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
              href={createPageURL(page)}
              isActive={currentPage === page}
              position={position}
            />
          )
        })}
      </div>
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

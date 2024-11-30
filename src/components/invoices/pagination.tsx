import { useSearchParams } from 'next/navigation'

import { generatePagination } from '@/lib/utils'

export function Pagination({ totalPages }: { totalPages: number }) {
  // const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  // const createPageURL = (pageNumber: number | string) => {
  //   const params = new URLSearchParams(searchParams)
  //   params.set('page', pageNumber.toString())
  //   return `${pathname}?${params.toString()}`
  // }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <div className="inline-flex">
      {allPages}
    </div>
  )
}

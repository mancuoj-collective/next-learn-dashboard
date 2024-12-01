'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'

import { cn } from '@/lib/utils'

import { serialize } from './search-params'

export function Search({ placeholder }: { placeholder: string }) {
  const pathname = usePathname()
  const [query] = useQueryState('query')
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    replace(serialize(pathname, { page: 1, query: term || null }))
  }, 300)

  return (
    <div className="relative flex flex-1 shrink-0 items-center">
      <label htmlFor="search" className="sr-only">Search</label>
      <input
        id="search"
        className={cn(
          'peer block w-full rounded-md border py-2.5 pl-10 text-sm',
          'bg-background text-foreground',
          'focus:outline-none focus:ring-2 focus:ring-primary',
        )}
        placeholder={placeholder}
        onChange={e => handleSearch(e.target.value)}
        defaultValue={query || ''}
      />
      <span className="i-mingcute-search-line absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
    </div>
  )
}

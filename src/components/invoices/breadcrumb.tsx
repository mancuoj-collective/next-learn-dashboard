import Link from 'next/link'

import { cn } from '@/lib/utils'

interface Breadcrumb {
  label: string
  href: string
  active?: boolean
}

export function Breadcrumb({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex pl-1 font-serif text-2xl md:text-3xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={cn(breadcrumb.active ? 'text-foreground' : 'text-muted-foreground')}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 && <span className="mx-3 inline-block">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

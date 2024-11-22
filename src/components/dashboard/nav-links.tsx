'use client'

import { LucideFileText, LucideHome, LucideUsers } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const links = [
  { name: 'Home', href: '/dashboard', icon: LucideHome },
  { name: 'Invoices', href: '/dashboard/invoices', icon: LucideFileText },
  { name: 'Customers', href: '/dashboard/customers', icon: LucideUsers },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {links.map(link => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            'flex h-12 grow items-center justify-center gap-2 md:flex-none md:justify-start',
            'rounded-md text-sm font-medium',
            'p-3 md:py-2',
            'bg-secondary hover:bg-primary/20 hover:text-primary/80',
            {
              'bg-primary/20 text-primary/80': pathname === link.href,
            },
          )}
        >
          <link.icon className="size-6" />
          <p className="hidden md:block">{link.name}</p>
        </Link>
      ))}
    </>
  )
}

import Link from 'next/link'

import { cn } from '@/lib/utils'

import { signOut } from '../../../auth'
import { AcmeLogo } from '../acme-logo'
import { DarkModeToggle, ThemeDialog } from '../theme'
import { NavLinks } from './nav-links'

export function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4">
      <Link href="/" className="mb-2 flex h-28 items-end rounded-md bg-primary p-4 md:h-40">
        <AcmeLogo />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-secondary md:block" />
        <div className="flex items-center justify-between gap-2">
          <form
            action={async () => {
              'use server'
              await signOut()
            }}
            className="grow"
          >
            <button
              type="submit"
              className={cn(
                'flex h-12 w-full grow items-center justify-center gap-2 md:flex-none md:justify-start',
                'rounded-md text-sm font-medium',
                'p-3 md:py-2',
                'bg-secondary hover:bg-primary/20 hover:text-primary/80',
              )}
            >
              <div className="i-mingcute-power-line size-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
          <DarkModeToggle className="hidden h-12 rounded-md bg-secondary p-3 hover:bg-primary/20 hover:text-primary/80 md:inline-flex md:py-2" />
          <ThemeDialog />
        </div>
      </div>
    </div>
  )
}

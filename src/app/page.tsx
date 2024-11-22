import Link from 'next/link'

import { AcmeLogo } from '@/components/acme-logo'
import { cn } from '@/lib/utils'

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-primary p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <Login />
        <Hero />
      </div>
    </div>
  )
}

function Login() {
  return (
    <div className={cn('flex flex-col justify-center gap-6 rounded-lg bg-card', 'px-6 py-10 md:w-2/5 md:px-20')}>
      <p className={cn('text-xl')}>
        <strong>Welcome to Acme.</strong>
      </p>
      <Link href="/dashboard">
        <span>Log in</span>
      </Link>
    </div>
  )
}

function Hero() {
  return (
    <div>
      Hero
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'

import { AcmeLogo } from '@/components/acme-logo'
import { lusitana } from '@/components/fonts'
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
    <div className={cn('flex flex-col justify-center gap-6 rounded-lg bg-secondary text-secondary-foreground', 'px-6 py-10 md:w-2/5 md:px-20')}>
      <p className={cn('text-xl md:text-3xl md:leading-normal', lusitana.className)}>
        <strong>Welcome to Acme.</strong>
        {' '}
        This is the example for the
        {' '}
        <a href="https://nextjs.org/learn/" className="text-primary">
          Next.js Learn Course
        </a>
        , brought to you by Vercel.
      </p>
      <Link
        href="/login"
        className={cn(
          'flex items-center gap-4 self-start',
          'bg-primary text-primary-foreground transition-colors hover:bg-primary/80',
          'rounded-lg px-6 py-3 text-sm font-medium md:text-base',
        )}
      >
        Log in
        <span className="i-mingcute-arrow-right-line size-5" />
      </Link>
    </div>
  )
}

function Hero() {
  return (
    <div className={cn('flex items-center justify-center', 'p-6 md:w-3/5 md:px-28 md:py-12')}>
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        alt="Screenshots of the dashboard project showing desktop version"
        className="hidden md:block"
        priority
      />
      <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        alt="Screenshot of the dashboard project showing mobile version"
        className="block md:hidden"
      />
    </div>
  )
}

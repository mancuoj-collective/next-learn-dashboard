'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { authenticate } from '@/lib/actions'
import { cn } from '@/lib/utils'

import { inter, lusitana } from './fonts'
import { Button } from './ui/button'

export function LoginForm() {
  // eslint-disable-next-line unicorn/no-useless-undefined
  const [error, formAction, isPending] = useActionState(authenticate, undefined)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <form action={formAction} className={cn('rounded-lg bg-secondary px-6 py-8', inter.className)}>
      <h1 className={cn('mb-3 text-2xl', lusitana.className)}>
        Please log in to continue.
      </h1>
      <div className="w-full">
        <div>
          <label htmlFor="email" className="mb-3 mt-5 block text-xs font-medium text-muted-foreground">
            Email
          </label>
          <div className="relative">
            <input
              placeholder="Enter your email address"
              id="email"
              name="email"
              type="email"
              defaultValue="user@nextmail.com"
              className={cn(
                'peer block w-full rounded-md bg-background',
                'py-2 pl-10 text-sm placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary',
              )}
              required
            />
            <div className="i-mingcute-at-line pointer-events-none absolute left-3 top-1/2 flex size-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="mb-3 mt-5 block text-xs font-medium text-muted-foreground">
            Password
          </label>
          <div className="relative">
            <input
              placeholder="Enter your password"
              id="password"
              name="password"
              type="password"
              defaultValue="123456"
              className={cn(
                'peer block w-full rounded-md bg-background',
                'py-2 pl-10 text-sm placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary',
              )}
              required
              minLength={6}
            />
            <div className="i-mingcute-key-2-line pointer-events-none absolute left-3 top-1/2 flex size-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
          </div>
        </div>
        <Button className="mt-6 flex w-full justify-between" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Log in'}
          <div className="i-mingcute-arrow-right-line size-5 text-primary-foreground" />
        </Button>
      </div>
    </form>
  )
}

'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">{error.message || 'Something went wrong'}</h2>
      <Button onClick={reset}>Try again</Button>
    </main>
  )
}

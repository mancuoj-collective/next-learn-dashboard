import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2.5">
      <div className="i-mingcute-sad-line size-10 text-muted-foreground" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p className="text-sm text-muted-foreground">
        Could not find the requested invoice.
      </p>
      <Button asChild className="mt-4">
        <Link href="/dashboard/invoices">Go back</Link>
      </Button>
    </main>
  )
}

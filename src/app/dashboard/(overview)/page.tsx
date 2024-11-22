import { lusitana } from '@/components/fonts'
import { cn } from '@/lib/utils'

export default function Page() {
  return (
    <main>
      <h1 className={cn('mb-4 text-xl md:text-2xl', lusitana.className)}>Dashboard</h1>
    </main>
  )
}

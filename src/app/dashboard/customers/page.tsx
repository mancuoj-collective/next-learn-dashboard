import { lusitana } from '@/components/fonts'
import { cn } from '@/lib/utils'

export default function Page() {
  return (
    <main>
      <h1 className={cn('mb-4 pl-1 text-2xl md:mb-8 md:text-3xl', lusitana.className)}>Customers</h1>
    </main>
  )
}

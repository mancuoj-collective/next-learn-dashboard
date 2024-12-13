import { cn } from '@/lib/utils'

export function EmptyState({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-32 flex-col items-center justify-center gap-3 text-muted-foreground', className)}>
      <div className="i-mingcute-terror-line size-10" />
      <div className="text-sm">No results found.</div>
    </div>
  )
}

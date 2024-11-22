import { cn } from '@/lib/utils'

import { lusitana } from './fonts'

export function AcmeLogo() {
  return (
    <div className={cn('flex items-center gap-1.5 leading-none text-white', lusitana.className)}>
      <div className="i-mingcute-globe-2-line size-12" />
      <p className="text-5xl">Acme</p>
    </div>
  )
}

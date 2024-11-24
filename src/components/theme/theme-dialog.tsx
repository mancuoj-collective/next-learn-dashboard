'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useConfig } from '@/hooks/use-config'
import { useDark } from '@/hooks/use-dark'
import { cn } from '@/lib/utils'

import { ThemeCustomizer } from './theme-customizer'

export function ThemeDialog() {
  const [config] = useConfig()
  const { isDark } = useDark()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="flex h-12 items-center justify-center rounded-md bg-secondary p-3 hover:bg-primary/20 hover:text-primary/80 md:py-2">
          <span className="i-mingcute-palette-line size-6" />
        </button>
      </DialogTrigger>
      <DialogContent
        className={cn('w-96 md:w-[444px]', `theme-${config.theme}`, { dark: isDark })}
        style={{ '--radius': `${config.radius}rem` } as React.CSSProperties}
      >
        <DialogTitle>
          Customize
          <DialogDescription>
            Pick a style and color for the dashboard.
          </DialogDescription>
        </DialogTitle>
        <ThemeCustomizer />
      </DialogContent>
    </Dialog>
  )
}

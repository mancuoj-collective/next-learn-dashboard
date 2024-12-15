'use client'

import { Toaster as Sonner } from 'sonner'

import { useDark } from '@/hooks/use-dark'
import { cn } from '@/lib/utils'

import { inter } from '../fonts'

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
  const { theme = 'system' } = useDark()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className={cn('toaster group', inter.className)}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

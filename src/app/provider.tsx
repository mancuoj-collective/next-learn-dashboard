'use client'

import { Provider } from 'jotai'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { ThemeScript, ThemeStyle } from '@/components/theme'
import { Toaster } from '@/components/ui/sonner'

export function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <NuqsAdapter>
      <Provider>
        <ThemeScript />
        <ThemeStyle />
        {children}
        <Toaster richColors />
      </Provider>
    </NuqsAdapter>
  )
}

'use client'

import { Provider } from 'jotai'

import { ThemeStyle } from '@/components/theme'
import { Toaster } from '@/components/ui/sonner'

export function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <Provider>
      <ThemeStyle />
      {children}
      <Toaster richColors />
    </Provider>
  )
}

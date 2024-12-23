'use client'

import { Provider } from 'jotai'
import Script from 'next/script'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { ThemeScript, ThemeStyle } from '@/components/theme'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/config/site'

export function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <NuqsAdapter>
      <Provider>
        {process.env.NODE_ENV === 'production' && (
          <Script defer src={siteConfig.umamiUrl} data-website-id={siteConfig.umamiId} />
        )}
        <ThemeScript />
        <ThemeStyle />
        {children}
        <Toaster richColors />
      </Provider>
    </NuqsAdapter>
  )
}

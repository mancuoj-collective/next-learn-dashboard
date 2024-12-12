import '@/styles/globals.css'

import type { Metadata } from 'next'
import Script from 'next/script'

import { inter } from '@/components/fonts'
import { env } from '@/config/env'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { AppProvider } from './provider'

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  metadataBase: new URL(siteConfig.url),
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', inter.className)}>
        {env.NODE_ENV === 'production' && (
          <Script src={siteConfig.umamiUrl} data-website-id={siteConfig.umamiId} />
        )}
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}

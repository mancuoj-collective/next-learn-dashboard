import '@/globals.css'

import type { Metadata } from 'next'
import { Inter, Lusitana } from 'next/font/google'

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

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-lusitana' })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', inter.variable, lusitana.variable)}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}

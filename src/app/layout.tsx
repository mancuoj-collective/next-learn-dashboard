import '@/styles/globals.css'
import '@/styles/themes.css'

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
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=localStorage.getItem("use-dark")||'"system"';('"dark"'===t||e&&'"light"'!==t)&&document.documentElement.classList.toggle("dark",!0);var c=localStorage.getItem("use-config");if(c){var n=JSON.parse(c);document.documentElement.classList.add("theme-"+n.theme);document.documentElement.style.setProperty("--radius",n.radius+"rem")}}();`,
          }}
        />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}

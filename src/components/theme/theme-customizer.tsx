'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { useConfig } from '@/hooks/use-config'
import { useDark } from '@/hooks/use-dark'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { cn } from '@/lib/utils'

import type { Theme } from './themes'
import { builtinRadiuses, builtinThemes, themes } from './themes'

function getActiveColor(theme: Theme['name'], isDark = false) {
  return `hsl(${themes.find(t => t.name === theme)?.activeColor[isDark ? 'dark' : 'light']})`
}

export function ThemeCustomizer() {
  const [config, setConfig] = useConfig()
  const { isDark, toggleDark } = useDark()
  const isMobile = useIsMobile()

  useEffect(() => {
    document.documentElement.classList.remove(
      ...builtinThemes.map(theme => `theme-${theme}`),
    )
    document.documentElement.classList.add(`theme-${config.theme}`)
  }, [config.theme])

  useEffect(() => {
    document.documentElement.style.setProperty('--radius', `${config.radius}rem`)
  }, [config.radius])

  return (
    <div className="grid gap-5">
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Color</h2>
        <div className="grid grid-cols-3 gap-1.5 md:gap-2.5">
          {builtinThemes.map((theme) => {
            const isActive = config.theme === theme
            return (
              <Button
                variant="outline"
                key={theme}
                size={isMobile ? 'sm' : 'default'}
                onClick={() => setConfig({ ...config, theme })}
                className={cn('justify-start', isActive && 'border-2 border-primary')}
              >
                <span
                  className="flex size-4 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: getActiveColor(theme, isDark) }}
                >
                  {isActive && <span className="i-mingcute-check-line size-3.5 text-white" />}
                </span>
                <span className="capitalize">{theme}</span>
              </Button>
            )
          })}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Radius</h2>
        <div className="grid grid-cols-5 gap-1 md:gap-2.5">
          {builtinRadiuses.map((radius) => {
            const isActive = config.radius === radius
            return (
              <Button
                key={radius}
                variant="outline"
                size={isMobile ? 'sm' : 'default'}
                onClick={() => setConfig({ ...config, radius })}
                className={cn(isActive && 'border-2 border-primary')}
              >
                {radius}
              </Button>
            )
          })}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Mode</h2>
        <div className="grid grid-cols-3 gap-1 md:gap-2.5">
          <Button
            variant="outline"
            size={isMobile ? 'sm' : 'default'}
            onClick={() => { isDark && toggleDark() }}
            className={cn('justify-start', !isDark && 'border-2 border-primary')}
          >
            <span className="i-mingcute-sun-line flex size-4 shrink-0 items-center justify-center" />
            Light
          </Button>
          <Button
            variant="outline"
            size={isMobile ? 'sm' : 'default'}
            onClick={() => { !isDark && toggleDark() }}
            className={cn('justify-start', isDark && 'border-2 border-primary')}
          >
            <span className="i-mingcute-moon-stars-line flex size-4 shrink-0 items-center justify-center" />
            Dark
          </Button>
        </div>
      </div>
    </div>
  )
}

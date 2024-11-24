'use client'

import { themes } from './themes'

export function generateThemeCSS() {
  return themes.map(theme => `
.theme-${theme.name} {
  ${Object.entries(theme.cssVars.light)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n  ')}
}

.dark.theme-${theme.name} {
  ${Object.entries(theme.cssVars.dark)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n  ')}
}`).join('\n')
}

export function ThemeStyle() {
  return (
    <style>{generateThemeCSS()}</style>
  )
}

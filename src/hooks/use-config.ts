import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import type { Theme } from '@/components/theme'

type Config = {
  theme: Theme['name']
  radius: number
}

export const defaultConfig: Config = {
  theme: 'violet',
  radius: 0.5,
}

const configAtom = atomWithStorage<Config>('use-config', defaultConfig)

export function useConfig() {
  return useAtom(configAtom)
}

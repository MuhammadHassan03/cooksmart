import { createTamagui } from 'tamagui'
import { createAnimations } from '@tamagui/animations-moti'
import { config as defaultConfig } from '@tamagui/config'

const animations = createAnimations({
  fast: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  slow: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
})

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  animations,
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
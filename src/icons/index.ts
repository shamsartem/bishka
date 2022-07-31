import Instagram from './instagram.svelte'
import Pin from './pin.svelte'
import Telegram from './telegram.svelte'
import Vk from './vk.svelte'

export const icons = {
  instagram: Instagram,
  telegram: Telegram,
  pin: Pin,
  vk: Vk,
} as const

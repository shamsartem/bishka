import { derived, readable } from 'svelte/store'

export const windowInnerWidth = readable(0, (set) => {
  const handleWindowResize = () => set(window.innerWidth)
  handleWindowResize()
  window.addEventListener('resize', handleWindowResize)
})

export const isMLResolution = derived(
  windowInnerWidth,
  ($windowInnerWidth) => $windowInnerWidth > 576,
)

export const isTResolution = derived(
  windowInnerWidth,
  ($windowInnerWidth) => $windowInnerWidth > 768,
)

export const isDResolution = derived(
  windowInnerWidth,
  ($windowInnerWidth) => $windowInnerWidth > 992,
)

export const isDLResolution = derived(
  windowInnerWidth,
  ($windowInnerWidth) => $windowInnerWidth > 1200,
)

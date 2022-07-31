import { derived, writable } from 'svelte/store'

export const windowInnerWidth = writable(0)

export const isMLResolution = derived(
  windowInnerWidth,
  ($windowInnerWidth): boolean => $windowInnerWidth > 576,
)

export const isTResolution = derived(
  windowInnerWidth,
  ($windowInnerWidth): boolean => $windowInnerWidth > 768,
)

export const isDResolution = derived(
  windowInnerWidth,
  ($windowInnerWidth): boolean => $windowInnerWidth > 992,
)

export const isDLResolution = derived(
  windowInnerWidth,
  ($windowInnerWidth): boolean => $windowInnerWidth > 1200,
)

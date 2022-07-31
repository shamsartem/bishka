{#if isVisible}
  <div
    class="dialog"
    use:portal
    transition:fade="{{ duration: BACKDROP_TRANSITION_DURATION }}"
    bind:this="{dialogEl}"
    on:keydown="{handleKeyDown}"
  >
    <div
      class="dialogWrapper"
      class:isFullScreen
      use:clickOutside="{hideDialog}"
    >
      <button class="closeButton" on:click="{hideDialog}">
        <span class="visuallyHidden">Close dialog</span>
      </button>
      <slot />
    </div>
  </div>
{/if}

<script lang="ts">
import { fade } from 'svelte/transition'
import { createFocusTrap, type FocusTrap } from 'focus-trap'

import { portal, clickOutside } from '../actions'
import { backdropIsVisible } from '../stores/backdrop-is-visible'
import { BACKDROP_TRANSITION_DURATION, KEY_ESC } from '../const'

export let isVisible: boolean
export let isFullScreen: boolean

let dialogEl: HTMLDivElement
let focusTrap: FocusTrap | undefined

const activateFocusTrap = (): void => {
  focusTrap = createFocusTrap(dialogEl, {
    onDeactivate(): void {
      isVisible = false
    },
  })
  focusTrap.activate()
}

const deactivateFocusTrap = (): void => {
  focusTrap?.deactivate()
}

let firstTime = true
$: if (firstTime) {
  firstTime = false
} else if (isVisible) {
  backdropIsVisible.set(true)
  setTimeout((): void => {
    activateFocusTrap()
  })
} else {
  deactivateFocusTrap()
  backdropIsVisible.set(false)
}

const hideDialog = (): void => {
  isVisible = false
}

const handleKeyDown = (
  e: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement },
): void => {
  e.code === KEY_ESC && hideDialog()
}
</script>

<style lang="postcss">
.dialog {
  position: fixed;
  z-index: 200;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.dialogWrapper {
  position: relative;
  display: flex;
  max-width: 100%;
  flex-direction: column;
  align-items: flex-end;
  margin: auto;
  &.isFullScreen {
    width: 100%;
  }
}

.closeButton {
  position: fixed;
  z-index: 1;
  top: 10px;
  right: 20px;
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: var(--c-black);
  border-radius: 50%;
  &::before,
  &::after {
    position: absolute;
    width: 60%;
    height: 2px;
    background-color: var(--c-yellow);
    content: '';
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
}
</style>

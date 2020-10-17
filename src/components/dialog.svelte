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
      use:clickoutside="{hideDialog}"
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
  import { createFocusTrap } from 'focus-trap'
  import portal from '../actions/portal'
  import clickoutside from '../actions/clickoutside'
  import backdropIsVisible from '../stores/backdrop-is-visible'
  import { BACKDROP_TRANSITION_DURATION, KEY_ESC } from '../const'

  export let isVisible
  export let isFullScreen

  let dialogEl
  let focusTrap

  const activateFocusTrap = () => {
    focusTrap = createFocusTrap(dialogEl, {
      onDeactivate() {
        isVisible = false
      },
    })
    focusTrap.activate()
  }

  const deactivateFocusTrap = () => {
    focusTrap.deactivate()
  }

  let firstTime = true
  $: if (firstTime) {
    firstTime = false
  } else if (isVisible) {
    backdropIsVisible.set(true)
    setTimeout(() => {
      activateFocusTrap()
    })
  } else {
    deactivateFocusTrap()
    backdropIsVisible.set(false)
  }

  const hideDialog = () => {
    isVisible = false
  }

  const handleKeyDown = (
    e: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) => {
    e.code === KEY_ESC && hideDialog()
  }
</script>

<style lang="postcss">
  .dialog {
    display: flex;
    position: fixed;
    z-index: 200;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .dialogWrapper {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-end;
    max-width: 100%;
    margin: auto;

    &.isFullScreen {
      width: 100%;
    }
  }

  .closeButton {
    display: flex;
    position: sticky;
    z-index: 1;
    top: 10px;
    right: 20px;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--c-black);

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 60%;
      height: 2px;
      transform: rotate(45deg);
      background-color: var(--c-yellow);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
</style>

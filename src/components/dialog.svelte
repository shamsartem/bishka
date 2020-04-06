<script>
  import { fade } from 'svelte/transition';
  import createFocusTrap from 'focus-trap';
  import portal from '../actions/portal';
  import clickoutside from '../actions/clickoutside';
  import backdropIsVisible from '../stores/backdrop-is-visible';
  import { BACKDROP_TRANSITION_DURATION } from '../constants';

  export let visible;
  export let fullscreen;

  let dialogEl;
  let focusTrap;

  function activateFocusTrap() {
    focusTrap = createFocusTrap(dialogEl, {
      onDeactivate() {
        visible = false;
      },
    });
    focusTrap.activate();
  }

  function deactivateFocusTrap() {
    focusTrap.deactivate();
  }

  let firstTime = true;
  $: if (firstTime) {
    firstTime = false;
  } else if (visible) {
    backdropIsVisible.set(true);
    setTimeout(() => {
      activateFocusTrap();
    });
  } else {
    deactivateFocusTrap();
    backdropIsVisible.set(false);
  }

  function hideDialog() {
    visible = false;
  }
</script>

{#if visible}
  <div
    class="dialog"
    use:portal
    transition:fade={{ duration: BACKDROP_TRANSITION_DURATION }}
    bind:this={dialogEl}
    on:keydown={(e) => e.keyCode === 27 && hideDialog()}
  >
    <div
      class="dialogWrapper"
      class:fullscreen
      use:clickoutside
      on:clickoutside={hideDialog}
    >
      <button class="closeButton" on:click={hideDialog}></button>
      <slot></slot>
    </div>
  </div>
{/if}

<style>
  .dialog {
    z-index: 200;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dialogWrapper {
    position: relative;
    max-width: 100%;
    margin: auto;
  }

  .dialogWrapper.fullscreen {
    width: 100%;
  }

  .closeButton {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 20px;
    top: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--c-yellow);
    z-index: 1;
  }

  .closeButton::before {
    content: '';
    background-color: var(--c-gray-1);
    width: 60%;
    height: 2px;
    position: absolute;
    transform: rotate(45deg);
  }

  .closeButton::after {
    content: '';
    background-color: var(--c-gray-1);
    width: 60%;
    height: 2px;
    position: absolute;
    transform: rotate(-45deg);
  }
</style>

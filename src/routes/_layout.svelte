<CommonStyles />
<Resolution />
<div class="wrapper">
  <slot />
</div>
<Backdrop />

<script lang="ts">
  import Resolution from '../components/resolution.svelte'
  import CommonStyles from '../common-styles/common-styles.svelte'
  import Backdrop from '../components/backdrop.svelte'

  export let segment
  segment
</script>

<style lang="postcss">
  .wrapper {
    display: flex;
    position: relative;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    width: 100%;
    min-width: 320px;
  }
</style>

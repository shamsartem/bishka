<CommonStyles />
<svelte:head>
  <title>{title}</title>
</svelte:head>
<Resolution />
<div class="wrapper">
  <slot />
</div>
<Backdrop />

<script lang="ts">
  import Resolution from '../components/resolution.svelte'
  import CommonStyles from '../common-styles/common-styles.svelte'
  import Backdrop from '../components/backdrop.svelte'
  import { pages } from '../db'

  export let segment: string

  $: title = pages.find((page) => page.slug === segment)?.page || 'Bishka'
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

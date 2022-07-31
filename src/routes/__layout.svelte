<svelte:head>
  <title>{title}</title>
</svelte:head>
<Resolution />
<div class="wrapper">
  <slot />
</div>
<Backdrop />

<script lang="ts">
import '../styles/common.css'
import Resolution from '../components/resolution.svelte'
import Backdrop from '../components/backdrop.svelte'
import { pages } from '../db'

// eslint-disable-next-line import/no-unresolved
import { page } from '$app/stores'

$: title =
  pages.find(({ slug }): boolean => slug === $page.params.slug)?.page ??
  'Bishka'
</script>

<style lang="postcss">
.wrapper {
  position: relative;
  display: flex;
  width: 100%;
  min-width: 320px;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
}
</style>

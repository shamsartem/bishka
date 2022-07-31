<script lang="ts">
import { onMount } from 'svelte'

import { windowInnerWidth } from '../stores/resolution'

onMount((): void => {
  const handleWindowResize = (): void =>
    windowInnerWidth.update((): number => window.innerWidth)
  handleWindowResize()
  window.addEventListener('resize', handleWindowResize)
})
</script>

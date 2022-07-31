<script context="module" lang="ts">
import type { LoadOutput } from '@sveltejs/kit'

export const load = (): LoadOutput => ({
  status: 303,
  redirect: '/',
})
</script>

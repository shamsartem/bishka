<svelte:head>
  <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}

<script lang="ts">
  export let status: number
  export let error: Error

  const dev = process.env.NODE_ENV === 'development'
</script>

<style>
  h1,
  p {
    margin: 0 auto;
  }

  h1 {
    margin: 0 0 0.5em 0;
    font-size: 2.8em;
    font-weight: 700;
  }

  p {
    margin: 1em auto;
  }
</style>

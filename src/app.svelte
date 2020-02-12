<script>
  import Router from 'svelte-spa-router';
  import routes from './routes';
</script>

<div class="wrapper">
  <Router {routes} />
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 320px;
  }
</style>

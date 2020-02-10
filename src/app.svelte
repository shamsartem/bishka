<script>
  import { Router } from 'svelte-router-spa';
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
    flex-grow: 1;
    width: 100%;
    min-width: 320px;
  }
</style>

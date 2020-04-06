<script>
  import Router from 'svelte-spa-router';
  import routes from './routes';
  import Backdrop from './components/backdrop.svelte';
</script>

<div class="wrapper">
  <Router {routes} />
</div>
<Backdrop/>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 320px;
    flex-grow: 1;
    position: relative;
  }
</style>

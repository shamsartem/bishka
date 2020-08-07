<div class="wrapper">
  <RouterView />
</div>
<Backdrop />

<script lang="typescript">
  import createRouter from '@spaceavocado/svelte-router'
  import RouterView from '@spaceavocado/svelte-router/component/view'
  import Backdrop from './components/backdrop.svelte'
  import Main from './pages/main.svelte'
  import Gallery from './pages/gallery.svelte'

  createRouter({
    routes: [
      {
        path: '/',
        name: 'main',
        component: Main,
      },
      {
        path: '/:slug',
        component: Gallery,
        props: (route) => ({ slug: route.params.slug }),
      },
    ],
  })
</script>

<style lang="postcss">
  @custom-media --s (width >= 576px);
  @custom-media --t (width >= 768px);
  @custom-media --l (width >= 992px);
  @custom-media --xl (width >= 1200px);

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

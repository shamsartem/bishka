import Main from './pages/main.svelte';
import Gallery from './pages/gallery.svelte';

const routes = {
  '/': Main,
  '/:gallery': Gallery,
};

export default routes;

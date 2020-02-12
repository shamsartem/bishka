import Main from './pages/main.svelte';
import Contact from './pages/contact.svelte';
import Gallery from './pages/gallery.svelte';

const routes = {
  '/': Main,
  '/contact': Contact,
  '/:gallery': Gallery,
};

export default routes;

import Main from './pages/main.svelte';
import Content from './pages/content.svelte';

const routes = [
  {
    name: '/',
    component: Main,
  },
  { name: 'images/:content', component: Content },
];

export default routes;

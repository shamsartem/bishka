import App from './app.svelte'
import './assets/css/common.css'

import { images } from './db'
import { loadImages } from './helpers/image-preload'

loadImages(images.map(({ src }) => src))

const app = new App({
  target: document.querySelector('#app'),
})

export default app

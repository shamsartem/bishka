<script>
import { location } from 'svelte-spa-router';
import { onDestroy } from 'svelte';
import db from '../db';
import Loader from '../components/loader.svelte';

let pages;
let page;
let locationValue;

let fullScreenImage = null;
function setFullScreen(src) {
  if (fullScreenImage === src) {
    fullScreenImage = null;
    return;
  }

  fullScreenImage = src;
}

db.then((data) => {
  pages = data.pages;
});

const unsubscribe = location.subscribe((value) => {
  locationValue = value;
});

$: {
  page = pages && pages.find((p) => locationValue === `/${p.slug}`);
}

onDestroy(unsubscribe);
</script>

{#if !pages}
  <Loader/>
{:else}
  <div class="hero-container" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('{page.hero}');">
    <div class="links-container">
      <a href="#/" class="link">На главную</a>
      {#each pages as {page, slug}}
        <a href="#/{slug}" class="link">{page}</a>
      {/each}
      <a href="#/contact" class="link">Контакты</a>
    </div>
    <h1>{page.page}</h1>
    <p class="description">{page.description}</p>
  </div>
  <div class="gallery-container">
    <ul class="gallery">
      {#each page.images as image}
        <li
          class="image-cotainer"
          class:full-screen={fullScreenImage === image.src}
          on:click={setFullScreen(image.src)}
        >
          <figure>
            <img
              class="image"
              src={image.src} alt={image.description}
            >
            <figcaption>{image.description}</figcaption>
          </figure>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
.hero-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-origin: padding-box;
  background-clip: border-box;
  margin-bottom: 30px;
}

.links-container {
  display: flex;
}

.link {
  font-size: 15px;
  font-weight: 700;
  margin-right: var(--space-md);
  color: var(--c-white);
}

.link:last-child {
  margin-right: 0;
}

@media(max-width: 700px) {
  .links-container {
    flex-direction: column;
    align-items: center;
  }

  .link {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .link:last-child {
    margin-bottom: 0;
  }
}

h1 {
  font-size: 40px;
  color: var(--c-white);
  padding-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  padding: 0 var(--space-md);
}

.description {
  color: var(--c-white);
  white-space: pre-wrap;
  max-width: 800px;
  padding: 0 var(--space-md);
  margin-bottom: 40px;
}

.gallery-container {
  max-width: 1200px;
  margin-bottom: 50px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 500px;
  grid-gap: 1rem;
  grid-auto-flow: dense;
  padding: 0 var(--space-md);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

figure {
  height: 100%;
  position: relative;
}

.image-cotainer.full-screen {
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1;
}

figcaption {
  opacity: 0;
  max-height: 50px;
  position: absolute;
  bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 10px 5px;
  color: var(--c-white);
  width: 100%;
  overflow: hidden;
  transition: opacity 0.3s;
  background: linear-gradient(0deg, rgba(2,0,36,0.7) 16%, rgba(255,255,255,0) 100%);
}

figure:hover figcaption {
  opacity: 1;
}
</style>


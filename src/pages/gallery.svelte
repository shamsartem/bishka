<script>
import { location } from 'svelte-spa-router';
import { onDestroy } from 'svelte';
import db from '../db';
import Loader from '../components/loader.svelte';
import Dialog from '../components/dialog.svelte';

let pages;
let page;
let locationValue;
let imageInDialog = null;

let dialogIsVisible = false;
$: if (!dialogIsVisible) {
  imageInDialog = null;
}

function showDialog(image) {
  dialogIsVisible = true;
  imageInDialog = image;
}

db.then((data) => {
  pages = data.pages;
});

const unsubscribe = location.subscribe((value) => {
  locationValue = value;
});
onDestroy(unsubscribe);

$: page = pages && pages.find((p) => locationValue === `/${p.slug}`);

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
          class="image-container"
        >
          <figure class="figureInList">
            <img
              class="imageInList"
              src={image.src} alt={image.description}
            >
            {#if image.description}
              <figcaption class="figcaptionInList">
                {image.description}
              </figcaption>
            {/if}
          </figure>
          <button
            class="open-image-button"
            on:click={showDialog(image)}
          >
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <Dialog bind:visible={dialogIsVisible} fullscreen>
    <figure class="figureInDialog">
      {#if imageInDialog.description}
        <figcaption class="figcaptionInDialog">
          {imageInDialog.description}
        </figcaption>
      {/if}
      <img
        class="imageInDialog"
        src={imageInDialog.src} alt={imageInDialog.description}
      >
    </figure>
  </Dialog>
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

.image-container {
  position: relative;
}

.open-image-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.imageInList {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.figureInList {
  height: 100%;
  position: relative;
}

.figcaptionInList {
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

.image-container:hover .figcaptionInList,
.image-container:focus-within .figcaptionInList {
  opacity: 1;
}

.figureInDialog {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.figcaptionInDialog {
  background-color: var(--c-white);
  padding: 50px;
  width: 100%;
}

.imageInDialog {
  width: 100%;
}
</style>


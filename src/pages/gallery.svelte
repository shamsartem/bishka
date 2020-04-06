<script>
import { location, link } from 'svelte-spa-router';
import { onDestroy, tick } from 'svelte';
import active from 'svelte-spa-router/active';
import db from '../db';
import Loader from '../components/loader.svelte';
import Dialog from '../components/dialog.svelte';


let pages;
let page;
let locationValue;
let imageInDialog = null;
let contact = [];

let dialogIsVisible = false;
$: if (!dialogIsVisible) {
  imageInDialog = null;
}

async function showDialog(image) {
  dialogIsVisible = true;
  imageInDialog = image;
  await tick();
  Array.from(document.querySelectorAll('.imageInDialog')).find((i) => i.src === imageInDialog.src).scrollIntoView();
}

db.then((data) => {
  pages = data.pages;
  contact = data.contact;
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
  <nav>
    <div class="navContainer">
      <div class="logoContainer">
        <img src="img/logo.svg" alt="logo" class="logo"/>
        <div aria-hidden="true" class="textUnderLogo">Gallery</div>
        <a href="#/" class="logoLink">
          <span class="visuallyHidden">На главную</span>
        </a>
      </div>
      <div class="linksContainer">
        {#each pages as {page, slug}}
          <a href="/{slug}" class="link" use:link use:active>
            <span>{page}</span>
          </a>
        {/each}
      </div>
      <div class="contactContainer">
        <div class="social">
          {#each contact as c}
            {#if c.type !== 'email'}
              <a href={c.link} class="socialLink" style="background-image: url(build/img/{c.type}.svg)">
                <span class="visuallyHidden">{c.text}</span>
              </a>
            {/if}
          {/each}
        </div>
        <div class="email">
          {#each contact as c}
            {#if c.type === 'email'}
              <a href={c.link} class="emailLink">{c.text}</a>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </nav>
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
                <span class="figcaptionInListText">
                  {image.description}
                </span>
              </figcaption>
            {/if}
          </figure>
          <button
            aria-hidden="true"
            class="open-image-button"
            on:click={showDialog(image)}
          >
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <Dialog bind:visible={dialogIsVisible} fullscreen>
    <ul class="galleryInDialog">
      {#each page.images as image}
        <li>
          <figure class="figureInDialog">
            <img
              class="imageInDialog"
              src={image.src} alt={image.description}
            >
            {#if image.description}
              <figcaption class="figcaptionInDialog">
                <span class="figcaptionInDialogText">
                  {image.description}
                </span>
              </figcaption>
            {/if}
          </figure>
        </li>
      {/each}
    </ul>
  </Dialog>
{/if}

<style>
nav {
  display: flex;
  position: sticky;
  top: 0;
  background-color: var(--c-black);
  width: 100%;
  justify-content: center;
  height: 100px;
  padding: 0 var(--space-md);
  z-index: 1;
}

@media(max-width: 1250px) {
  nav {
    height: 50px;
  }
}

.logoContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}

@media(max-width: 1250px) {
  .logoContainer {
    max-width: 120px;
  }
}

.logo {
  width: 100%;
}

.logoLink {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}

.textUnderLogo {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
}

@media(max-width: 1250px) {
  .textUnderLogo {
    display: none;
  }
}

.navContainer {
  display: flex;
  justify-content: space-between;
  color: var(--c-white);
  width: 100%;
  max-width: 1600px;
  height: 100%;
}

.navContainer :global(a.active) {
  background-color: var(--c-yellow);
  color: var(--c-black);
}

.linksContainer {
  display: flex;
  padding: 0 20px;
}

@media(max-width: 1250px) {
  .linksContainer {
    width: 100%;
    padding-right: 0;
  }
}
.link {
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  width: 100%;
}

@media(max-width: 1250px) {
  .link {
    font-size: 15px;
    padding: 10px;
  }
}

@media(max-width: 550px) {
  .link {
    font-size: 13px;
    padding: 7px;
  }
}

.contactContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media(max-width: 1250px) {
  .contactContainer {
    display: none;
  }
}

.social {
  display: flex;
  max-width: 300px;
  width: 100%;
  margin-bottom: 10px;
}

.socialLink {
  height: 30px;
  flex-grow: 1;
  display: block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  filter: invert(1);
}

.email {
  display: flex;
  flex-direction: column;
}

.emailLink {
  text-align: center;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 460px;
}

@media(min-width: 1350px) {
  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media(max-width: 800px) {
  .gallery {
    grid-auto-rows: calc(100vw / 3);
    grid-gap: 2px;
  }
}

.image-container {
  position: relative;
}

.image-container::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--c-yellow);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
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
  z-index: 1;
  opacity: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 24px;
  padding: 10px 10px;
  color: var(--c-white);
  transition: opacity 0.3s;
  font-weight: 700;
  line-height: 29px;
  pointer-events: none;
}

@media(max-width: 600px) {
  .figcaptionInList {
    font-size: 13px;
    line-height: 16px;
    bottom: 10px;
    left: 10px;
  }
}

.figcaptionInListText {
  background-color: var(--c-black);
}

.image-container:hover .figcaptionInList,
.image-container:focus-within .figcaptionInList {
  opacity: 1;
}

.image-container:hover::after,
.image-container:focus-within::after {
  opacity: 0.3;
}

.galleryInDialog {
  display: flex;
  flex-direction: column;
}

.imageInDialog {
  width: 100%;
}

.figcaptionInDialog {
  background-color: var(--c-black);
  padding: 10px;
  color: var(--c-yellow);
}
</style>


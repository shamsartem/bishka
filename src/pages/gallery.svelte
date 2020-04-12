<script>
import { location, link } from 'svelte-spa-router';
import { onDestroy, tick } from 'svelte';
import active from 'svelte-spa-router/active';
import db from '../db';
import Loader from '../components/loader.svelte';
import Dialog from '../components/dialog.svelte';
import VkIcon from '../icons/vk.svelte';
import TelegramIcon from '../icons/telegram.svelte';
import InstagramIcon from '../icons/instagram.svelte';
import PinIcon from '../icons/pin.svelte';

const icons = {
  vk: VkIcon,
  telegram: TelegramIcon,
  instagram: InstagramIcon,
};

let social = [];
let email;
let pages;
let page;
let locationValue;
let imageInDialog = null;

let dialogIsVisible = false;
$: if (!dialogIsVisible) {
  imageInDialog = null;
}

async function showDialog(image) {
  dialogIsVisible = true;
  imageInDialog = image;
  await tick();
  Array.from(document.querySelectorAll('.imageInDialog')).find((i) => i.src === imageInDialog.src).parentElement.scrollIntoView();
}

db.then((data) => {
  social = data.contact.filter((c) => !['email', 'address'].includes(c.type));
  email = data.contact.find((c) => c.type === 'email');
  pages = data.pages;
});

const unsubscribe = location.subscribe((value) => {
  locationValue = value;
  dialogIsVisible = false;
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
          {#each social as s}
            <a href={s.link} class="socialLink">
              <span class="visuallyHidden">{s.text}</span>
              <svelte:component this={icons[s.type]}/>
            </a>
          {/each}
        </div>
        <div class="email">
          {#if email }
            <a href={email.link} class="emailLink">{email.text}</a>
          {/if}
        </div>
      </div>
    </div>
  </nav>
  <div>
    <ul class="gallery">
      {#each page.images as image}
        <li
          class="imageContainer"
        >
          <figure class="figureInList">
            <img
              class="imageInList"
              src={image.previewSrc || image.src} alt={image.description}
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
            class="openImageButton"
            on:click={showDialog(image)}
          >
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <Dialog bind:visible={dialogIsVisible} fullscreen>
    <ul>
      {#each page.images as image}
        <li>
          <figure>
            {#if image.description}
              <figcaption class="figcaptionInDialog">
                <span>
                  {image.description}
                </span>
              </figcaption>
            {/if}
            <img
              class="imageInDialog"
              class:fullscreen={image.fullscreen}
              class:noDescription={!image.description}
              src={image.src} alt={image.description}
            >
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
  z-index: 2;
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
  align-items: flex-end;
}

@media(max-width: 1250px) {
  .contactContainer {
    display: none;
  }
}

.social {
  display: flex;
  max-width: 180px;
  width: 100%;
  margin-bottom: 10px;
  color: var(--c-white);
}

.socialLink {
  height: 30px;
  width: 30px;
  margin-left: 30px;
  display: flex;
  justify-content: center;
  color: var(--c-white);
  transition: color var(--t);
}

.email {
  display: flex;
  flex-direction: column;
}

.emailLink {
  text-align: center;
  transition: color var(--t);
}

.socialLink:hover, .emailLink:hover {
  color: var(--c-yellow);
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

.imageContainer {
  position: relative;
}

.imageContainer::after {
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

.imageContainer:hover::after,
.imageContainer:focus-within::after {
  opacity: 0.3;
}

.openImageButton {
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

.imageContainer:hover .figcaptionInList,
.imageContainer:focus-within .figcaptionInList {
  opacity: 1;
}

.imageInDialog {
  width: 100%;
  object-fit: contain;
  max-height: 100vh;
}

.imageInDialog.noDescription {
  margin-top: 50px;
}

.imageInDialog.fullscreen {
  max-height: unset;
}

.figcaptionInDialog {
  background-color: var(--c-black);
  padding: 20px;
  color: var(--c-yellow);
  font-size: 13px;
}
</style>


<nav>
  <div class="navContainer">
    <div class="logoContainer">
      <img src="img/logo.svg" alt="logo" class="logo" />
      <div aria-hidden="true" class="textUnderLogo">Gallery</div>
      <RouterLink to="/" cls="link">
        <span class="visuallyHidden">На главную</span>
      </RouterLink>
    </div>
    <div class="linksContainer">
      {#each pages as { page, slug }}
        <RouterLink to="/{slug}" cls="link">
          <span>{page}</span>
        </RouterLink>
      {/each}
    </div>
    <div class="contactContainer">
      <div class="social">
        {#each social as s}
          <a href="{s.link}" class="socialLink">
            <span class="visuallyHidden">{s.text}</span>
            <svelte:component this="{icons[s.type]}" />
          </a>
        {/each}
      </div>
      <div class="email">
        {#if email}
          <a href="{email.link}" class="emailLink">{email.text}</a>
        {/if}
      </div>
    </div>
  </div>
</nav>
<div>
  <ul class="gallery">
    {#each page.images as image}
      <li class="imageContainer">
        <figure class="figureInList">
          <img
            class="imageInList"
            src="{image.previewSrc || image.src}"
            alt="{image.description}"
            loading="lazy"
          />
          {#if image.description}
            <figcaption class="figcaptionInList">
              <span class="figcaptionInListText">{image.description}</span>
            </figcaption>
          {/if}
        </figure>
        <button
          aria-hidden="true"
          class="openImageButton"
          on:click="{() => showDialog(image)}"
        ></button>
      </li>
    {/each}
  </ul>
</div>
<Dialog bind:visible="{dialogIsVisible}" fullscreen>
  <ul>
    {#each page.images as image}
      <li>
        <figure>
          {#if image.description}
            <figcaption class="figcaptionInDialog">
              <span>{image.description}</span>
            </figcaption>
          {/if}
          <img
            class="imageInDialog"
            class:fullscreen="{image.fullscreen}"
            class:noDescription="{!image.description}"
            src="{image.src}"
            alt=""
            loading="lazy"
          />
        </figure>
      </li>
    {/each}
  </ul>
</Dialog>

<script lang="typescript">
  import RouterLink from '@spaceavocado/svelte-router/component/link'
  import { router } from '@spaceavocado/svelte-router'
  import { onDestroy, tick } from 'svelte'
  import { pages, email, social } from '../db'
  import Dialog from '../components/dialog.svelte'
  import VkIcon from '../icons/vk.svelte'
  import TelegramIcon from '../icons/telegram.svelte'
  import InstagramIcon from '../icons/instagram.svelte'
  import PinIcon from '../icons/pin.svelte'

  export let slug
  export let route

  const icons = {
    vk: VkIcon,
    telegram: TelegramIcon,
    instagram: InstagramIcon,
  }

  let imageInDialog = null

  let dialogIsVisible = false
  $: if (!dialogIsVisible) {
    imageInDialog = null
  }

  const showDialog = async (image) => {
    dialogIsVisible = true
    imageInDialog = image
    await tick()
    Array.from(document.querySelectorAll('.imageInDialog'))
      .find((i: HTMLImageElement) => i.src === imageInDialog.src)
      .parentElement.scrollIntoView()
  }

  $: page = pages.find(({ slug: s }) => slug === s)
</script>

<style lang="postcss">
  nav {
    display: flex;
    position: sticky;
    z-index: 2;
    top: 0;
    justify-content: center;
    width: 100%;
    height: 50px;
    padding: 0 var(--space-md);
    background-color: var(--c-black);

    @media (--xl) {
      height: 100px;
    }
  }

  .logoContainer {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 120px;
    padding: 10px 0;

    @media (--xl) {
      max-width: unset;
    }
  }

  .logo {
    width: 100%;
  }

  .logoContainer > :global(.link) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .textUnderLogo {
    display: none;

    @media (--xl) {
      display: block;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  .navContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1600px;
    height: 100%;
    color: var(--c-white);
  }

  .linksContainer {
    display: flex;
    width: 100%;
    padding-left: 20px;

    @media (--xl) {
      width: auto;
      padding-right: 20px;
    }
  }

  .linksContainer > :global(.link) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 7px;
    font-size: 13px;
    font-weight: 700;

    @media (--s) {
      padding: 10px;
      font-size: 15px;
    }

    @media (--xl) {
      padding: 0 50px;
      font-size: 24px;
    }

    &.active {
      background-color: var(--c-yellow);
      color: var(--c-black);
    }
  }

  .contactContainer {
    display: none;

    @media (--xl) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
    }
  }

  .social {
    display: flex;
    width: 100%;
    max-width: 180px;
    margin-bottom: 10px;
    color: var(--c-white);
  }

  .socialLink {
    display: flex;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin-left: 30px;
    transition: color var(--t);
    color: var(--c-white);

    &:hover {
      color: var(--c-yellow);
    }
  }

  .email {
    display: flex;
    flex-direction: column;
  }

  .emailLink {
    transition: color var(--t);
    text-align: center;

    &:hover {
      color: var(--c-yellow);
    }
  }

  .gallery {
    display: grid;
    grid-auto-rows: calc(100vw / 3);
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;

    @media (--t) {
      --header-height-half: 25px;

      grid-auto-rows: calc(100vh / 2 - var(--header-height-half));
      gap: 0;
    }

    @media (--xl) {
      --header-height-half: 50px;

      grid-template-columns: repeat(4, 1fr);
    }
  }

  .imageContainer {
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: opacity 0.3s;
      transition: opacity var(--t);
      opacity: 0;
      background-color: var(--c-yellow);
      pointer-events: none;
    }

    &:hover::after,
    &:focus-within::after {
      opacity: 0.3;
    }
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
    position: relative;
    height: 100%;
  }

  .figcaptionInList {
    position: absolute;
    z-index: 1;
    bottom: 10px;
    left: 10px;
    padding: 10px 10px;
    transition: opacity 0.3s;
    opacity: 0;
    color: var(--c-white);
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    pointer-events: none;

    @media (--s) {
      bottom: 20px;
      left: 20px;
      font-size: 24px;
      line-height: 29px;
    }

    .imageContainer:hover &,
    .imageContainer:focus-within & {
      opacity: 1;
    }
  }

  .figcaptionInListText {
    background-color: var(--c-black);
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
    padding: 20px;
    background-color: var(--c-black);
    color: var(--c-yellow);
    font-size: 13px;
  }
</style>

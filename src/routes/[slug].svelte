<nav>
  <div class="navContainer">
    <div class="logoContainer">
      <img src="img/logo.svg" alt="logo" class="logo" />
      {#if $isDLResolution}
        <div aria-hidden="true" class="textUnderLogo">Gallery</div>
      {/if}
      <a href="/" class="logoLink">
        <span class="visuallyHidden">На главную</span>
      </a>
    </div>
    <div class="linksContainer">
      {#each pages as { page, slug: s }}
        <a href="/{s}" class="navLink" class:active="{s === slug}">
          <span>{page}</span>
        </a>
      {/each}
    </div>
    {#if $isDLResolution}
      <div class="contactContainer">
        <div class="social">
          {#each social as s}
            <a
              href="{s.link}"
              class="socialLink"
              rel="external"
              target="_blank"
            >
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
    {/if}
  </div>
</nav>

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
      <a href="{`${slug}#${image.fileName}`}" class="openImageButton">
        <span
          class="visuallyHidden"
        >{`Open ${image.fileName} full screen`}</span>
      </a>
    </li>
  {/each}
</ul>
<Dialog bind:isVisible="{isDialogVisible}" isFullScreen>
  <ul class="listInDialog" bind:this="{imagesInDialogContainerEl}">
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

<script context="module" lang="ts">
  export async function preload({ params: { slug } }) {
    return { slug }
  }
</script>

<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { pages, email, social } from '../db'
  import Dialog from '../components/dialog.svelte'
  import VkIcon from '../icons/vk.svelte'
  import TelegramIcon from '../icons/telegram.svelte'
  import InstagramIcon from '../icons/instagram.svelte'
  import { isDLResolution } from '../stores/resolution'
  import { goto } from '@sapper/app'

  export let slug: string

  $: removeHash = () => goto(`/${slug}`)

  let imagesInDialogContainerEl: HTMLElement
  let isMounted = false

  const icons = {
    vk: VkIcon,
    telegram: TelegramIcon,
    instagram: InstagramIcon,
  }

  let isDialogVisible = false

  const showDialog = async (fileName: string) => {
    isDialogVisible = true

    await tick()

    const li = Array.from(
      document.querySelectorAll('.imageInDialog'),
    ).find((i: HTMLImageElement) => i.src.includes(fileName))?.parentElement
      .parentElement

    let observerTimeout: number

    new ResizeObserver((_mutations, observer) => {
      li.scrollIntoView()
      clearTimeout(observerTimeout)
      observerTimeout = setTimeout(() => {
        observer.disconnect()
      }, 3000)
    }).observe(imagesInDialogContainerEl)
  }

  $: if (isMounted && !isDialogVisible) {
    removeHash()
  }

  $: page = pages.find(({ slug: s }) => slug === s)

  const handleHashChange = () => {
    const { hash } = window.location
    const fileName = hash.substr(1)

    if (!fileName) {
      isDialogVisible = false
      return
    }

    const isImageAvailable =
      page.images.find((image) => image.fileName === fileName) !== undefined

    if (isImageAvailable) {
      showDialog(fileName)
    } else {
      removeHash()
    }
  }

  onMount(() => {
    isMounted = true
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
  })
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

    @media (--dl) {
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

    @media (--dl) {
      max-width: unset;
    }
  }

  .logo {
    width: 100%;
  }

  .logoLink {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .textUnderLogo {
    @media (--dl) {
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

    @media (--dl) {
      width: auto;
      padding-right: 20px;
    }
  }

  .navLink {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 7px;
    font-size: 13px;
    font-weight: 700;

    @media (--ml) {
      padding: 10px;
      font-size: 15px;
    }

    @media (--dl) {
      padding: 0 50px;
      font-size: 24px;
    }

    &.active {
      background-color: var(--c-yellow);
      color: var(--c-black);
    }
  }

  .contactContainer {
    @media (--dl) {
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
    overflow-x: hidden;

    @media (--t) {
      --header-height-half: 25px;

      grid-auto-rows: calc(100vh / 2 - var(--header-height-half));
      gap: 0;
    }

    @media (--dl) {
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

    &:hover::after {
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

    @media (--ml) {
      bottom: 20px;
      left: 20px;
      font-size: 24px;
      line-height: 29px;
    }
  }

  .figcaptionInListText {
    background-color: var(--c-black);
  }

  .listInDialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .imageInDialog {
    width: 100%;
    object-fit: contain;
    max-height: min(100vh, 1080px);
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

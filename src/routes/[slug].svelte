<nav>
  <div class="navContainer">
    <div class="logoContainer">
      <img src="img/logo.svg" alt="logo" class="logo" />
      {#if $isDLResolution}
        <div aria-hidden="true" class="textUnderLogo">Gallery</div>
      {/if}
      <a href="/" class="logoLink">
        <span class="visuallyHidden">Logo</span>
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
  {#each currentPage?.images ?? [] as image}
    <li class="imageContainer">
      <figure class="figureInList">
        <img
          class="imageInList"
          src="{image.src}"
          alt="{image.description}"
          loading="lazy"
        />
        {#if image.description}
          <figcaption class="figcaptionInList">
            <span class="figcaptionInListText">{image.description} </span>
          </figcaption>
        {/if}
      </figure>
      <a href="{`${slug}#${image.fileName}`}" class="openImageButton">
        <span class="visuallyHidden"
          >{`Open ${image.fileName} full screen`}</span
        >
      </a>
    </li>
  {/each}
</ul>
<Dialog bind:isVisible="{isDialogVisible}" isFullScreen>
  <ul class="listInDialog" bind:this="{imagesInDialogContainerEl}">
    {#each currentPage?.images ?? [] as image}
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
            class:noDescription="{image.description === ''}"
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
import type { LoadEvent, LoadOutput } from '@sveltejs/kit'

export const load = ({ params: { slug } }: LoadEvent): LoadOutput =>
  pages.find(({ slug: s }): boolean => slug === s) === undefined
    ? {
        status: 303,
        redirect: '/',
      }
    : {}
</script>

<script lang="ts">
import { onMount, tick } from 'svelte'

import { pages, email, social } from '../db'
import Dialog from '../components/dialog.svelte'
import { isDLResolution } from '../stores/resolution'
import { hasKeys } from '../typeHelpers'
import { icons } from '../icons'

/* eslint-disable import/no-unresolved */
import { goto } from '$app/navigation'
import { page } from '$app/stores'
/** eslint-enable import/no-unresolved */

$: slug = $page.params.slug

$: removeHash = (): Promise<void> => goto(`/${slug}`)

let imagesInDialogContainerEl: HTMLElement
let isMounted = false
let isDialogVisible = false

const getImages = (
  querySelector: string,
): Array<Element & { src: string; offsetTop: number }> =>
  Array.from(document.querySelectorAll(querySelector)).filter(
    (el): el is Element & { src: string; offsetTop: number } =>
      hasKeys(el, 'src', 'offsetTop') &&
      typeof el.src === 'string' &&
      typeof el.offsetTop === 'number',
  )

const scrollImageIntoView = (
  querySelector: string,
  fileName: string,
  compensateNav = false,
): void => {
  const li = getImages(querySelector).find(({ src }): boolean =>
    src.includes(fileName),
  )?.parentElement?.parentElement

  if (imagesInDialogContainerEl instanceof Element) {
    let observerTimeout: number
    new ResizeObserver((_mutations, observer): void => {
      li?.scrollIntoView()
      if (compensateNav) {
        const navHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--nav-height',
          ),
          10,
        )
        if (
          document.body.scrollHeight >
          window.scrollY + window.screen.height + navHeight
        ) {
          window.scrollBy({ top: -navHeight })
        }
      }
      clearTimeout(observerTimeout)
      observerTimeout = window.setTimeout((): void => {
        observer.disconnect()
      }, 3000)
    }).observe(imagesInDialogContainerEl)
  }
}

const showDialog = async (fileName: string): Promise<void> => {
  isDialogVisible = true
  await tick()
  scrollImageIntoView('.imageInDialog', fileName)
}

$: if (isMounted && !isDialogVisible) {
  ;(async (): Promise<void> => {
    const scrollTop = document.querySelector('.dialog')?.scrollTop ?? 0
    const images = getImages('.imageInDialog').map(
      (image): { src: string; top: number } => ({
        src: image.src,
        top: image.offsetTop,
      }),
    )
    const imageSrc = images.reduce((acc, image): { src: string; top: number } =>
      Math.abs(image.top - scrollTop) < Math.abs(acc.top - scrollTop)
        ? image
        : acc,
    ).src
    await removeHash()
    await tick()
    scrollImageIntoView('.imageInList', imageSrc, true)
  })().catch((): void => undefined)
}

$: currentPage = pages.find(({ slug: s }): boolean => slug === s)

const handleHashChange = async (): Promise<void> => {
  const { hash } = window.location
  const fileNameFromHash = hash.slice(1)

  if (fileNameFromHash === '') {
    isDialogVisible = false
    return
  }

  const isImageAvailable =
    currentPage?.images?.find(
      (image): boolean => image.fileName === fileNameFromHash,
    ) !== undefined

  if (isImageAvailable) {
    return showDialog(fileNameFromHash)
  }
  return removeHash()
}

onMount(async (): Promise<void> => {
  isMounted = true
  await handleHashChange()
  window.addEventListener('hashchange', handleHashChange)
})
</script>

<style lang="postcss">
:root {
  --nav-height: 50px;
  @media (--dl) {
    --nav-height: 100px;
  }
}

nav {
  position: fixed;
  z-index: 2;
  top: 0;
  display: flex;
  width: 100%;
  height: var(--nav-height);
  justify-content: center;
  padding: 0 var(--space-md);
  background-color: var(--c-black);
}

.logoContainer {
  position: relative;
  display: flex;
  max-width: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    font-size: var(--fz-h3);
    font-weight: 700;
    text-transform: uppercase;
  }
}

.navContainer {
  display: flex;
  width: 100%;
  max-width: 1600px;
  height: 100%;
  justify-content: space-between;
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
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 7px;
  font-size: 13px;
  font-weight: 700;
  @media (--ml) {
    padding: 10px;
    font-size: var(--fz-md);
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
  width: 30px;
  height: 30px;
  justify-content: center;
  margin-left: 30px;
  color: var(--c-white);
  transition: color var(--t);
  &:hover {
    color: var(--c-yellow);
  }
}

.email {
  display: flex;
  flex-direction: column;
}

.emailLink {
  text-align: center;
  transition: color var(--t);
  &:hover {
    color: var(--c-yellow);
  }
}

.gallery {
  --row-height: calc(100vw / 3);
  display: grid;
  margin-top: var(--nav-height);
  gap: 2px;
  grid-auto-rows: var(--row-height);
  grid-template: var(--row-height) / repeat(3, 1fr);
  overflow-x: hidden;
  @media (--t) {
    --row-height: calc(100vh / 2 - var(--nav-height) / 2);
    gap: 0;
  }
  @media (--dl) {
    grid-template: var(--row-height) / repeat(4, 1fr);
  }
}

.imageContainer {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--c-yellow);
    content: '';
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--t);
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
  padding: 10px;
  color: var(--c-white);
  font-size: 13px;
  font-weight: 700;
  line-height: 16px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
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
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.imageInDialog {
  width: 100%;
  max-height: min(100vh, 1080px);
  object-fit: contain;
  &.noDescription {
    margin-top: 50px;
  }
  &.fullscreen {
    max-height: unset;
  }
}

.figcaptionInDialog {
  padding: 20px;
  background-color: var(--c-black);
  color: var(--c-yellow);
  font-size: 13px;
}
</style>

<div class="top-section">
  <div class="balloones-container">
    <Balloones />
  </div>
  <h1 class="center">Галерея</h1>
</div>
<div class="linksContainer">
  {#each pages as { page, slug, images }}
    <div class="linkContainer">
      {#each images.filter((i) => i.featured).slice(0, 3) as image}
        <div class="imageFeaturedContainer">
          <img
            class="imageFeatured"
            src="{image.previewSrc || image.src}"
            alt="{image.description}"
            aria-hidden="true"
          />
        </div>
      {/each}
      <div aria-hidden="true" class="linkTitle">
        <div>{page}</div>
      </div>
      {#each images.filter((i) => i.featured).slice(3, 6) as image}
        <div class="imageFeaturedContainer">
          <img
            class="imageFeatured"
            src="{image.previewSrc || image.src}"
            alt="{image.description}"
            aria-hidden="true"
          />
        </div>
      {/each}
      <RouterLink to="/{slug}" cls="link">
        <span class="visuallyHidden">{page}</span>
      </RouterLink>
    </div>
  {/each}
</div>
<footer>
  {#if address || email || social.length}
    <div class="address">
      {#if address}
        <a href="{address.link}" class="addressLink">
          <PinIcon />
          <span class="addressLinkText">{address.text}</span>
        </a>
      {/if}
    </div>
    <div class="social">
      {#each social as { type, text, link }}
        <a href="{link}" class="socialLink">
          <span class="visuallyHidden">{text}</span>
          <svelte:component this="{icons[type]}" />
        </a>
      {/each}
    </div>
    <div class="email">
      {#if email}
        <a href="{email.link}" class="emailLink">{email.text}</a>
      {/if}
    </div>
  {/if}
</footer>

<script lang="typescript">
  import RouterLink from '@spaceavocado/svelte-router/component/link'
  import Balloones from '../components/balloons.svelte'
  import { email, social, address, pages } from '../db'
  import VkIcon from '../icons/vk.svelte'
  import TelegramIcon from '../icons/telegram.svelte'
  import InstagramIcon from '../icons/instagram.svelte'
  import PinIcon from '../icons/pin.svelte'

  export let route

  const icons = {
    vk: VkIcon,
    telegram: TelegramIcon,
    instagram: InstagramIcon,
  }
</script>

<style lang="postcss">
  .top-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 8vmin var(--space-md) 0;
    background-color: var(--c-black);
  }

  .balloones-container {
    width: 100%;
    max-width: 900px;
  }

  h1 {
    margin-top: 30px;
    margin-bottom: 20px;
    color: #fff;
    font-size: 40px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  .linksContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    padding: 0 var(--space-md);

    @media (--s) {
      flex-direction: row;
      margin-top: 0;
      margin-bottom: 20px;
      padding: 0;
    }
  }

  .linkContainer {
    display: flex;
    position: relative;
    width: 100%;
    margin-bottom: 20px;

    @media (--s) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 200px auto 200px;
      flex: 1;
      margin-bottom: 0;
    }

    @media (--t) {
      grid-template-rows: 180px auto 180px;
    }
  }

  .linkTitle {
    display: flex;
    grid-column: 1 / span 3;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 15px;
    transition: color var(--t), background-color var(--t);
    border-radius: 9999px;
    background-color: var(--c-yellow);
    color: var(--c-black);
    font-weight: 700;
    text-transform: uppercase;

    @media (--s) {
      border-radius: 0;
      font-size: 20px;
    }

    @media (--l) {
      font-size: 48px;
    }

    .linkContainer:nth-child(2n) & {
      @media (--s) {
        background-color: hsl(var(--hue-yellow), 100%, 47%);
      }
    }

    .linkContainer:hover & {
      background-color: var(--c-black);
      color: var(--c-yellow);
    }
  }

  .imageFeatured {
    display: none;

    @media (--s) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .linkContainer > :global(.link) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1676px;
    margin-top: auto;
    margin-bottom: 25px;
    padding: 0 var(--space-md);
    font-size: 18px;

    @media (--s) {
      flex-direction: row;
      justify-content: space-between;
      padding-right: var(--space-md);
      font-size: 20px;
    }
  }

  .addressLink {
    display: none;
    align-items: center;
    max-height: 23px;
    transition: color var(--t);
    white-space: nowrap;

    @media (--s) {
      display: flex;
    }
  }

  .addressLinkText {
    margin-left: 15px;
  }

  .social {
    display: flex;
    width: 100%;
    max-width: 300px;
    margin-bottom: 15px;

    @media (--s) {
      max-width: 200px;
      margin-bottom: 0;
    }
  }

  .socialLink {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    height: 50px;

    @media (--s) {
      height: 30px;
    }
  }

  .email {
    display: flex;
    flex-direction: column;
  }

  .emailLink {
    margin-bottom: 30px;
    text-align: center;

    @media (--s) {
      margin-bottom: 0;
    }
  }
</style>

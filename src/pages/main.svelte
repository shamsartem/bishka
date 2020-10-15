<div class="top-section">
  <div class="balloones-container">
    <Balloones />
  </div>
  <h1 class="center">Галерея</h1>
</div>
<div class="linksContainer">
  {#each pages as { page, slug, images }}
    <div class="linkContainer">
      {#if $isMLResolution}
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
      {/if}
      <div aria-hidden="true" class="linkTitle">
        <div>{page}</div>
      </div>
      {#if $isMLResolution}
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
      {/if}
      <RouterLink to="/{slug}" cls="link">
        <span class="visuallyHidden">{page}</span>
      </RouterLink>
    </div>
  {/each}
</div>
<footer>
  {#if address || email || social.length}
    {#if $isMLResolution}
      <div class="address">
        {#if address}
          <a href="{address.link}" class="addressLink">
            <PinIcon />
            <span class="addressLinkText">{address.text}</span>
          </a>
        {/if}
      </div>
    {/if}
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
  import { isMLResolution } from '../stores/resolution'

  export let route
  route

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

    @media (--ml) {
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

    @media (--ml) {
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

    @media (--ml) {
      border-radius: 0;
      font-size: 20px;
    }

    @media (--d) {
      font-size: 48px;
    }

    .linkContainer:nth-child(2n) & {
      @media (--ml) {
        background-color: hsl(var(--hue-yellow), 100%, 47%);
      }
    }

    .linkContainer:hover & {
      background-color: var(--c-black);
      color: var(--c-yellow);
    }
  }

  .imageFeatured {
    @media (--ml) {
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

    @media (--ml) {
      flex-direction: row;
      justify-content: space-between;
      padding-right: var(--space-md);
      font-size: 20px;
    }
  }

  .addressLink {
    @media (--ml) {
      display: flex;
      align-items: center;
      max-height: 23px;
      transition: color var(--t);
      white-space: nowrap;
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

    @media (--ml) {
      max-width: 200px;
      margin-bottom: 0;
    }
  }

  .socialLink {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    height: 50px;

    @media (--ml) {
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

    @media (--ml) {
      margin-bottom: 0;
    }
  }
</style>

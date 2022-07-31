<div class="top-section">
  <div class="balloones-container">
    <Balloones />
  </div>
  <h1 class="center">GALLERY</h1>
</div>
<div class="linksContainer">
  {#each pages as { page, slug, topImages, bottomImages }}
    <div class="linkContainer">
      {#if $isMLResolution}
        {#each topImages as image}
          <div class="imageFeaturedContainer">
            <img
              class="imageFeatured"
              src="{image.src}"
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
        {#each bottomImages as image}
          <div class="imageFeaturedContainer">
            <img
              class="imageFeatured"
              src="{image.src}"
              alt="{image.description}"
              aria-hidden="true"
            />
          </div>
        {/each}
      {/if}
      <a href="/{slug}" class="navLink">
        <span class="visuallyHidden">{page}</span>
      </a>
    </div>
  {/each}
</div>
<footer>
  <div class="social">
    {#each social as { type, text, link }}
      <a href="{link}" class="socialLink" rel="external" target="_blank">
        <span class="visuallyHidden">{text}</span>
        <svelte:component this="{icons[type]}" />
      </a>
    {/each}
  </div>
  <div class="email">
    {#if email}<a href="{email.link}" class="emailLink">{email.text}</a>{/if}
  </div>
</footer>

<script lang="ts">
import Balloones from '../components/balloons.svelte'
import { email, social, pages as pagesFromDb, type Page } from '../db'
import { icons } from '../icons'
import { isMLResolution } from '../stores/resolution'

const pages = pagesFromDb.map(
  ({
    description,
    page,
    slug,
    images,
  }): Omit<Page, 'images'> &
    Record<'topImages' | 'bottomImages', Page['images']> => {
    const featuredImages = images.filter((image): boolean => image.featured)
    return {
      description,
      page,
      slug,
      topImages: featuredImages.slice(0, 3),
      bottomImages: featuredImages.slice(3, 6),
    }
  },
)
</script>

<style lang="postcss">
.top-section {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
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
  color: hsl(0deg 0% 100%);
  font-size: 40px;
  font-weight: var(--fw-bold);
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.linksContainer {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0 var(--space-md);
  margin-top: 30px;
  @media (--ml) {
    flex-direction: row;
    padding: 0;
    margin-top: 0;
    margin-bottom: 20px;
  }
}

.linkContainer {
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  @media (--ml) {
    display: grid;
    flex: 1;
    margin-bottom: 0;
    grid-template: 200px auto 200px / repeat(3, 1fr);
  }
  @media (--t) {
    grid-template-rows: 180px auto 180px;
  }
}

.linkTitle {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
  background-color: var(--c-yellow);
  border-radius: 9999px;
  color: var(--c-black);
  font-weight: 700;
  grid-column: 1 / span 3;
  text-transform: uppercase;
  transition: color var(--t), background-color var(--t);
  @media (--ml) {
    border-radius: 0;
    font-size: var(--fz-h3);
  }
  @media (--d) {
    font-size: var(--fz-h1);
  }
  .linkContainer:nth-child(2n) & {
    @media (--ml) {
      background-color: hsl(var(--hue-yellow) 100% 47%);
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

.navLink {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

footer {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0 var(--space-md);
  margin-top: auto;
  margin-bottom: 25px;
  font-size: var(--fz-large);
  @media (--ml) {
    flex-direction: row;
    justify-content: space-between;
    padding-right: var(--space-md);
    font-size: var(--fz-h3);
  }
}

.social {
  display: flex;
  margin-bottom: var(--space-md);
  @media (--ml) {
    margin-bottom: 0;
  }
}

.socialLink {
  display: flex;
  height: 50px;
  flex-grow: 1;
  justify-content: center;
  margin: 0 10px;
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

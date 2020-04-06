<script>
import Balloones from '../components/balloons.svelte';
import db from '../db';
import Loader from '../components/loader.svelte';
</script>

<div class="top-section">
  <div class="balloones-container">
    <Balloones/>
  </div>
  <h1 class="center">Галерея</h1>
</div>

<div class="linksContainer">
{#await db}
  <Loader/>
{:then db}
  {#each db.pages as {page, slug, images}}
    <div class="linkContainer">
      {#each images.filter((i) => i.preview).slice(0, 3) as image}
        <div class="imagePreviewContainer">
          <img class="imagePreview" src={image.src} alt={image.description} aria-hidden="true">
        </div>
      {/each}
      <div aria-hidden="true" class="linkTitle"><div>{page}</div></div>
      {#each images.filter((i) => i.preview).slice(3, 6) as image}
        <div class="imagePreviewContainer">
          <img class="imagePreview" src={image.src} alt={image.description} aria-hidden="true">
        </div>
      {/each}
      <a href="#/{slug}" class="link">
        <span class="visuallyHidden">
          {page}
        </span>
      </a>
    </div>
  {/each}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
</div>

<footer>
{#await db}
  <div></div>
{:then db}
  <div class="social">
    {#each db.contact as {type, text, link}}
      {#if type !== 'email'}
        <a href={link} class="socialLink" style="background-image: url(build/img/{type}.svg)">
          <span class="visuallyHidden">{text}</span>
        </a>
      {/if}
    {/each}
  </div>
  <div class="email">
    {#each db.contact as {type, text, link}}
      {#if type === 'email'}
        <a href={link} class="emailLink">{text}</a>
      {/if}
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
</footer>

<style>
.top-section {
  background-color: var(--c-black);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8vmin var(--space-md) 0;
}

.balloones-container {
  width: 100%;
  max-width: 900px;
}
h1 {
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 20px;
  letter-spacing: 0.3em;
  color: #fff;
  text-transform: uppercase;
}

.linksContainer {
  display: flex;
  max-width: 100%;
  margin-bottom: 20px;
}

@media(max-width: 600px) {
  .linksContainer {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 var(--space-md);
    margin-top: 30px;
  }
}

.linkContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 200px auto 200px;
  position: relative;
  flex: 1;
}

@media(max-width: 600px) {
  .linkContainer {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
  }
}

.linkTitle {
  grid-column: 1 / span 3;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--c-yellow);
  color: var(--c-black);
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
}

.linkContainer:nth-child(2n) .linkTitle {
  background-color: var(--c-yellow-darker);
}

@media(max-width: 800px) {
  .linkTitle {
    font-size: 20px;
  }
}

@media(max-width: 600px) {
  .linkTitle {
    width: 100%;
    border-radius: 9999px;
  }
}

.linkContainer:hover .linkTitle{
  background-color: var(--c-black);
  color: var(--c-yellow);
}

.imagePreview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media(max-width: 600px) {
  .imagePreview {
    display: none;
  }
}
.link {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
}

@media(min-width: 600px) {
  footer {
    flex-direction: row;
    justify-content: space-between;
    padding-right: var(--space-md);
  }
}

.social {
  display: flex;
  max-width: 300px;
  width: 100%;
  margin-bottom: 20px;
}

.socialLink {
  height: 40px;
  flex-grow: 1;
  display: block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.email {
  display: flex;
  flex-direction: column;
}

.emailLink {
  text-align: center;
  margin-bottom: 20px;
}
</style>

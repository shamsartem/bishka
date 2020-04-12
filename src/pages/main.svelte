<script>
import Balloones from '../components/balloons.svelte';
import db from '../db';
import Loader from '../components/loader.svelte';
import VkIcon from '../icons/vk.svelte';
import TelegramIcon from '../icons/telegram.svelte';
import InstagramIcon from '../icons/instagram.svelte';
import PinIcon from '../icons/pin.svelte';

const icons = {
  vk: VkIcon,
  telegram: TelegramIcon,
  instagram: InstagramIcon,
};

let address;
let social = [];
let email;

db.then(({ contact }) => {
  address = contact.find((c) => c.type === 'address');
  social = contact.filter((c) => !['email', 'address'].includes(c.type));
  email = contact.find((c) => c.type === 'email');
});
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
      {#each images.filter((i) => i.featured).slice(0, 3) as image}
        <div class="imageFeaturedContainer">
          <img class="imageFeatured" src={image.previewSrc || image.src} alt={image.description} aria-hidden="true">
        </div>
      {/each}
      <div aria-hidden="true" class="linkTitle"><div>{page}</div></div>
      {#each images.filter((i) => i.featured).slice(3, 6) as image}
        <div class="imageFeaturedContainer">
          <img class="imageFeatured" src={image.previewSrc || image.src} alt={image.description} aria-hidden="true">
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
  {#if address || email || social.length}
    <div class="address">
      {#if address}
        <a href={address.link} class="addressLink">
          <PinIcon/>
          <span class="addressLinkText">{address.text}</span>
        </a>
      {/if}
    </div>
    <div class="social">
      {#each social as {type, text, link}}
        <a href={link} class="socialLink">
          <span class="visuallyHidden">{text}</span>
          <svelte:component this={icons[type]}/>
        </a>
      {/each}
    </div>
    <div class="email">
      {#if email }
        <a href={email.link} class="emailLink">{email.text}</a>
      {/if}
    </div>
  {/if}
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
  background-color: hsl(var(--hue-yellow), 100%, 47%);
}

@media(max-width: 600px) {
  .linkContainer:nth-child(2n) .linkTitle {
    background-color: var(--c-yellow);
  }
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

.imageFeatured {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media(max-width: 600px) {
  .imageFeatured {
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
  max-width: 1676px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  padding: 0 var(--space-md);
  margin-bottom: 25px;
  font-size: 18px;
}

@media(min-width: 600px) {
  footer {
    flex-direction: row;
    justify-content: space-between;
    padding-right: var(--space-md);
    font-size: 20px;
  }
}

.addressLink {
  display: none;
  max-height: 23px;
}

@media(min-width: 600px) {
  .addressLink {
    display: block;
    display: flex;
    align-items: center;
    transition: color var(--t);
  }
}

.addressLinkText {
  margin-left: 15px;
}

.social {
  display: flex;
  max-width: 300px;
  width: 100%;
  margin-bottom: 15px;
}

@media(min-width: 600px) {
  .social {
    margin-bottom: 0;
    max-width: 200px;
  }
}

.socialLink {
  height: 50px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

@media(min-width: 600px) {
  .socialLink {
    height: 30px;
  }
}

.email {
  display: flex;
  flex-direction: column;
}

.emailLink {
  text-align: center;
  margin-bottom: 30px;
}

@media(min-width: 600px) {
  .emailLink {
    margin-bottom: 0;
  }
}
</style>

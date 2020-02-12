<script>
import db from '../db';
import Loader from '../components/loader.svelte';
</script>

{#await db}
  <Loader/>
{:then db}
  <div class="links-container">
    <a href="/" class="link">На главную</a>
    {#each db.pages as {page, slug}}
      <a href="#/{slug}" class="link">{page}</a>
    {/each}
  </div>
  <h1 class="center">Контакты</h1>
  {#each db.contact as {title, link}}
    <a href={link} class="social-link">{title}</a>
  {/each}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
h1 {
  font-size: 40px;
  margin-bottom: 50px;
}

.links-container {
  display: flex;
  padding-top: 40px;
  margin-bottom: 30px;
}

.link {
  font-size: 15px;
  font-weight: 700;
  margin-right: var(--space-md);
}

.link:last-child {
  margin-right: 0;
}

.social-link {
  font-size: 20px;
  margin-bottom: 20px;
}

@media(max-width: 567px) {
  .links-container {
    flex-direction: column;
    align-items: center;
  }

  .link {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .link:last-child {
    margin-bottom: 0;
  }
}
</style>

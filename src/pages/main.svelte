<script>
import Balloones from '../components/balloons.svelte';
import db from '../db';
import Loader from '../components/loader.svelte';
</script>

<div class="balloones-container">
  <Balloones/>
</div>

<h1 class="center">Бишкa</h1>

<div class="links-container">
{#await db}
  <Loader/>
{:then db}
  {#each db.pages as {page, slug}}
    <a href="#/{slug}" class="link">{page}</a>
  {/each}
  <a href="#/contact" class="link">Контакты</a>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
</div>

<style>
h1 {
  font-size: 40px;
  margin-bottom: 50px;
}

.links-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.link {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: var(--space-md);
}

.link:last-child {
  margin-bottom: 0;
}

.balloones-container {
  margin: 10vmin 0;
  max-width: 1200px;
  width: 100%;
  padding: 0 var(--space-md);
}
</style>

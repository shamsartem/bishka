<script>
  import backdropIsVisible from '../stores/backdrop-is-visible';
  import { BACKDROP_TRANSITION_DURATION } from '../constants';

  let timeout;
  let visible = false;

  let firstTime = true;
  $: if (firstTime) {
    firstTime = false;
  } else if ($backdropIsVisible && !document.body.style.marginTop) {
    clearTimeout(timeout);

    const scrollY = window.scrollY || document.documentElement.scrollTop;

    visible = true;

    if (window.innerWidth > document.documentElement.clientWidth) {
      document.documentElement.classList.add('hasScrollbar');
    }

    document.body.style.marginTop = `-${scrollY}px`;
    document.documentElement.classList.add('noScroll');
    document.body.classList.add('overflowHidden');

    visible = true;
  } else if (!$backdropIsVisible) {
    timeout = setTimeout(() => {
      const newScrollTop = -document.body.style.marginTop.slice(0, -2);

      document.documentElement.classList.remove('hasScrollbar', 'noScroll');
      document.body.classList.remove('overflowHidden');
      document.body.style.marginTop = null;
      window.scrollTo(null, newScrollTop);

      setTimeout(() => {
        visible = false;
      }, BACKDROP_TRANSITION_DURATION);
    });
  }
</script>

<div
  class:visible
  style="transition-duration:{BACKDROP_TRANSITION_DURATION}ms"
>
</div>

<style>
  div {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: var(--c-white);
    visibility: hidden;
    transition-property: opacity, visibility;
    opacity: 0;
  }

  div.visible {
    opacity: 0.7;
    visibility: visible;
    pointer-events: initial;
  }

  :global(html.noScroll) {
    overflow-y: hidden;
    height: 100%;
  }

  :global(html.hasScrollbar) {
    overflow-y: scroll;
  }

  :global(body.overflowHidden) {
    overflow: hidden;
  }
</style>

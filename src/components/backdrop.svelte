<div
  class:visible
  style="transition-duration: {BACKDROP_TRANSITION_DURATION}ms;"
></div>

<script lang="ts">
import { backdropIsVisible } from '../stores/backdrop-is-visible'
import { BACKDROP_TRANSITION_DURATION } from '../const'

let timeout: number
let visible = false

let firstTime = true
$: if (firstTime) {
  firstTime = false
} else if ($backdropIsVisible && document.body.style.marginTop !== null) {
  clearTimeout(timeout)

  const scrollY = window.scrollY > 0 || document.documentElement.scrollTop

  visible = true

  document.body.style.marginTop = `-${scrollY}px`
  document.documentElement.classList.add('noScroll')
  document.body.classList.add('overflowHidden')

  visible = true
} else if (!$backdropIsVisible) {
  timeout = window.setTimeout((): void => {
    const newScrollTop = -document.body.style.marginTop.slice(0, -2)

    document.documentElement.classList.remove('noScroll')
    document.body.classList.remove('overflowHidden')
    document.body.style.marginTop = ''
    window.scrollTo(0, newScrollTop)

    setTimeout((): void => {
      visible = false
    }, BACKDROP_TRANSITION_DURATION)
  })
}
</script>

<style lang="postcss">
div {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--c-black);
  opacity: 0;
  pointer-events: none;
  transition-property: opacity, visibility;
  visibility: hidden;
}

div.visible {
  opacity: 1;
  pointer-events: initial;
  visibility: visible;
}

:global(html.noScroll) {
  height: 100%;
  overflow-y: hidden;
}

:global(body.overflowHidden) {
  overflow: hidden;
}
</style>

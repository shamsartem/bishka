<div class="balloons" class:_yellow="{!isBirthday}" class:_red="{isValentines}">
  {#each text as letter}
    <div class="balloon">
      <div class="text">{letter}</div>
    </div>
  {/each}
</div>

<script lang="typescript">
  import { onMount } from 'svelte'

  let time = new Date()

  let text
  $: isBirthday = time.getMonth() === 11 && time.getDate() === 8
  $: isValentines = time.getMonth() === 1 && time.getDate() === 14
  $: if (isBirthday) {
    text = '☺BDAY!'
  } else if (isValentines) {
    text = '❤❤❤❤❤❤'
  } else {
    text = 'bishka'
  }

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<style lang="postcss">
  .balloons {
    --c-red-a: #ee0d0d;
    --c-orange-a: #f2702d;
    --c-yellow-a: var(--c-yellow);
    --c-green-a: #b4e043;
    --c-blue-a: #3cf;
    --c-purple-a: #6840da;
    --c-red-light-a: #f09c9c;
    --c-orange-light-a: #f9c5ab;
    --c-yellow-light-a: hsl(var(--hue-yellow), 100%, 90%);
    --c-green-light-a: #fff8be;
    --c-blue-light-a: #adeafe;
    --c-purple-light-a: #b197f8;

    display: flex;
    position: relative;
    width: 100%;
    height: 17vw;
    min-height: 50px;
    max-height: 150px;
    color: var(--c-black);
    font-family: var(--ff-baloo);
  }

  .balloon {
    display: flex;
    position: relative;
    flex: 1;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    border-radius: 80% 80% 80% 80%;
    background-color: var(--c-red-a);
    line-height: var(--lh-xs);

    &::before {
      content: '▲';
      position: absolute;
      bottom: -2.3vmin;
      font-size: 3vmin;
    }

    &:nth-child(1) {
      animation: balloon1 6s ease-in-out infinite;
      background-color: var(--c-red-a);
      box-shadow: inset -10px 10px 10px var(--c-red-light-a);
    }

    &:nth-child(1)::before {
      color: var(--c-red-a);
    }

    &:nth-child(2) {
      animation: balloon2 6s ease-in-out infinite;
      background-color: var(--c-orange-a);
      box-shadow: inset -10px 10px 10px var(--c-orange-light-a);
    }

    &:nth-child(2)::before {
      color: var(--c-orange-a);
    }

    &:nth-child(3) {
      animation: balloon4 6s ease-in-out infinite;
      background-color: var(--c-yellow-a);
      box-shadow: inset -10px 10px 10px var(--c-yellow-light-a);
    }

    &:nth-child(3)::before {
      color: var(--c-yellow-a);
    }

    &:nth-child(4) {
      animation: balloon1 5s ease-in-out infinite;
      background-color: var(--c-green-a);
      box-shadow: inset -10px 10px 10px var(--c-green-light-a);
    }

    &:nth-child(4)::before {
      color: var(--c-green-a);
    }

    &:nth-child(5) {
      animation: balloon3 5s ease-in-out infinite;
      background-color: var(--c-blue-a);
      box-shadow: inset -10px 10px 10px var(--c-blue-light-a);
    }

    &:nth-child(5)::before {
      color: var(--c-blue-a);
    }

    &:nth-child(6) {
      animation: balloon2 6s ease-in-out infinite;
      background-color: var(--c-purple-a);
      box-shadow: inset -10px 10px 10px var(--c-purple-light-a);
    }

    &:nth-child(6)::before {
      color: var(--c-purple-a);
    }

    .balloons._yellow & {
      background-color: var(--c-yellow-a);
      box-shadow: inset -10px 10px 10px var(--c-yellow-light-a);
    }

    .balloons._yellow &::before {
      color: var(--c-yellow-a);
    }

    .balloons._red & {
      background-color: var(--c-red-a);
      box-shadow: inset -10px 10px 10px var(--c-red-light-a);
    }

    .balloons._red &::before {
      color: var(--c-red-a);
    }
  }

  .text {
    font-size: 28px;
    font-weight: 700;
    text-transform: uppercase;

    @media (--ml) {
      font-size: 60px;
    }
  }

  @keyframes balloon1 {
    0%,
    100% {
      transform: translateY(0) rotate(-6deg);
    }

    50% {
      transform: translateY(-5vmin) rotate(8deg);
    }
  }

  @keyframes balloon2 {
    0%,
    100% {
      transform: translateY(0) rotate(6deg);
    }

    50% {
      transform: translateY(-6vmin) rotate(-8deg);
    }
  }

  @keyframes balloon3 {
    0%,
    100% {
      transform: translate(0, -2vmin);
    }

    50% {
      transform: translate(-5vmin, 6vmin) rotate(-8deg);
    }
  }

  @keyframes balloon4 {
    0%,
    100% {
      transform: translate(5vmin, -5vmin);
    }

    50% {
      transform: translate(3vmin, 4vmin) rotate(10deg);
    }
  }

  @keyframes balloon5 {
    0%,
    100% {
      transform: translate(5vmin, -3vmin);
    }

    50% {
      transform: translate(-4vmin, 5vmin) rotate(10deg);
    }
  }
</style>

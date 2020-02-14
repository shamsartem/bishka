<script>
import { onMount } from 'svelte';

let time = new Date();

let text;
$: isBirthday = time.getMonth() === 11 && time.getDate() === 8;
$: isValentines = time.getMonth() === 1 && time.getDate() === 14;
$: if (isBirthday) {
  text = '☺BDAY!';
} else if (isValentines) {
  text = '❤❤❤❤❤❤';
} else {
  text = 'bishka';
}

onMount(() => {
  const interval = setInterval(() => {
    time = new Date();
  }, 1000);

  return () => {
    clearInterval(interval);
  };
});
</script>

<ul
  class="balloons"
  class:_yellow={!isBirthday}
  class:_red={isValentines}
>
  {#each text as letter}
    <li class="balloon">
      <span class="text">{letter}</span>
    </li>
  {/each}
</ul>

<style>
.balloons {
  --c-red-a: #ee0d0dcc;
  --c-orange-a: #f2702dcc;
  --c-yellow-a: #f2c23acc;
  --c-green-a: #b4e043cc;
  --c-blue-a:	#33ccffcc;
  --c-purple-a: #6840dacc;

  --c-red-light-a: #f09c9ccc;
  --c-orange-light-a: #f9c5abcc;
  --c-yellow-light-a: #f9e6b0cc;
  --c-green-light-a: #e0f2b3cc;
  --c-blue-light-a:	#adeafecc;
  --c-purple-light-a: #b197f8cc;

  display: flex;
  height: 25vmin;
  min-height: 70px;
  margin: 0 auto;
  position: relative;
}

.balloons._yellow .balloon {
  background-color: var(--c-yellow-a);
  box-shadow: inset -10px 10px 10px var(--c-yellow-light-a);
}

.balloons._yellow .balloon::before {
  color: var(--c-yellow-a);
}

.balloons._red .balloon {
  background-color: var(--c-red-a);
  box-shadow: inset -10px 10px 10px var(--c-red-light-a);
}

.balloons._red .balloon::before {
  color: var(--c-red-a);
}

.balloon {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: var(--lh-xs);
  flex: 1;
  background-color: var(--c-red-a);
  border-radius: 0;
  border-radius: 80% 80% 80% 80%;
  position: relative;
}

.balloon::before {
  content: "▲";
  position: absolute;
  bottom: -2.9vmin;
  font-size: 5vmin;
}

.balloon:nth-child(1) {
  background-color: var(--c-red-a);
  box-shadow: inset -10px 10px 10px var(--c-red-light-a);
  animation: balloon1 6s ease-in-out infinite;
}

.balloon:nth-child(1)::before {
  color: var(--c-red-a);
}

.balloon:nth-child(2) {
  background-color: var(--c-orange-a);
  box-shadow: inset -10px 10px 10px var(--c-orange-light-a);
  animation: balloon2 6s ease-in-out infinite;
}

.balloon:nth-child(2)::before {
  color: var(--c-orange-a);
}

.balloon:nth-child(3) {
  background-color: var(--c-yellow-a);
  box-shadow: inset -10px 10px 10px var(--c-yellow-light-a);
  animation: balloon4 6s ease-in-out infinite;
}

.balloon:nth-child(3)::before {
  color: var(--c-yellow-a);
}

.balloon:nth-child(4) {
  background-color: var(--c-green-a);
  box-shadow: inset -10px 10px 10px var(--c-green-light-a);
  animation: balloon1 5s ease-in-out infinite;
}

.balloon:nth-child(4)::before {
  color: var(--c-green-a);
}

.balloon:nth-child(5) {
  background-color: var(--c-blue-a);
  box-shadow: inset -10px 10px 10px var(--c-blue-light-a);
  animation: balloon3 5s ease-in-out infinite;
}

.balloon:nth-child(5)::before {
  color: var(--c-blue-a);
}

.balloon:nth-child(6) {
  background-color: var(--c-purple-a);
  box-shadow: inset -10px 10px 10px var(--c-purple-light-a);
  animation: balloon5 6s ease-in-out infinite;
}

.balloon:nth-child(6)::before {
  color: var(--c-purple-a);
}

.text {
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 700;
}

@media(min-width: 567px) {
  .text {
    font-size: 30px;
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
    transform: translate(0, -2vmin) rotate(6eg);
  }

  50% {
    transform: translate(-5vmin, 6vmin) rotate(-8deg);
  }
}

@keyframes balloon4 {
  0%,
  100% {
    transform: translate(5vmin, -5vmin) rotate(-8eg);
  }

  50% {
    transform: translate(3vmin, 4vmin) rotate(10deg);
  }
}

@keyframes balloon5 {
  0%,
  100% {
    transform: translate(5vmin, -3vmin) rotate(-8eg);
  }

  50% {
    transform: translate(-4vmin, 5vmin) rotate(10deg);
  }
}
</style>

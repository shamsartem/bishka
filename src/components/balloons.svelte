<script>
import { onMount } from 'svelte';

let time = new Date();

$: isBirthday = time.getMonth() === 11 && time.getDate() === 8;
$: text = isBirthday ? '☺BDAY!' : 'bishka';

onMount(() => {
  const interval = setInterval(() => {
    time = new Date();
  }, 1000);

  return () => {
    clearInterval(interval);
  };
});
</script>

<ul class="balloons" class:_yellow={!isBirthday}>
  {#each text as letter}
    <li class="balloon">
      <span class="text">{letter}</span>
    </li>
  {/each}
</ul>

<style>
.balloons {
  --c-red-a90: #ff0000e6;
  --c-orange-a90: #f2702de6;
  --c-yellow-a90: #f2c23ae6;
  --c-green-a90: #b4e043e6;
  --c-blue-a90:	#33ccffe6;
  --c-purple-a90: #6840dae6;

  --c-red-light-a90: #ff9999e6;
  --c-orange-light-a90: #f9c5abe6;
  --c-yellow-light-a90: #f9e6b0e6;
  --c-green-light-a90: #e0f2b3e6;
  --c-blue-light-a90:	#adeafee6;
  --c-purple-light-a90: #c2b2f0e6;

  display: flex;
  height: 25vmin;
  min-height: 70px;
  margin: 0 auto;
  position: relative;
}

.balloons._yellow .balloon {
  background-color: var(--c-yellow-a90);
  box-shadow: inset -10px 10px 10px var(--c-yellow-light-a90);
}

.balloons._yellow .balloon::before {
  color: var(--c-yellow-a90);
}

.balloon {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: var(--lh-xs);
  flex: 1;
  background-color: var(--c-red-a90);
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
  background-color: var(--c-red-a90);
  box-shadow: inset -10px 10px 10px var(--c-red-light-a90);
  animation: balloon1 6s ease-in-out infinite;
}

.balloon:nth-child(1)::before {
  color: var(--c-red-a90);
}

.balloon:nth-child(2) {
  background-color: var(--c-orange-a90);
  box-shadow: inset -10px 10px 10px var(--c-orange-light-a90);
  animation: balloon2 6s ease-in-out infinite;
}

.balloon:nth-child(2)::before {
  color: var(--c-orange-a90);
}

.balloon:nth-child(3) {
  background-color: var(--c-yellow-a90);
  box-shadow: inset -10px 10px 10px var(--c-yellow-light-a90);
  animation: balloon4 6s ease-in-out infinite;
}

.balloon:nth-child(3)::before {
  color: var(--c-yellow-a90);
}

.balloon:nth-child(4) {
  background-color: var(--c-green-a90);
  box-shadow: inset -10px 10px 10px var(--c-green-light-a90);
  animation: balloon1 5s ease-in-out infinite;
}

.balloon:nth-child(4)::before {
  color: var(--c-green-a90);
}

.balloon:nth-child(5) {
  background-color: var(--c-blue-a90);
  box-shadow: inset -10px 10px 10px var(--c-blue-light-a90);
  animation: balloon3 5s ease-in-out infinite;
}

.balloon:nth-child(5)::before {
  color: var(--c-blue-a90);
}

.balloon:nth-child(6) {
  background-color: var(--c-purple-a90);
  box-shadow: inset -10px 10px 10px var(--c-purple-light-a90);
  animation: balloon5 6s ease-in-out infinite;
}

.balloon:nth-child(6)::before {
  color: var(--c-purple-a90);
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

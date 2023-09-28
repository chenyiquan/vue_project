<!--
https://eugenkiss.github.io/7guis/tasks/#timer
-->

<script setup>
import { ref, onUnmounted, computed } from 'vue'
const duration = ref(15 * 1000)
const elapsed = ref(0)
let isRunning = ref(false)
let lastTime
let handle

function startTimer(){
    isRunning =true 
    elapsed.value = performance.now() - lastTime
    if (elapsed.value >= duration.value) {
    cancelAnimationFrame(handle)
    } else {
        handle = requestAnimationFrame(startTimer)
    }
    lastTime = performance.now()
    }

function pauseTimer(){
    isRunning =false 
}

// const update = () => {
//   elapsed.value = performance.now() - lastTime
//   if (elapsed.value >= duration.value) {
//     cancelAnimationFrame(handle)
//   } else {
//     handle = requestAnimationFrame(update)
//   }
// }
// console.log(update.requestAnimationFrame)

const reset = () => {
  elapsed.value = 0
  lastTime = performance.now()
//   startTimer()
}

const progressRate = computed(() =>
  Math.min(elapsed.value / duration.value, 1)
)

reset()

onUnmounted(() => {
  cancelAnimationFrame(handle)
})
</script>

<template>
  <label
    >Elapsed Time: <progress :value="progressRate"></progress
  ></label>

  <div>{{ (elapsed / 1000).toFixed(1) }}s</div>

  <div>
    Duration: <input type="range" v-model="duration" min="1" max="30000">
    {{ (duration / 1000).toFixed(1) }}s
  </div>

  <button @click="isRunning ? pauseTimer() : startTimer()">
    {{ isRunning ? 'Pause' : 'Start' }}
  </button>

  <button @click="reset">Reset</button>
</template>

<style>
.elapsed-container {
  width: 300px;
}

.elapsed-bar {
  background-color: red;
  height: 10px;
}
</style>
<template>
  <div class="control-panel">
    <button v-if="!store.running && store.frameIndex === 0" @click="start">
      ▶️ 开始时光流逝
    </button>

    <button v-else-if="!store.running && store.frameIndex >= store.totalFrames" @click="restart">
      🔁 再看一次
    </button>
  </div>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { useSimulationStore } from '../store/simulation'

const store = useSimulationStore()
let timer: ReturnType<typeof setInterval> | null = null

function start() {
  store.setSpeed(100)
  store.setFrameSize(100)
  store.setRunning(true)
}

function restart() {
  store.reset()
  start()
}

watch(() => store.running, (running) => {
  if (running) {
    timer = setInterval(() => {
      store.playStep()
    }, store.speed)
  } else {
    clearInterval(timer!)
    timer = null
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.control-panel {
  text-align: center;
  margin-top: 16px;
}
button {
  font-size: 16px;
  padding: 10px 24px;
  border-radius: 8px;
  background: #4a90e2;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}
button:hover {
  background: #407cc9;
}
</style>

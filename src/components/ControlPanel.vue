<template>
  <div class="control-panel">
    <button v-if="!store.running && store.frameIndex === 0" @click="showDialog = true">
      ▶️ 开始时光流逝
    </button>

    <button v-else-if="!store.running && store.frameIndex >= store.totalFrames" @click="restart">
      🔁 再看一次
    </button>

    <!-- 🧠 模态框 -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>你是几号猴子？</h3>
        <div class="input-row">
          猴子编号：
          <input type="number" v-model="inputIndex" min="1" max="20" />
        </div>
        <div class="button-row">
          <button @click="confirm">确定</button>
          <button @click="skip" class="angry">我不是猴子</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useSimulationStore } from '../store/simulation'

const store = useSimulationStore()
const showDialog = ref(false)
const inputIndex = ref(1) // 默认编号从 1 开始
let timer: ReturnType<typeof setInterval> | null = null

function confirm() {
  const idx = Math.max(1, Math.min(20, inputIndex.value))
  store.userMonkeyIndex = idx - 1
  console.log('[set userMonkeyIndex]', store.userMonkeyIndex)
  start()
  showDialog.value = false
}

function skip() {
  store.userMonkeyIndex = null
  start()
  showDialog.value = false
}

function start() {
  store.setSpeed(100)
  store.setFrameSize(100)
  store.setRunning(true)
}

function restart() {
  store.reset()
  showDialog.value = true
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

/* 🧠 弹窗样式 */
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.dialog {
  background: white;
  border-radius: 12px;
  padding: 20px 24px;
  width: 280px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.input-row {
  margin: 16px 0;
  font-size: 15px;
}

.input-row input {
  width: 60px;
  font-size: 16px;
  padding: 4px;
  margin-left: 8px;
  text-align: center;
}

.button-row {
  display: flex;
  justify-content: space-around;
  gap: 12px;
}

.button-row button {
  flex: 1;
  padding: 8px 0;
  font-size: 14px;
}

.button-row .angry {
  background: #e53935;
  color: white;
}

.button-row .angry:hover {
  background: #c62828;
}
</style>

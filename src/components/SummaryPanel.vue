<template>
  <div class="summary-panel" v-if="ended">
    <p class="summary-note">
      这就是 20 年后的情况。<br />
      有的猴子有 {{ maxBanana }} 根香蕉，
      而有的猴子
      <span v-if="minBanana === 0">一无所有。</span>
      <span v-else>只有 {{ minBanana }} 根香蕉。</span>
    </p>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useSimulationStore } from '../store/simulation'

const store = useSimulationStore()

const ended = computed(() => store.frameIndex >= store.totalFrames)

const last = computed(() => store.history.at(-1) || [])

const maxBanana = computed(() => Math.max(...last.value))
const minBanana = computed(() => Math.min(...last.value))
</script>

<style scoped>
.summary-panel {
  background: #f6f6f9;
  border-radius: 12px;
  padding: 24px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  color: #444;
  max-width: 420px;
  margin: 24px auto 0 auto;
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
}

.summary-note {
  color: #555;
}

</style>

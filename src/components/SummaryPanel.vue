<template>
  <div class="summary-panel" v-if="ended">
    <p class="summary-note">
      这就是 20 年后的情况。<br />
      有的猴子有 {{ maxBanana }} 根香蕉，
      而有的猴子
      <span v-if="minBanana === 0">一无所有。</span>
      <span v-else>只有 {{ minBanana }} 根香蕉。</span>
    </p>

    <!-- 👇 用户选择了自己是某只猴子时，展示个性化结果 -->
    <p class="summary-personal" v-if="store.userMonkeyIndex !== null && personalBanana !== null">
      <template v-if="personalBanana === 0">
        笑死，{{ store.userMonkeyIndex + 1 }}号猴子，你怎么没有香蕉了。
      </template>
      <template v-else-if="personalBanana < 20">
        你，{{ store.userMonkeyIndex + 1 }}号猴子，只有 {{ personalBanana }} 根香蕉。
      </template>
      <template v-else-if="personalBanana === 20">
        你，{{ store.userMonkeyIndex + 1 }}号猴子，怎么还是 20 根香蕉。
      </template>
      <template v-else>
        你，{{ store.userMonkeyIndex + 1 }}号猴子，居然有 {{ personalBanana }} 根香蕉。
      </template>
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

const personalBanana = computed(() => {
  const index = store.userMonkeyIndex
  if (index === null) return null
  return store.apes[index] ?? null
})

</script>

<style scoped>
.summary-panel {
  background: #f6f6f9;
  border-radius: 12px;
  padding: 24px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  color: #444;
  max-width: 420px;
  margin: 24px auto 0 auto;
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
}

.summary-note {
  color: #555;
  margin-bottom: 12px;
}

.summary-personal {
  color: #4a90e2;
  font-weight: bold;
}
</style>

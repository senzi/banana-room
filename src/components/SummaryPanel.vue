<template>
  <div class="summary-panel" v-if="ended">
    <p class="summary-note">
      这就是 20 年后的情况。<br />
      有的猴子有 {{ maxBanana }} 根🍌，
      而有的猴子
      <span v-if="minBanana === 0">一无所有。</span>
      <span v-else>只有 {{ minBanana }} 根🍌。</span>
    </p>

    <div class="summary-extra-list">
      <div class="row">
        <span class="icon">📏 中位数</span>
        <span class="value">{{ medianBanana }} 根🍌</span>
      </div>
      <div class="row">
        <span class="icon">📊 方差</span>
        <span class="value">{{ variance.toFixed(2) }}</span>
      </div>
      <template v-if="store.userMonkeyIndex !== null && personalRank !== null">
        <div class="row">
          <span class="icon">🥇 排名</span>
          <span class="value">第 {{ personalRank }}，打赢 {{ 20 - personalRank }} 只</span>
        </div>
      </template>
      <div class="row">
        <span class="icon">📐 Gini 系数</span>
        <span class="value">{{ gini.toFixed(3) }}</span>
      </div>
    </div>

    <div class="gini-highlight" v-if="gini !== null">
      <span v-if="gini < 0.2">🌱 太平均了，像体检报告的血糖值。</span>
      <span v-else-if="gini < 0.4">🧊 差距不小，但还能忍。</span>
      <span v-else-if="gini < 0.6">💢 是时候质疑“规则公平”了。</span>
      <span v-else>🔥 香蕉寡头统治时代来临。</span>
    </div>

    <!-- 👇 用户选择了自己是某只猴子时，展示个性化结果 -->
    <p class="summary-personal" v-if="store.userMonkeyIndex !== null && personalBanana !== null">
      <template v-if="personalBanana === 0">
        笑死，{{ store.userMonkeyIndex + 1 }}号猴子，你怎么没有🍌了。
      </template>
      <template v-else-if="personalBanana < 20">
        而你，{{ store.userMonkeyIndex + 1 }}号猴子，只有 {{ personalBanana }} 根🍌。
      </template>
      <template v-else-if="personalBanana === 20">
        而你，{{ store.userMonkeyIndex + 1 }}号猴子，怎么还是 20 根🍌。
      </template>
      <template v-else>
        而你，{{ store.userMonkeyIndex + 1 }}号猴子，居然有 {{ personalBanana }} 根🍌。
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

const medianBanana = computed(() => {
  const sorted = [...last.value].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
})

const variance = computed(() => {
  const mean = last.value.reduce((a, b) => a + b, 0) / last.value.length
  return last.value.reduce((sum, val) => sum + (val - mean) ** 2, 0) / last.value.length
})

const personalRank = computed(() => {
  if (store.userMonkeyIndex === null || personalBanana.value === null) return null
  const sorted = [...last.value].sort((a, b) => b - a)
  return sorted.findIndex(v => v === personalBanana.value) + 1
})

const gini = computed(() => {
  const values = [...last.value].sort((a, b) => a - b)
  const n = values.length
  const sum = values.reduce((a, b) => a + b, 0)
  if (sum === 0) return 0
  let cumulative = 0
  for (let i = 0; i < n; i++) {
    cumulative += values[i] * (i + 1)
  }
  return (2 * cumulative) / (n * sum) - (n + 1) / n
})
</script>

<style scoped>
.summary-panel {
  background: #f6f6f9;
  border-radius: 12px;
  padding: 18px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  color: #444;
  max-width: 420px;
  margin: 16px auto 0 auto;
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
}

.summary-note {
  color: #555;
  margin-bottom: 10px;
}

.summary-personal {
  color: #e04a4a;
  font-weight: bold;
  margin-top: 14px;
  font-size: 16px;
}

.summary-extra-list {
  text-align: left;
  background: #fff;
  border-radius: 8px;
  padding: 10px 12px; /* ⬅️ 缩小 padding */
  margin: 14px auto;
  font-size: 13.5px;   /* ⬅️ 略微缩小字体 */
  line-height: 1.5;
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  max-width: 300px;    /* ⬅️ 从 360px 缩到 300px 更聚焦 */
}


.summary-extra-list .row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.summary-extra-list .icon {
  font-weight: 500;
  color: #555;
  min-width: 90px; /* 原本 100px，可以根据你的表情+文字长度稍微紧缩 */
}


.summary-extra-list .value {
  text-align: right;
  font-weight: 600;
  color: #222;
}

.gini-highlight {
  margin-top: 12px;
  text-align: center;
  font-weight: bold;
  color: #e55353;
  font-size: 15px;
}

</style>

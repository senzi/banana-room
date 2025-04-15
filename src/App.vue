<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSimulationStore } from './store/simulation'
import { onOrientationChange } from './utils/orientation'

import OrientationTip from './components/OrientationTip.vue'
import TitleSection from './components/TitleSection.vue'
import RulesBox from './components/RulesBox.vue'
import ChartPanel from './components/ChartPanel.vue'
import ControlPanel from './components/ControlPanel.vue'
import SummaryPanel from './components/SummaryPanel.vue'
import FooterSection from './components/FooterSection.vue'

const chartSection = ref<HTMLElement | null>(null)

onMounted(() => {
  const store = useSimulationStore()
  if (!store.history.length) {
    store.initSimulation()
  }

  // ✅ 横屏时自动滚动到图表区（延迟 300ms 更稳）
  onOrientationChange((isLandscape) => {
    if (isLandscape && chartSection.value) {
      setTimeout(() => {
        chartSection.value?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  })
})
</script>

<template>
  <div class="page-container">
    <div class="main-content">
      <OrientationTip />
      <TitleSection>
        <template #rules>
          <RulesBox />
        </template>
      </TitleSection>

      <div ref="chartSection" class="scroll-anchor">
        <ChartPanel />
        <ControlPanel />
      </div>

      <SummaryPanel />
    </div>

    <!-- 页脚放在容器最底下 -->
    <FooterSection />
  </div>
</template>


<style scoped>

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 撑满一整屏 */
}

.main-content {
  flex: 1; /* 中间的内容自动撑开 */
}

.scroll-anchor {
  scroll-margin-top: 48px;
}
</style>

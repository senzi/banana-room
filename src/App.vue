<script setup>
import { onMounted } from 'vue'
import { useSimulationStore } from './store/simulation'
import OrientationTip from './components/OrientationTip.vue'
import TitleSection from './components/TitleSection.vue'
import RulesBox from './components/RulesBox.vue'
import ChartPanel from './components/ChartPanel.vue'
import ControlPanel from './components/ControlPanel.vue'
import SummaryPanel from './components/SummaryPanel.vue'
import FooterSection from './components/FooterSection.vue'

onMounted(() => {
  const store = useSimulationStore()
  if (!store.history.length) {
    store.initSimulation()
  }
})
</script>

<template>
  <OrientationTip />
  <TitleSection>
    <template #rules>
      <RulesBox />
    </template>
  </TitleSection>
  <ChartPanel />
  <ControlPanel />
  <SummaryPanel />
  <FooterSection />
</template>

<style scoped>
/* 清除默认 vite 示例 logo 样式 */
</style>

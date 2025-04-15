<script setup>
import { onMounted } from 'vue'
import { useSimulationStore } from './store/simulation'
import OrientationTip from './components/OrientationTip.vue'
import TitleSection from './components/TitleSection.vue'
import RulesBox from './components/RulesBox.vue'
import ChartPanel from './components/ChartPanel.vue'
import ControlPanel from './components/ControlPanel.vue'
import SummaryPanel from './components/SummaryPanel.vue'

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
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

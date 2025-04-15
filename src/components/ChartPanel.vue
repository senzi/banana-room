<template>
  <div class="chart-panel">
    <div class="legend">
      <span class="legend-box blue"></span> 热门送出者
      <span class="legend-box yellow"></span> 热门接收者
    </div>
    <div ref="chartRef" class="chart-box"></div>
    <div class="day-indicator">🕒 第 {{ currentDay }} 天 / 共 7300 天</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useSimulationStore } from '../store/simulation'
import { onOrientationChange } from '../utils/orientation'

echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null
const store = useSimulationStore()

// 统计当前帧中的 Top 3 赠出/接收者
function getTopActors() {
  const fromCount: Record<number, number> = {}
  const toCount: Record<number, number> = {}

  for (const h of store.highlight) {
    fromCount[h.from] = (fromCount[h.from] || 0) + 1
    toCount[h.to] = (toCount[h.to] || 0) + 1
  }

  const topFrom = Object.entries(fromCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => Number(id))

  const topTo = Object.entries(toCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => Number(id))

  return { topFrom, topTo }
}

// 当前第几天（展示用）
const currentDay = computed(() => store.getCurrentDay())

function renderChart() {
  if (!chartRef.value) return
  if (!chart) chart = echarts.init(chartRef.value)

  const { topFrom, topTo } = getTopActors()

  chart.setOption({
    grid: { left: 24, right: 24, top: 24, bottom: 60 },
    xAxis: {
      type: 'category',
      data: store.apes.map((_, i) => `猴${i + 1}`),
      axisLabel: { color: '#888', fontSize: 13 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100, // ✅ 加上这个，避免播放中抖动
      axisLabel: { color: '#888', fontSize: 13 }
    },
    series: [{
      type: 'bar',
      data: store.apes.map((v, i) => {
        let color = '#e0e0e0'
        if (topFrom.includes(i)) color = '#4a90e2' // 蓝色
        if (topTo.includes(i)) color = '#ffd600'   // 黄色
        return {
          value: v,
          itemStyle: { color }
        }
      }),
      barWidth: 20,
      animation: false,
      label: {
        show: true,
        position: 'top',
        fontSize: 12,
        color: '#333',
        formatter: '{c}'
      }
    }]
  })

}

onMounted(() => {
  renderChart()
  onOrientationChange(() => {
    chart?.resize()
  })
})
onUnmounted(() => {
  chart?.dispose()
})

// 监听 apes 和 highlight 的变化重新渲染
watch(() => [store.apes, store.highlight], () => {
  renderChart()
}, { deep: true })
</script>

<style scoped>
.chart-panel {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 8px;
}

.chart-box {
  width: 100%;
  height: 220px;
}


.day-indicator {
  margin-top: 6px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.legend {
  margin: 6px auto;
  font-size: 13px;
  color: #666;
  text-align: center;
}

.legend-box {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  border-radius: 2px;
}

.legend-box.blue {
  background: #4a90e2;
}

.legend-box.yellow {
  background: #ffd600;
}
</style>

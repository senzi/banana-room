import { defineStore } from 'pinia'

export interface Highlight {
  from: number;
  to: number;
}

export interface SimulationState {
  apes: number[];               // 当前香蕉分布（最新快照）
  history: number[][];          // 每天的状态快照
  highlight: Highlight[];       // 当前帧的所有交互（多天合并）
  frameIndex: number;           // 当前第几帧（非天）
  frameSize: number;            // 每帧多少天（30 或 100）
  totalFrames: number;          // 总帧数
  running: boolean;
  speed: number;                // 播放速度 ms/帧
  _highlightMap?: Highlight[][];// 私有记录：每天交互
}

// 模拟逻辑
function simulate(years = 20, days = 365) {
  const result: number[][] = []
  const highlightMap: Highlight[][] = []
  const apes = Array(20).fill(20)

  for (let i = 0; i < years * days; i++) {
    const dayHighlight: Highlight[] = []
    for (let j = 0; j < 20; j++) {
      if (apes[j] > 0) {
        apes[j]--
        let to = Math.floor(Math.random() * 19)
        if (to >= j) to++
        apes[to]++
        dayHighlight.push({ from: j, to })
      }
    }
    result.push([...apes])
    highlightMap.push([...dayHighlight])
  }

  return { history: result, highlightMap }
}

export const useSimulationStore = defineStore('simulation', {
  state: (): SimulationState => ({
    apes: Array(20).fill(20),
    history: [],
    highlight: [],
    frameIndex: 0,
    frameSize: 100, // 默认每帧100天
    totalFrames: 0,
    running: false,
    speed: 500,
    _highlightMap: []
  }),
  actions: {
    initSimulation(frameSize = 100) {
      const { history, highlightMap } = simulate()
      this.history = history
      this._highlightMap = highlightMap
      this.frameSize = frameSize
      this.totalFrames = Math.ceil(history.length / frameSize)
      this.frameIndex = 0
      this.highlight = []
      this.apes = Array(20).fill(20)
      this.running = false
    },

    playStep() {
      if (this.frameIndex < this.totalFrames) {
        const start = this.frameIndex * this.frameSize
        const end = Math.min(start + this.frameSize, this.history.length)

        this.apes = [...this.history[end - 1]] // 当前帧最后一天状态

        const highlightChunk = this._highlightMap
          ?.slice(start, end)
          .flat() ?? []

        this.highlight = highlightChunk

        this.frameIndex++
      } else {
        this.running = false
      }
    },

    reset() {
      this.initSimulation(this.frameSize)
    },

    setSpeed(val: number) {
      this.speed = val
    },

    setRunning(val: boolean) {
      this.running = val
    },

    setFrameSize(size: number) {
      this.initSimulation(size)
    },

    getCurrentDay(): number {
      return Math.min((this.frameIndex) * this.frameSize, this.history.length)
    }
  }
})


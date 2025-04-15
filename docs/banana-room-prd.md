# banana-room 产品需求文档（PRD）

## 项目名称

**banana-room**

## 简要描述

A minimalist simulation that starts with equal monkeys and ends with unequal bananas. Rules only. No opinions.

---

## 项目目标

构建一个可在移动端流畅运行的、基于 Vue + Vite 构建的 Web 模拟器，用于演示随机交换规则下的非对称结果演化。

模拟逻辑源自 tombkeeper 的微博文章《即便起跑时完全一样，最终也还是会不同》，通过可视化手段表现 20 只猴子、7300 天的香蕉重分配过程。

不做结论，不加点评，强调“规则 → 过程 → 结果”的观察体验。

---

## 架构技术栈

- Vite + Vue 3 + Composition API
- ECharts 或 Chart.js（柱状图）
- Pinia（状态管理）
- CSS 动画或 class 控制（实现高亮闪烁）
- 支持部署到 Cloudflare Functions + Pages

---

## 页面结构概览

### 页面路径

`/`

### 页面模块划分

```text
┌─────────────────────────────┐
│ 🐵 TitleSection             │ // 项目标题 + 展开规则说明
├─────────────────────────────┤
│ 📄 RulesBox (可折叠)         │ // 展示文字描述的规则
├─────────────────────────────┤
│ 📊 ChartPanel               │ // 当前 banana 分布柱状图 + 闪烁动画
├─────────────────────────────┤
│ 🎮 ControlPanel             │ // 控制播放、速率、重置
├─────────────────────────────┤
│ 📈 SummaryPanel             │ // 最终结果展示（不解释）
└─────────────────────────────┘
```

---

## 页面交互说明

### TitleSection

- 展示文字：
  - 主标题：`这是一个关于猴子和香蕉的故事`
  - 子标题按钮：`▽ 展开规则`
- 点击展开后，显示 RulesBox

### RulesBox

> 展示固定的规则说明（文字内容）：

```text
有 20 只猴子，每只猴子最初拥有 20 根香蕉。
每天，每只猴子会随机赠出一根香蕉（若它还有）。
接收者随机，不能是自己。
赠出是义务，接收是机会。不能欠债。
以上操作持续 20 年（共 7300 天）。
```

### ChartPanel

- 展示每只猴子的当前香蕉数量（柱状图）
- 每轮播放时：高亮赠出者（蓝色闪烁）与接收者（黄色闪烁）
- 默认每轮间隔：500ms，可调整

### ControlPanel

- 控件说明：
  - ▶️ 开始 / ⏸️ 暂停
  - 🔁 重置模拟
  - 🐢-🐇 速率调节滑条（100ms \~ 1000ms）
- 每次开始模拟会预计算整个 history（7300 轮），用于前端回放

### SummaryPanel（最终结果展示）

- 播放结束后显示：
  - 最大值 / 最小值
  - 最大 vs 最小的柱状图显示
  - 无任何结论性语言
  - 示例文案：
    > 这就是 20 年后。 最大：61 根香蕉，最小：2 根。

---

## 数据结构与状态管理

```ts
interface SimulationState {
  apes: number[];          // 当前香蕉数（用于绘图）
  history: number[][];     // 所有天的香蕉状态快照
  highlight: {             // 当前轮次高亮信息
    from: number;
    to: number;
  } | null;
  currentDay: number;      // 播放进度
  running: boolean;
  speed: number;           // 播放速度（ms/轮）
}
```

> 建议使用 Pinia 统一管理；或用 provide/inject 管理局部状态。

---

## 模拟逻辑说明

### 初始状态

- `apes = Array(20).fill(20)`

### 每天分配规则

- 每只猴子（如 apes[i] > 0）：
  - 减去 1 根香蕉
  - 随机选择另一只猴子（≠ i），加 1 根香蕉

### 模拟运行：

```ts
function simulate(years = 20, days = 365) => number[][] {
  const result = []
  const apes = Array(20).fill(20)

  for (let i = 0; i < years * days; i++) {
    const dayHighlight = []
    for (let j = 0; j < 20; j++) {
      if (apes[j] > 0) {
        apes[j]--
        const to = randomOther(20, j)
        apes[to]++
        dayHighlight.push({ from: j, to })
      }
    }
    result.push([...apes])
    // 可选：记录 highlight 的映射表供播放时参考
  }

  return result
}
```

---

## UI/UX 注意事项

- 移动端为主，图表应支持横向滚动（overflow-x）
- 柱状图颜色柔和，非高亮状态统一浅灰色
- 高亮颜色：
  - 赠出者：蓝色
  - 接收者：黄色
- 所有文字描述避免结论性评判，仅陈述事实和规则
- 速度调节建议分为：慢（1000ms）/ 中（500ms）/ 快（100ms）三档
- 初始进入页面为静止状态，由用户手动启动模拟

---



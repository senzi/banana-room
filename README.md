# 🍌 banana-room

> A minimalist simulation that starts with equal monkeys and ends with unequal bananas.  
> Rules only. No opinions.

这是一个关于猴子和香蕉的故事。  
起点相同，规则简单，分配随机，时间流逝，结果却不同。

---

## 🔗 Live Demo

👉 [banana.closeai.moe](https://banana.closeai.moe)

---

## 📦 使用方式

项目使用 [Bun](https://bun.sh/) 作为开发工具链。

### 📥 安装依赖

```bash
bun install
```

### 🚀 本地运行

```bash
bun run dev
```

### 🛠️ 构建生产环境

```bash
bun run build
```

### 👀 本地预览构建结果

```bash
bun run preview
```

---

## 🧠 模拟规则

- 20 只猴子，每只最初拥有 20 根香蕉
- 每天，每只猴子会（如果还有香蕉）随机送出一根香蕉
- 接收者随机，不能是自己
- 不可负债，接受无门槛
- 模拟持续 20 年（共 7300 天）

---

## ✨ 展示方式

- 每一帧代表 100 天
- 每帧展示：
  - 当前香蕉分布（柱状图）
  - 热门赠出者（蓝色） / 热门接收者（黄色）
- 最后展示差距结果，不加评判

---

## 🐵 个性化交互

- 在开始动画前，用户会被问「你是几号猴子？」
- 若填写编号，则在 20 年后结局中显示专属文案：
  - "笑死，1号猴子，你怎么没有香蕉了。"
  - "你，3号猴子，只有 5 根香蕉。"
  - "你，5号猴子，居然有 71 根香蕉。"

---

## 📁 项目结构简述

```
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── store/
│   ├── utils/
│   ├── App.vue
│   └── main.js
├── index.html
└── bun.lockb
```

---

## 🖼️ 示例预览

> 最后一天，有的猴子拥有 83 根香蕉，  
> 而有的猴子一无所有。

---

## 📜 License

MIT

---

## 💡 灵感来源

本项目灵感来自微博用户 [@tombkeeper](https://weibo.com/ttarticle/p/show?id=2309404786168779899143) 的文章：  
《即便起跑时完全一样，最终也还是会不同》


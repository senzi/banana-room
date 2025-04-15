# 🍌 banana-room

> A minimalist simulation that starts with equal monkeys and ends with unequal bananas.  
> Rules only. No opinions.

<br/>

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

## 📁 项目结构简述

```
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── store/
│   ├── views/
│   ├── App.vue
│   └── main.ts
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
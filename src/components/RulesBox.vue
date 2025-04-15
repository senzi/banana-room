<template>
  <div class="rules-box">
    <h2>规则说明</h2>
    <ul>
      <li>有 20 只猴子，每只猴子最初拥有 20 根香蕉。</li>
      <li>每天，每只猴子会随机赠出一根香蕉（若它还有）。</li>
      <li>接收者随机，不能是自己。</li>
      <li>赠出是义务，接收是机会。不能欠债。</li>
      <li>以上操作持续 20 年（共 7300 天）。</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 无逻辑，仅静态规则说明
</script>

<style scoped>
.rules-box {
  background: #f6f6f9;
  border-radius: 12px;
  padding: 18px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  color: #444;
  font-size: 1.05em;
  text-align: left;
  max-width: 420px;
  margin: 0 auto;
}
h2 {
  font-size: 1.1em;
  color: #b47d00;
  margin-bottom: 0.5em;
}
ul {
  padding-left: 1.2em;
  margin: 0;
}
li {
  margin-bottom: 0.3em;
}
</style>

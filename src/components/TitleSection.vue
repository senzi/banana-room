<template>
  <section class="title-section">
    <h1>这是一个关于猴子和香蕉的故事</h1>
    <button class="expand-btn" @click="showRules = !showRules">
      <span v-if="!showRules">▽ 展开规则</span>
      <span v-else>△ 收起规则</span>
    </button>
    <transition name="fade">
      <div v-if="showRules" class="rules-box-wrapper">
        <slot name="rules"></slot>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showRules = ref(false)
</script>

<style scoped>
.title-section {
  padding: 24px 0 8px 0;
  text-align: center;
}
h1 {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
}
.expand-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 1em;
  cursor: pointer;
  margin-bottom: 8px;
}
.rules-box-wrapper {
  margin-top: 12px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

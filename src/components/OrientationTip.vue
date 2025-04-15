<template>
  <transition name="fade">
    <div v-if="show" class="orientation-tip">
      <div class="orientation-tip-content">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="8" y="14" width="32" height="20" rx="4" fill="#f7c948"/><rect x="18" y="18" width="12" height="12" rx="2" fill="#fff"/><rect x="13" y="13" width="22" height="22" rx="3" stroke="#f7c948" stroke-width="2"/></svg>
        <p>请横屏体验<br><small>Please rotate your device horizontally</small></p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { isMobile, isLandscape, onOrientationChange } from '../utils/orientation'

const show = ref(false)

function check() {
  show.value = isMobile() && !isLandscape()
}

onMounted(() => {
  check()
  onOrientationChange(() => {
    check()
  })
})
onUnmounted(() => {
  // nothing
})
</script>

<style scoped>
.orientation-tip {
  position: fixed;
  z-index: 9999;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.orientation-tip-content {
  background: #fffbe6;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  text-align: center;
  color: #b47d00;
  font-size: 1.2em;
}
.orientation-tip-content svg {
  margin-bottom: 12px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

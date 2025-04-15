import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()         // ✅ 保存实例
app.use(pinia)                      // ✅ 只 use 这个 pinia
app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css' // 全局样式：设计令牌 + 元素级外观（放这里 = 全站生效）

const app = createApp(App)

app.use(createPinia())

app.mount('#app')

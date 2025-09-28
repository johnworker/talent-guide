// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router' // 這裡只寫資料夾，會自動讀 index.js
import App from './App.vue'
import './index.css'
import 'vue3-toastify/dist/index.css'
import reveal from './directives/reveal'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
app.directive('reveal', reveal)
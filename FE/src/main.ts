import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import stores from '@/stores'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(stores)
app.mount('#app')

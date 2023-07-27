import { createApp } from 'vue'
import naive from 'naive-ui'
import { createPinia } from 'pinia'
import { router } from './routes'
import App from './App.vue'
import './app.scss'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(naive)
app.mount('#app')

import './assets/main.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Button } from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button)

app.mount('#app')

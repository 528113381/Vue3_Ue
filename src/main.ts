import { createApp } from 'vue'
import pinia from '@/stores'
import App from './App.vue'
import router from './router'
import '@/styles/main.scss'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style';
import 'virtual:svg-icons-register'



const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

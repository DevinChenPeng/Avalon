import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  // create naive ui
  create,
  // component
  NButton,
  NCol,
  NForm,
  NFormItem,
  NInput,
  NRow,
} from 'naive-ui'
// 通用字体
import 'vfonts/Lato.css'
import App from './App.vue'
import router from './router'
import '@/styles/index.less'

const app = createApp(App)

const naive = create({
  components: [NButton, NForm, NFormItem, NInput, NRow, NCol],
})
app.use(createPinia())
app.use(router)
app.use(naive)

app.mount('#app')

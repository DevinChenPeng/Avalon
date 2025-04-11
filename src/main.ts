import { createApp } from 'vue';
import { createPinia } from 'pinia';

// 通用字体
import 'vfonts/Lato.css';
import App from './App.vue';
import router from './router';
import '@/styles/index.less';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

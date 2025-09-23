import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { i18n } from './i18n';
import App from './App.vue';

// 全域樣式
import "./style.scss";

const app = createApp(App);
app.use(createPinia());
app.use(i18n);
app.mount('#app');

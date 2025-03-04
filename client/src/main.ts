import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import ToastPlugin from "./plugins/toast.ts";

createApp(App).use(ToastPlugin).mount('#app')

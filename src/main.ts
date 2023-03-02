import { createApp } from 'vue'
import { createPinia } from "pinia";
import { i18n } from "@/locales/i18n";
import App from "./App.vue";
import router from "./router";
import "./assets/css/app.css";

createApp(App).use(i18n).use(router).use(createPinia()).mount('#app')

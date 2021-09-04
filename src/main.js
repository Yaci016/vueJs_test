import { createApp } from "vue";
import App from "./App.vue";
import router from "router/index.js";
import store from "Store/index.js";
import axios from "axios";
window.axios = axios;

createApp(App).use(store).use(router).mount("#app");

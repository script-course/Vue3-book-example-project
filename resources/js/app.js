import axios from "axios";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes/index";

import App from "./App.vue";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");

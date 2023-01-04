import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./app.vue";
import router from "./router";

import "./assets/main.css";
import { registerViews } from "./views/register";

const app = createApp(App);

app.use(createPinia());
app.use(router);

registerViews(app);

app.mount("#app");

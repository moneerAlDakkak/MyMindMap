import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import * as m from "mairs";
import "mairs/components-style";
createApp(App).use(m).use(store).use(router).mount("#app");

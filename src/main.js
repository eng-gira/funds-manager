import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import "./assets/main.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";


import { FaPen, IoAddCircleOutline  } from "oh-vue-icons/icons";

addIcons( FaPen, IoAddCircleOutline  );


createApp(App).use(store).use(router).component("v-icon", OhVueIcon).mount("#app");

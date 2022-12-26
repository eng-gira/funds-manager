import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import "./assets/main.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";


import { FaPen } from "oh-vue-icons/icons";

addIcons( FaPen );


createApp(App).use(store).use(router).component("v-icon", OhVueIcon).mount("#app");

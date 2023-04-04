/* Set up using Vue 3 */
import { createApp } from "vue";
import App from "./App.vue";
/* Add tailwindcss */
import "./assets/tailwind.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import router from './router'
import store from './store'
/* add icons to the library */
library.add(fas, fab, far);

createApp(App).use(store).use(router).use(router).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");

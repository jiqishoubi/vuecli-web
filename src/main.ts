import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// element plus
import ElementPlus, { ElIcon } from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/dist/index.css";
// element plus end

createApp(App).use(store).use(router).use(ElementPlus, { locale }).use(ElIcon).mount("#app");

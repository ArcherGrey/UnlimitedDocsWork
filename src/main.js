import Vue from "vue";
// 引入element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 动画库
import anime from "animejs";
// markdown 转换
import marked from "marked";

// 引入 axios vue-axios
import axios from "axios";
import VueAxios from "vue-axios";

// 引入全局样式
import "../styles/common.scss";

import App from "./App.vue";

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

// 全局变量使用
Vue.prototype.$anime = anime;
Vue.prototype.$marked = marked;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

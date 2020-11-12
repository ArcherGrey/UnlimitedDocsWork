import Vue from "vue";
// 按需引入element
import "@/plugins/element";

// 动画库
import anime from "animejs";
// // markdown 转换
// import marked from "marked";

// 引入 axios vue-axios
import axios from "axios";
import VueAxios from "vue-axios";

// 引入全局样式
import "@/styles/common.scss";

import App from "./App.vue";

Vue.use(VueAxios, axios);

// 全局变量使用
Vue.prototype.$anime = anime;
// Vue.prototype.$marked = marked;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

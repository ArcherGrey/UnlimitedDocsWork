import { item } from "./common.js";
const parent = {
  id: "6.1",
  path: "./docs/FE_framework/vue/"
};
export const vueIndex = {
  id: "6.1",
  label: "vue",
  children: [
    item(parent, "过滤器", "filter"),
    item(parent, "生命周期", "life"),
    item(parent, "vdom", "vdom"),
    item(parent, "vue-devtools 安装使用", "devtools"),
    item(parent, "vue hook", "vhook"),
    item(parent, "插槽", "slot")
  ]
};

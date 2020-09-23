import { buildItemByType } from "./common.js";
const parent = {
  id: "6.1",
  path: "./docs/FE_framework/vue/"
};
const buildItem = buildItemByType(parent);
export const vueIndex = {
  id: parent.id,
  label: "vue",
  children: [
    buildItem("过滤器", "filter"),
    buildItem("生命周期", "life"),
    buildItem("vdom", "vdom"),
    buildItem("vue-devtools 安装使用", "devtools"),
    buildItem("vue hook", "vhook"),
    buildItem("插槽", "slot"),
    buildItem("watch", "watch")
  ]
};

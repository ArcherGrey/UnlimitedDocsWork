/* 前端框架和库 */
import { buildItemByType, buildSubmenu } from "./common.js";

const parent = {
  id: "6",
  path: "./docs/FE_framework/"
};
const bs = buildSubmenu(parent);

// vue
const p1 = bs(1, "vue");
const buildItem1 = buildItemByType(p1);
const vueIndex = {
  id: parent.id,
  label: "vue",
  children: [
    buildItem1("过滤器", "filter"),
    buildItem1("生命周期", "life"),
    buildItem1("vdom", "vdom"),
    buildItem1("vue-devtools 安装使用", "devtools"),
    buildItem1("vue hook", "vhook"),
    buildItem1("插槽", "slot")
  ]
};

export const fe_libsIndex = [vueIndex];

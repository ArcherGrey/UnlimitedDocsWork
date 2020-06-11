import { vueItem as item } from "./common.js";
const parent = {
  id: "6.1",
  path: "./docs/FE_framework/vue/"
};
export const vueIndex = {
  id: "6.1",
  label: "vue",
  children: [
    item(parent, 1, "过滤器", "filter"),
    item(parent, 2, "生命周期", "life"),
    item(parent, 2, "vdom", "vdom")
  ]
};

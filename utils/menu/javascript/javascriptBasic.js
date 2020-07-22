import { item } from "../common.js";
const parent = {
  id: "3.1",
  path: "./docs/JavaScript/basic/"
};
export const javascriptBasic = {
  id: "3.1",
  label: "基础",
  children: [
    item(parent, 1, "模板字面量", "模板字面量"),
    item(parent, 2, "set 和 map", "set_map"),
    item(parent, 3, "各种 for", "for"),
    item(parent, 4, "深拷贝", "copy")
  ]
};

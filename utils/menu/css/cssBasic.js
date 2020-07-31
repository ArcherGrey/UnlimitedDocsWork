import { item } from "../common.js";
const parent = {
  id: "2.3",
  path: "./docs/Css/basic/"
};
export const cssBasic = {
  id: "2.3",
  label: "基础",
  children: [
    item(parent, "word-break、word-wrap、white-space", "word"),
    item(parent, "响应式 & 自适应", "rdad"),
    item(parent, "水平垂直居中", "vhmid")
  ]
};

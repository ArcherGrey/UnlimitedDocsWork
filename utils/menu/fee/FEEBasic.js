import { item } from "../common.js";
const parent = {
  id: "5.1",
  path: "./docs/FEE/basic/"
};
export const FEEBasic = {
  id: "5.1",
  label: "基础",
  children: [
    item(parent, "原生 js 实现模块化", "原生js模块化"),
    item(parent, "各种模块化方案技术", "module"),
    item(parent, "yarn 常用命令", "yarnBook"),
    item(parent, "自动化导入模块", "reqcontext")
  ]
};

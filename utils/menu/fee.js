/* 前端工程化 */
import { buildItemByType, buildSubmenu } from "./common.js";

const parent = {
  id: "5",
  path: "./docs/FEE/"
};
const bs = buildSubmenu(parent);

// 模块化
const p1 = bs(1, "module");
const buildItem1 = buildItemByType(p1);
const feeBasic = {
  id: p1.id,
  label: "模块化",
  children: buildItem1([
    ["原生 js 实现模块化", "原生js模块化"],
    ["各种模块化方案技术", "module"],
    ["自动化导入模块", "reqcontext"],
    ["webpack 概念", "webpack_concepts"]
  ])
};

// 包管理工具
const p2 = bs(2, "package");
const buildItem2 = buildItemByType(p2);
const webpack = {
  id: p2.id,
  label: "package",
  children: buildItem2([["yarn 常用命令", "yarnBook"]])
};

// 其他工具
const p3 = bs(2, "utils");
const buildItem3 = buildItemByType(p3);
const webpack = {
  id: p3.id,
  label: "其他工具",
  children: buildItem3([["封装 axios", "package_axios"]])
};

export const feeIndex = [feeBasic, webpack];

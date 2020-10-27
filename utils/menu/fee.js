/* 前端工程化 */
import { buildItemByType, buildSubmenu } from "./common.js";

const parent = {
  id: "5",
  path: "./docs/FEE/"
};
const bs = buildSubmenu(parent);

// 基础
const p1 = bs(1, "basic");
const buildItem1 = buildItemByType(p1);
const feeBasic = {
  id: p1.id,
  label: "基础",
  children: buildItem1([
    ["原生 js 实现模块化", "原生js模块化"],
    ["各种模块化方案技术", "module"],
    ["yarn 常用命令", "yarnBook"],
    ["自动化导入模块", "reqcontext"]
  ])
};

// webpack
const p2 = bs(2, "webpack");
const buildItem2 = buildItemByType(p2);
const webpack = {
  id: p2.id,
  label: "webpack",
  children: buildItem2([["webpack 概念", "webpack_concepts"]])
};

export const feeIndex = [feeBasic, webpack];

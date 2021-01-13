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
    ["各种模块化方案技术", "module"],
    ["自动化导入模块", "reqcontext"],
    ["webpack 概念", "webpack_concepts"]
  ])
};

// 包管理工具
const p2 = bs(2, "package");
const buildItem2 = buildItemByType(p2);
const npmTools = {
  id: p2.id,
  label: "package",
  children: buildItem2([
    ["yarn 常用命令", "yarnBook"],
    ["npx", "npx"]
  ])
};

// 其他工具
const p3 = bs(3, "utils");
const buildItem3 = buildItemByType(p3);
const utils = {
  id: p3.id,
  label: "其他工具",
  children: buildItem3([
    ["封装 axios", "package_axios"],
    ["前端下载", "download"]
  ])
};

// 原理/实现
const p4 = bs(4, "write");
const buildItem4 = buildItemByType(p4);
const handWriite = {
  id: p4.id,
  label: "原理/实现",
  children: buildItem4([
    ["原生 js 实现模块化", "原生js模块化"],
    ["简易打包器实现", "minipack"]
  ])
};

// CI/CD 持续集成 持续部署
const p5 = bs(5, "release");
const buildItem5 = buildItemByType(p5);
const release = {
  id: p5.id,
  label: "CI/CD",
  children: buildItem5([["semantic-release", "semantic_release"]])
};
export const feeIndex = [feeBasic, npmTools, utils, handWriite, release];

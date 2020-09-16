/*
 * @Author: Grey
 * @Date: 2020-04-07 18:33:04
 * @LastEditTime: 2020-09-16 11:50:19
 * @Description: 所有文档目录
 * @FilePath: \UnlimitedDocsWork\index\index.js
 */

import { vueIndex } from "./vue.js";
import {
  leetcode,
  tree,
  sort,
  string,
  book,
  graph
} from "./algorithm/index.js";
import { HCapply, HClayout, HCbasic } from "./hc/index.js";
import { FEEBasic, webpack } from "./fee/index.js";
import { networkIndex } from "./network.js";
import { lintIndex } from "./lint.js";
import { explorerIndex } from "./explorer.js";
import { visualIndex } from "./visual.js";
import { gitIndex } from "./git.js";
import { macIndex, linuxIndex } from "./os/index.js";
import { javascriptBasic, javascriptAdvanced } from "./javascript/index.js";
import { npmIndex } from "./npm.js";
import { markdownIndex } from "./markdown.js";
export const menu = [
  {
    id: "1",
    label: "浏览器",
    children: explorerIndex
  },
  {
    id: "2",
    label: "html&css",
    children: [HCapply, HClayout, HCbasic]
  },
  {
    id: "3",
    label: "JavaScript",
    children: [javascriptBasic, javascriptAdvanced]
  },
  {
    id: "4",
    label: "网络",
    children: networkIndex
  },
  {
    id: "5",
    label: "前端工程化",
    children: [FEEBasic, webpack]
  },
  {
    id: "6",
    label: "前端框架和库",
    children: [vueIndex]
  },
  {
    id: "7",
    label: "npm",
    children: npmIndex
  },
  {
    id: "8",
    label: "git",
    children: gitIndex
  },
  {
    id: "9",
    label: "操作系统",
    children: [linuxIndex, macIndex]
  },
  {
    id: "10",
    label: "算法",
    children: [leetcode, tree, graph, sort, string, book]
  },
  {
    id: "11",
    label: "规范",
    children: lintIndex
  },
  {
    id: "12",
    label: "可视化",
    children: visualIndex
  },
  {
    id: "13",
    label: "markdown",
    children: markdownIndex
  }
];

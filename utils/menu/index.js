/*
 * @Author: Grey
 * @Date: 2020-04-07 18:33:04
 * @LastEditTime: 2020-11-09 18:26:25
 * @Description: 所有文档目录
 * @FilePath: \UnlimitedDocsWork\index\index.js
 */

import { fe_libsIndex } from "./fe_libs.js";
import { algorithmIndex } from "./algorithm.js";
import { hcIndex } from "./hc.js";
import { feeIndex } from "./fee.js";
import { networkIndex } from "./network.js";
import { lintIndex } from "./lint.js";
import { explorerIndex } from "./explorer.js";
import { visualIndex } from "./visual.js";
import { gitIndex } from "./git.js";
import { osIndex } from "./os.js";
import { esIndex } from "./es.js";
import { npmIndex } from "./npm.js";
import { markdownIndex } from "./markdown.js";
import { cloudIndex } from "./cloud.js";
import { quesIndex } from "./question.js";
export const menu = [
  {
    id: "1",
    label: "浏览器",
    children: explorerIndex
  },
  {
    id: "2",
    label: "html&css",
    children: hcIndex
  },
  {
    id: "3",
    label: "JavaScript",
    children: esIndex
  },
  {
    id: "4",
    label: "网络",
    children: networkIndex
  },
  {
    id: "5",
    label: "前端工程化",
    children: feeIndex
  },
  {
    id: "6",
    label: "前端框架和库",
    children: fe_libsIndex
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
    children: osIndex
  },
  {
    id: "10",
    label: "算法",
    children: algorithmIndex
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
  },
  {
    id: "14",
    label: "云服务",
    children: cloudIndex
  },
  {
    id: "15",
    label: "常见问题汇总",
    children: quesIndex
  }
];

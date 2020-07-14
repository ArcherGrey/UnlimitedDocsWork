/*
 * @Author: Grey
 * @Date: 2020-04-07 18:33:04
 * @LastEditTime: 2020-07-14 10:23:28
 * @Description: 所有文档目录
 * @FilePath: \UnlimitedDocsWork\index\index.js
 */

import { vueIndex } from "./vue.js";
import { leetcode, tree } from "./algorithm/index.js";
import { cssApply, cssLayout, cssBasic } from "./css/index.js";
import { feeIndex } from "./fee.js";
import { networkIndex } from "./network.js";
import { lintIndex } from "./lint.js";
import { visualIndex } from "./visual.js";
import { gitIndex } from "./git.js";
import { macIndex, linuxIndex } from "./os/index.js";
import { javascriptBasic } from "./javascript/index.js";
// import { FETools } from "./index/FE_Tools.js";
// import { Question } from "./Question.js";
export const index = [
  {
    id: "1",
    label: "html"
  },
  {
    id: "2",
    label: "css",
    children: [cssApply, cssLayout, cssBasic]
  },
  {
    id: "3",
    label: "JavaScript",
    children: [javascriptBasic]
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
    children: [vueIndex]
  },
  {
    id: "7",
    label: "后端"
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
    children: [
      {
        id: "10.1",
        label: "leetcode探索",
        children: [
          {
            id: "10.1.1",
            label: "队列&栈",
            path: "./docs/Algorithm/leetcode_Class/queue_stack.md"
          }
        ]
      },
      leetcode,
      tree
    ]
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
  }
  // {
  //   id: "12",
  //   label: "问题总结",
  //   children: [
  //     {
  //       id: "12.1",
  //       label: "css",
  //       path: "./docs/question"
  //     }
  //   ]
  // }
];

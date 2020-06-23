/*
 * @Author: Grey
 * @Date: 2020-04-07 18:33:04
 * @LastEditTime: 2020-06-23 19:56:48
 * @Description: 所有文档目录
 * @FilePath: \UnlimitedDocsWork\index\index.js
 */

import { vueIndex } from "./vue.js";
import { leetcode, tree } from "./algorithm/index.js";
import { cssApply, cssLayout, cssBasic } from "./css/index.js";
import { feeIndex } from "./fee.js";
import { networkIndex } from "./network.js";
import { lintIndex } from "./lint.js";
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
    children: [
      {
        id: "3.2",
        label: "基础",
        children: [
          {
            id: "3.2.1",
            label: "模板字面量",
            path: "./docs/JavaScript/es6/模板字面量.md"
          },
          {
            id: "3.2.2",
            label: "set 和 map",
            path: "./docs/JavaScript/es6/set_map.md"
          },
          {
            id: "3.2.3",
            label: "各种 for",
            path: "./docs/JavaScript/es6/for.md"
          }
        ]
      }
    ]
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
    label: "前端框架",
    children: [vueIndex]
  },
  {
    id: "7",
    label: "后端"
  },
  {
    id: "8",
    label: "前端工具"
    // children: [FETools]
  },
  {
    id: "9",
    label: "github"
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
  },{
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

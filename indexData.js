import { vueIndex } from "./index/vueIndex.js";
import { leetcode } from "./index/leetcode.js";
export const index = [
  {
    id: "1",
    label: "html"
  },
  {
    id: "2",
    label: "css",
    children: [
      {
        id: "2.1",
        label: "常用",
        children: [
          {
            id: "2.1.1",
            label: "纯 CSS 自定义关闭按钮",
            path: "./docs/Css/normal/closebutton.md"
          },
          {
            id: "2.1.2",
            label: "利用伪元素自定义图标",
            path: "./docs/Css/normal/fakeicon.md"
          },
          {
            id: "2.1.3",
            label: "滚动效果",
            path: "./docs/Css/normal/roll.md"
          },
          {
            id: "2.1.4",
            label: "可调整宽高 div",
            path: "./docs/Css/normal/resizediv.md"
          },
          {
            id: "2.1.2",
            label: "伪类实现悬浮动画",
            path: "./docs/Css/normal/hoverAnime.md"
          }
        ]
      },
      {
        id: "2.2",
        label: "布局",
        children: [
          {
            id: "2.2.1",
            label: "盒模型介绍",
            path: "./docs/Css/layout/box/index.md"
          },
          {
            id: "2.2.2",
            label: "flex",
            path: "./docs/Css/layout/box/flex.md"
          }
        ]
      },
      {
        id: "2.3",
        label: "技巧",
        children: [
          {
            id: "2.3.1",
            label: "精简 css 代码",
            path: "./docs/Css/tricks/cssBattle.md"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    label: "JavaScript",
    children: [
      {
        id: "3.1",
        label: "模块化",
        children: [
          {
            id: "3.1.1",
            label: "原生 js 实现模块化",
            path: "./docs/JavaScript/module/原生js模块化.md"
          },
          {
            id: "3.1.2",
            label: "各种模块化方案技术",
            path: "./docs/JavaScript/module/module.md"
          }
        ]
      },
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
      },
      {
        id: "3.3",
        label: "ajax",
        children: [
          {
            id: "3.3.1",
            label: "请求方式",
            path: "./docs/JavaScript/ajax/request.md"
          }
        ]
      }
    ]
  },
  {
    id: "4",
    label: "Http"
  },
  {
    id: "5",
    label: "webGis"
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
      leetcode
    ]
  },
  {
    id: "11",
    label: "翻译",
    children: [
      {
        id: "11.1",
        label: "计算机程序的构造和解释 SCIP",
        path: "./docs/translate/SICP.md"
      }
    ]
  }
];

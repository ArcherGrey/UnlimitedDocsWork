/* html & css */
import { buildItemByType, buildSubmenu } from "./common.js";

const parent = {
  id: "2",
  path: "./docs/HC/"
};
const bs = buildSubmenu(parent);

// 基础
const p1 = bs(1, "basic");
const buildItem1 = buildItemByType(p1);
const HCbasic = {
  id: p1.id,
  label: "基础",
  children: buildItem1([
    ["word-break、word-wrap、white-space", "word"],
    ["响应式 & 自适应", "rdad"],
    ["水平垂直居中", "vhmid"],
    ["伪类伪元素", "pseudo"],
    ["定位", "position"],
    ["object 标签", "object"]
  ])
};

// 布局
const p2 = bs(2, "layout");
const buildItem2 = buildItemByType(p2);
const HClayout = {
  id: p2.id,
  label: "布局",
  children: buildItem2([
    ["盒模型介绍", "index"],
    ["flex 布局", "flex"],
    ["圣杯 双飞翼 布局", "layout1"],
    ["固定宽度布局", "width1"]
  ])
};

// 应用
const p3 = bs(3, "apply");
const buildItem3 = buildItemByType(p3);
const HCapply = {
  id: p3.id,
  label: "应用",
  children: buildItem3([
    ["纯 CSS 自定义关闭按钮", "closebutton"],
    ["利用伪元素自定义图标", "fakeicon"],
    ["滚动效果", "roll"],
    ["可调整宽高 div", "resizediv"],
    ["伪类实现悬浮动画", "hoverAnime"]
  ])
};

export const hcIndex = [HCbasic, HClayout, HCapply];

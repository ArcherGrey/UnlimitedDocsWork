import { item } from "../common.js";
const parent = {
  id: "2.1",
  path: "./docs/Css/apply/"
};
export const cssApply = {
  id: "2.1",
  label: "应用",
  children: [
    item(parent, "纯 CSS 自定义关闭按钮", "closebutton"),
    item(parent, "利用伪元素自定义图标", "fakeicon"),
    item(parent, "滚动效果", "roll"),
    item(parent, "可调整宽高 div", "resizediv"),
    item(parent, "伪类实现悬浮动画", "hoverAnime")
  ]
};

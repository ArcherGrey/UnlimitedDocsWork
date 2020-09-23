import { buildItemByType } from "./common.js";
const parent = {
  id: "13",
  path: "./docs/Markdown/"
};
const buildItem = buildItemByType(parent);
export const markdownIndex = [
  buildItem("GFM emoji", "gfmemoji"),
  buildItem("flowchart 流程图", "flowchart"),
  buildItem("markdown-it-vue 支持语法", "markdown_it_vue")
];

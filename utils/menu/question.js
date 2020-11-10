import { buildItemByType } from "./common.js";
const parent = {
  id: "15",
  path: "./docs/question/"
};
const buildItem = buildItemByType(parent);
export const quesIndex = buildItem([
  ["浏览器", "browser"],
  ["css", "css"],
  ["echarts", "echarts"],
  ["element", "element"],
  ["git", "git"],
  ["javascript", "javascript"],
  ["npm", "npm"],
  ["vue", "vue"]
]);

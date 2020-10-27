import { buildItemByType } from "./common.js";
const parent = {
  id: "11",
  path: "./docs/Lint/"
};
const buildItem = buildItemByType(parent);
export const lintIndex = buildItem([
  ["git 提交规范", "git_commit"],
  ["css 规范", "css"],
  ["JavaScript 分号结尾", "semicolon"]
]);

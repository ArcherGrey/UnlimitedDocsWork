import { buildItemByType } from "./common.js";
const parent = {
  id: "1",
  path: "./docs/Explorer/"
};
const buildItem = buildItemByType(parent);
export const explorerIndex = [buildItem("浏览器内部工作原理", "explorer")];

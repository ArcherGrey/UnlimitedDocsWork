import { buildItemByType } from "./common.js";
const parent = {
  id: "7",
  path: "./docs/Npm/"
};
const buildItem = buildItemByType(parent);
export const npmIndex = [
  buildItem("索引", "index"),
  buildItem("CommitLint", "CommitLint"),
  buildItem("husky", "husky"),
  buildItem("nrm", "nrm"),
  buildItem("AnyWhere", "anywhere"),
  buildItem("rimraf", "rimraf")
];

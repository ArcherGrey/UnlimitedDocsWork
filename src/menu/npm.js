import { buildItemByType } from "./common.js";
const parent = {
  id: "7",
  path: "./docs/Npm/"
};
const buildItem = buildItemByType(parent);
export const npmIndex = buildItem([
  ["索引", "index"],
  ["CommitLint", "CommitLint"],
  ["husky", "husky"],
  ["nrm", "nrm"],
  ["AnyWhere", "anywhere"],
  ["rimraf", "rimraf"],
  ["chalk", "chalk"]
]);

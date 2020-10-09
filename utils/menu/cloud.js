/* 云服务 */
import { buildItemByType, buildSubmenu } from "./common.js";

const parent = {
  id: "14",
  path: "./docs/Cloud/"
};
const bs = buildSubmenu(parent);

// docker
const p1 = bs(1, "docker");
const buildItem1 = buildItemByType(p1);
const docker = {
  id: p1.id,
  label: "docker",
  children: [buildItem1("概述", "overview")]
};

// // webpack
// const p2 = bs(2, "webpack");
// const buildItem2 = buildItemByType(p2);
// const webpack = {
//   id: p2.id,
//   label: "webpack",
//   children: [buildItem2("webpack 概念", "webpack_concepts")]
// };

export const cloudIndex = [docker];

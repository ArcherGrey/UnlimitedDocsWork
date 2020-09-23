/* 操作系统 */

import { buildItemByType, buildSubmenu } from "./common.js";

const parent = {
  id: "9",
  path: "./docs/os/"
};
const bs = buildSubmenu(parent);

// linux
const p1 = bs(1, "linux");
const builItem1 = buildItemByType(p1);
const linuxIndex = {
  id: p1.id,
  label: "linux",
  children: [builItem1("wsl2 安装", "wsl2")]
};

// mac
const p2 = bs(2, "mac");
const builItem2 = buildItemByType(p2);
const macIndex = {
  id: p2.id,
  label: "mac",
  children: [builItem2("mac 常用操作", "mac")]
};

export const osIndex = [linuxIndex, macIndex];

import { buildItemByType } from "./common.js";
const parent = {
  id: "4",
  path: "./docs/Network/"
};
const buildItem = buildItemByType(parent);
export const networkIndex = [
  buildItem("get & post", "request"),
  buildItem("session & cookie", "cookie"),
  buildItem("sessionStorage 和 localStorage", "storage")
];

import { buildItemByType } from "./common.js";
const parent = {
  id: "8",
  path: "./docs/Git/"
};
const buildItem = buildItemByType(parent);
export const gitIndex = buildItem([
  ["github 无法登录", "host"],
  ["git 简明教程", "git"],
  ["Git Hooks", "githook"],
  ["gitbash tree 命令安装", "tree"],
  ["使用 ssh 连接 git", "ssh"],
  ["github 本地文件映射仓库", "init"]
]);

import { item } from "../common.js";
const parent = {
  id: "10.6",
  path: "./docs/Algorithm/leetcode_Class/"
};
export const book = {
  id: "10.6",
  label: "leetcode 探索",
  children: [
    item(parent, "队列&栈", "queue_stack"),
    item(parent, "哈希表", "hash"),
    item(parent, "递归", "recursion"),
    item(parent, "动态规划", "dynamic")
  ]
};

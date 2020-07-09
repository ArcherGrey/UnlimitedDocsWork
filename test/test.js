/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function (root) {
  if (!root) return 0;
  let ans = 0;
  // 保存当前节点和标志是否为左叶子
  let s = [{ node: root, pos: "root" }];
  while (s.length) {
    const x = s.pop();
    const node = x.node;
    const pos = x.pos;
    if (node.left) s.unshift({ node: node.left, pos: "left" });
    if (node.right) s.unshift({ node: node.right, pos: "right" });
    // 左叶子节点就累加
    if (!node.right && !node.left && pos == "left") {
      ans += node.val;
    }
  }
  return ans;
};

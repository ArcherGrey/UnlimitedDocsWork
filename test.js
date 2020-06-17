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
var maxDepth = function (root) {
  if (!root) return 0;
  let ans = 0;
  let s = [root];
  while (s.length) {
    const node = s.pop();
    if (node.left) s.push(node.left);
    if (node.right) s.push(node.right);
    if (node.left && node.right) ans = Math.max(s.length, ans);
  }
  return ans;
};

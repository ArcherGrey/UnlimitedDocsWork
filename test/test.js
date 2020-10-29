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
var sumNumbers = function(root) {
  if (!root) return 0;
  let ans = 0;
  let s = [[root, root.val]];
  while (s.length) {
    const cur = s.pop();
    const node = cur[0];
    const sum = cur[1];
    if (node.right) s.push([node.right, node.right.val + sum * 10]);
    if (node.left) s.push([node.left, node.left.val + sum * 10]);

    if (!node.left && !node.right) {
      ans += sum;
    }
  }
  return ans;
};

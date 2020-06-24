/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
  if (!root) return 0;
  let ans = [root.val, Math.abs(target - root.val)];
  while (root) {
    let t = Math.abs(root.val - target);
    if (t < ans[1]) {
      ans[1] = t;
      ans[0] = root.val;
    }

    // 目标比当前节点大，选择右子树
    if (target > root.val) {
      root = root.right;
    }
    // 小就选择左子树
    else if (target < root.val) {
      root = root.left;
    }
    // 相等直接返回结果
    else {
      return root.val;
    }
  }
  return ans[0];
};

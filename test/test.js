/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function(root) {
  let m = new Map();
  let max = 0;
  let ans = [];
  function preOrder(n) {
    if (!n) return;
    if (!m.has(n.val)) m.set(n.val, 1);
    else m.set(n.val, m.get(n.val) + 1);

    if (m.get(n.val) > max) {
      ans = [n.val];
      max = m.get(n.val);
    } else if (m.get(n.val) === max) {
      ans.push(n.val);
    }
    preOrder(n.left);
    preOrder(n.right);
  }
  preOrder(root);
  return ans;
};

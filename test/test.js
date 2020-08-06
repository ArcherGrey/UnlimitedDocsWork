/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  const q = [root, root];
  while (q.length) {
    let u = q.shift(),
      v = q.shift();
    if (!u && !v) continue;
    if (!u || !v || u.val != v.val) return false;
    // 每次把需要比较的一对按顺序加入
    q.push(u.left);
    q.push(v.right);
    q.push(u.right);
    q.push(v.left);
  }
  return true;
};

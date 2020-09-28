/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  function fn(a, b, c, d) {
    if (b < a || d < c) return null;
    let r = postorder[d];
    let ri = inorder.indexOf(r);
    let node = new TreeNode(r);
    node.left = fn(a, ri - 1, c, c + ri - 1 - a);
    node.right = fn(ri + 1, b, c + ri - a, d - 1);
    return node;
  }
  return fn(0, inorder.length - 1, 0, postorder.length - 1);
};

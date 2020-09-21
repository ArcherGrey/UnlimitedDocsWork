/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function(root) {
  if (!root) return root;
  let t = 0;
  function rInorder(node) {
    if (node.right) rInorder(node.right);
    t += node.val;
    node.val = t;
    if (node.left) rInorder(node.left);
  }
  rInorder(root);
  return root;
};

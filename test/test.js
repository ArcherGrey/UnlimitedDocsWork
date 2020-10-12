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
var getMinimumDifference = function(root) {
  let arr = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    arr.push(node.val);
    inorder(node.right);
  }
  inorder(root);
  let min = arr[1] - arr[0];
  for (let i = 1; i < arr.length - 1; i++) {
    min = Math.min(min, arr[i + 1] - arr[i]);
  }
  return min;
};

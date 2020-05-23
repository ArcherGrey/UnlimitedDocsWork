/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length) return null;
  let root = new TreeNode(preorder[0]);
  let stack = [root];
  let index = 0;
  for (let i = 1; i < preorder.length; ++i) {
    let val = preorder[i];
    let node = stack.pop();
    if (node.val != inorder[index]) {
      node.left = new TreeNode(val);
      stack.push(node.left);
    } else {
      while (stack.length > 0 && stack) {}
    }
  }
};

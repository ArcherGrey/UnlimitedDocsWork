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
var convertBiNode = function(root) {
  if (!root) return null;
  // 最左叶子是头节点
  let head = convertBiNode(root.left);
  if (!head) {
    // 不存在最左叶子，那么根节点是头节点
    head = root;
  } else {
    let t = head;
    //
    while (t.right) {
      t = t.right;
    }
    t.right = root;
  }
  root.left = null;
  root.right = convertBiNode(root.right);
  return head;
};

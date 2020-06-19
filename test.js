/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function (root, sum) {
  if (!root) return false;
  // 用栈保存当前的节点和对应的值
  let s = [{ node: root, val: sum - root.val }];
  while (s.length) {
    let cur = s.pop();
    // 当前节点是叶节点且对应的值为0的时候返回真
    if (!cur.node.left && !cur.node.right && cur.val == 0) {
      return true;
    }
    if (cur.node.left) {
      s.push({ node: cur.node.left, val: cur.val - cur.node.left.val });
    }
    if (cur.node.right) {
      s.push({ node: cur.node.right, val: cur.val - cur.node.right.val });
    }
  }
  return false;
};

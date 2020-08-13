/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if (!root) return root;
  // 当前层最左节点
  let leftmost = root;
  // 下一层最近节点
  let prev;
  // 正在处理的节点
  let cur;
  function processCild(node) {
    // 如果子节点存在
    if (node) {
      // 下一层最近节点存在
      if (prev) {
        // 最近节点的下一个就是子节点
        prev.next = node;
      } else {
        // 否则更新当前最左节点
        leftmost = node;
      }
      // 更新最近节点
      prev = node;
    }
  }
  while (leftmost) {
    prev = null;
    cur = leftmost;
    leftmost = null;
    while (cur) {
      processCild(cur.left);
      processCild(cur.right);
      // 同层下一个节点
      cur = cur.next;
    }
  }
  return root;
};

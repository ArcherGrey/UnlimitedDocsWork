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
  let node = root;
  while (node.left) {
    let head = node;
    while (head) {
      // 情况1 当前节点的左右子节点
      head.left.next = head.right;
      // 情况2 当前节点的同层相邻节点存在
      if (head.next) {
        head.right.next = head.next.left;
      }
      // 如果同层还有相邻节点，移动到相邻节点
      head = head.next;
    }
    // 下一层
    node = node.left;
  }
  return root;
};

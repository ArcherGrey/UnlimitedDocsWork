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
var findMode = function (root) {
  if (!root) return [];
  let res = [],
    curTimes = 1,
    maxTimes = 0;
  let pre = null;
  /**
   * @description: 中序遍历
   * @param {TreeNode} node 当前节点
   * @return:
   */
  function inOrder(node) {
    if (!node) return;
    // 遍历左子树
    inOrder(node.left);
    if (pre) {
      // 先驱节点和当前节点相同则次数加1 如果不同则次数初始为1
      curTimes = pre.val === node.val ? curTimes + 1 : 1;
    }
    // 如果当前次数等于最大次数，把当前节点加入结果数组
    if (curTimes === maxTimes) {
      res.push(node.val);
    }
    // 如果当前次数大于最大次数，清空结果数组，加入当前节点，更新最大次数
    else if (curTimes > maxTimes) {
      res = [node.val];
      maxTimes = curTimes;
    }
    // 更新先驱节点
    pre = node;
    // 遍历右子树
    inOrder(node.right);
  }

  inOrder(root);
  return res;
};

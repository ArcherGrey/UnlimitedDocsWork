/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  // 计算链表长度
  const getLength = head => {
    let l = 0;
    for (; head != null; ++l, head = head.next);
    return l;
  };

  // 生成二叉树
  const buildTree = (left, right) => {
    if (left > right) return null;
    // 找到中位数节点
    let mid = ~~((left + right + 1) / 2);
    let root = new TreeNode();

    /* 中序遍历 */
    // [left,mid-1] 是左子树
    root.left = buildTree(left, mid - 1);
    // 根节点
    root.val = head.val;
    head = head.next;
    // [mid+1,right] 是右子树
    root.right = buildTree(mid + 1, right);
    return root;
  };

  let len = getLength(head);
  return buildTree(0, len - 1);
};

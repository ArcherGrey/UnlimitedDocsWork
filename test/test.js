/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function(head) {
  if (!head) return head;
  let node = head.next;
  let tail = head; // 已排序链表的尾节点

  while (node) {
    const next = node.next;
    // 要插入的节点小于已排序链表的头节点
    // 直接插入到头节点之前
    // 然后替换头节点
    // 这种情况尾节点不变
    if (node.val < head.val) {
      node.next = head;
      head = node;
    } else if (node.val >= tail.val) {
      // 要插入节点大于尾节点
      // 插入节点变为尾节点
      tail = node;
    } else {
      // 如果不是就遍历已排序链表找到位置插入
      let n = head;
      let m = n.next;
      while (m.val < node.val) {
        m = m.next;
        n = n.next;
      }
      n.next = node;
      node.next = m;
    }
    tail.next = next;
    node = tail.next;
  }
  return head;
};

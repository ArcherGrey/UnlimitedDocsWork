var reverseList = function (head) {
  let cur = head; // 当前节点是head
  let pre = null;

  // 当前节点存在的时候循环
  while (cur) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};

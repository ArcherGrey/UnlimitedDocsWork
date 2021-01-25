/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let n1 = (n2 = 0);

  n1 = linkListToNum(l1);
  n2 = linkListToNum(l2);

  let sum = n1 + n2;

  let head = new ListNode();
  let cur = head;
  while (sum) {
    let node = new ListNode();
    cur.val = sum % 10;
    cur.next = node;
    sum = Math.floor(sum / 10);
    if (!sum) break;
    cur = node;
  }

  return head;
};

function linkListToNum(l) {
  let s = "";
  let node = l;
  while (node) {
    s = node.val + s;
    node = node.next;
  }
  return Number(s);
}

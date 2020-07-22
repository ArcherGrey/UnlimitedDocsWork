# 深度优先遍历

二叉树的深度优先遍历有三种：

- 先序遍历
- 中序遍历
- 后序遍历

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/* 先序遍历 */
// 递归
function preOrder(root) {
  if (!root) return;
  console.log(root.val); // 先根节点
  preOrder(root.left); // 然后递归遍历左子树
  preOrder(root.right); // 最后递归遍历右子树
}

// 迭代
function preOrder(root) {
  if (!root) return;
  let s = [root];
  while (s.length) {
    const node = s.pop();
    console.log(node.val); // 访问根节点
    if (node.right) s.push(node.right); // 右节点进栈
    if (node.left) s.push(node.left); // 左节点进栈
  }
}

```

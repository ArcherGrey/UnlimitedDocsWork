# 二叉树遍历

- [深度优先遍历](#深度优先遍历)
  - [先序遍历](#先序遍历)
  - [中序遍历](#中序遍历)
  - [后序遍历](#后序遍历)
- [广度优先遍历](#广度优先遍历)
  - [层次遍历](#层次遍历)

## 深度优先遍历

### 先序遍历

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

### 中序遍历

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/* 中序遍历 */
// 递归
function inOrder(root) {
  if (!root) return;
  preOrder(root.left); // 先递归遍历左子树
  console.log(root.val); // 然后访问根节点
  preOrder(root.right); // 最后递归遍历右子树
}

// 迭代
function inOrder(root) {
  let s = []; // 栈
  let p = root; // 当前节点
  while (p || s.length) {
    const node = s.pop();
    // 先访问左节点，找到最左节点
    while (p) {
      s.push(p);
      p = p.left;
    }
    // 然后访问根节点
    p = s.pop();
    console.log(p);
    // 最后访问右节点，重复遍历
    p = p.right;
  }
}
```

### 后序遍历

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/* 后序遍历 */
// 递归
function postOrder(root) {
  if (!root) return;
  preOrder(root.left); // 先递归遍历左子树
  preOrder(root.right); // 然后递归遍历右子树
  console.log(root.val); // 最后访问根节点
}

// 迭代
function postOrder(root) {
  if (!root) return;
  let s = [root]; // 栈
  let pre = null;
  while (s.length) {
    const node = s[s.length - 1];
    // 当前节点是叶节点或pre节点是当前节点的子节点
    if (
      (!node.left && !node.right) ||
      (pre && (pre == node.left || pre == node.right))
    ) {
      console.log(node.val);
      s.pop();
      pre = node;
    } else {
      if (node.right) s.push(node.right);
      if (node.left) s.push(node.left);
    }
  }
}

```

## 广度优先遍历

### 层次遍历

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/* 层次遍历 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) return [];
  let queue = [root]; // 队列
  let res = []; // 保存每层结果
  while (queue.length) {
    let levelSize = queue.length; // 当前层的长度
    res.push([]);
    for (let i = 0; i < levelSize; ++i) {
      let node = queue.shift(); // 出队
      // 把当前层的每个节点的左右子节点入队
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      res[res.length - 1].push(node.val);
    }
  }
  return res;
};



```

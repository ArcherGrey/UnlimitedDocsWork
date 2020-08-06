# 二叉树常见问题

- [二叉树最大深度](#二叉树最大深度)
- [判断二叉树是否对称](#判断二叉树是否对称)

## 二叉树最大深度

自顶向下：

- 每个节点计算对应值，递归的时候传递到子节点
- 类似前序遍历

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  let dep = 0;
  const fn = (depth, root) => {
    if (!root) return;
    // 到了叶节点更新最大深度
    if (!root.left && !root.right) {
      dep = Math.max(dep, depth);
    }
    fn(depth + 1, root.left);
    fn(depth + 1, root.right);
  };
  fn(1, root);
  return dep;
};

```

自底向上：

- 对所有子节点递归调用，然后根据返回值和根节点得到结果
- 类似后序遍历

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if (!root) return 0;
  let left = maxDepth(root.left);
  let right = maxDepth(root.right);
  return Math.max(left, right) + 1;
};

```

## 判断二叉树是否对称

递归：

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!root) return true;
  // 判断是否对称
  const check = (l, r) => {
    // 左右子节点都不存在
    if (!l && !r) {
      return true;
    }
    // 只有一个存在
    if (!l || !r) {
      return false;
    }
    // 都存在，
    // 1. 判断左右节点
    // 2. 左节点的左孩子是否和右节点的右孩子相等
    // 3. 左节点的右孩子是否和右节点的左孩子相等
    return l.val === r.val && check(l.left, r.right) && check(l.right, r.left);
  };
  return check(root.left, root.right);
};

```

迭代：

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  const q = [root, root];
  while (q.length) {
    let u = q.shift(),
      v = q.shift();
    if (!u && !v) continue;
    if (!u || !v || u.val != v.val) return false;
    // 每次把需要比较的一对按顺序加入
    q.push(u.left);
    q.push(v.right);
    q.push(u.right);
    q.push(v.left);
  }
  return true;
};

```

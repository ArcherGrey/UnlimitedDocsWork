# 二叉树常见问题

- [二叉树最大深度](#二叉树最大深度)
- [判断二叉树是否对称](#判断二叉树是否对称)
- [构造二叉树](#构造二叉树)
  - [中序后序构造二叉树](#中序后序构造二叉树)
  - [前序中序构造二叉树](#前序中序构造二叉树)

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

## 构造二叉树

常见：

- 中序 + 后序
- 中序 + 前序

1. 从前序/后序中找到根节点
2. 根据根节点把中序分成左右子树
3. 如果子树为空就返回，否则继续构造子树

### 中序后序构造二叉树

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  // 创建 hash 表存储中序序列 [value,index]
  let mem = new Map();
  for (let i = 0; i < inorder.length; ++i) {
    mem.set(inorder[i], i);
  }
  // 参数分别是中序后序的左右子树边界
  const fn = (is, ie, ps, pe) => {
    //
    if (ie < is || pe < ps) return null;
    // 后序遍历的最后一个位置是根节点
    let root = postorder[pe];
    // 获取中序遍历中根节点的位置
    let ri = mem.get(root);

    // 递归构造子树
    let node = new TreeNode(root);
    node.left = fn(is, ri - 1, ps, ps + ri - is - 1);
    node.right = fn(ri + 1, ie, ps + ri - is, pe - 1);
    return node;
  };
  return fn(0, inorder.length - 1, 0, postorder.length - 1);
};

```

### 前序中序构造二叉树

递归:

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if (!preorder.length) return null;
  let root = new TreeNode(preorder[0]);
  // 找到中序遍历中根节点的位置
  let i = 0;
  for (; i < inorder.length; ++i) {
    if (inorder[i] === preorder[0]) {
      break;
    }
  }
  // 中序
  // 左：[0,i-1] 长度 i
  // 右：[i+1,...]

  // 先序
  // 左：[1,i] 长度 i
  // 右：[i+1,...]
  root.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  root.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
  return root;
};


```

迭代:

```JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if (!preorder.length) return null;
  let root = new TreeNode(preorder[0]);
  // 当前节点的所有还没有考虑过右儿子的祖先节点 栈顶就是当前节点
  let stack = [root];
  // 指向中序遍历的位置
  let index = 0;
  for (let i = 1; i < preorder.length; ++i) {
    let val = preorder[i];
    let top = stack[stack.length - 1];
    // 中序遍历中指向的节点和当前节点不一致
    // 当前节点左子节点指向当前先序遍历节点,把该节点入栈作为当前节点
    if (top.val != inorder[index]) {
      top.left = new TreeNode(val);
      stack.push(top.left);
    } else {
      // 当前节点和中序遍历指向节点一致
      while (
        stack.length > 0 &&
        stack[stack.length - 1].val == inorder[index]
      ) {
        top = stack[stack.length - 1];
        stack.pop();
        ++index;
      }
      top.right = new TreeNode(val);
      stack.push(top.right);
    }
  }
  return root;
};

```

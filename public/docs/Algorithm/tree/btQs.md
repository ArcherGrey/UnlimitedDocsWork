# 二叉树常见问题

[toc]

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

## 二叉树的最近公共祖先

:::info
最近公共祖先的定义： 设节点 root 为节点 p, q 的某公共祖先，若其左子节点 root.left 和右子节点 root.right 都不是 p,q 的公共祖先，则称 root 是 “最近的公共祖先”
:::

根据以上定义，若 `root` 是 `p,q` 的 最近公共祖先 ，则只可能为以下情况之一：

- `p` 和 `q` 在 `root` 的子树中，且分列 `root` 的 异侧（即分别在左、右子树中）；
- `p = root` ，且 `q` 在 `root` 的左或右子树中；
- `q = root` ，且 `p` 在 `root` 的左或右子树中；

递归解析：

1. 终止条件：
   1. 当越过叶节点，则直接返回 `null`
   2. 当 `root` 等于 `p, q` ，则直接返回 `root` ；
2. 递推工作：
   1. 开启递归左子节点，返回值记为 `left` ；
   2. 开启递归右子节点，返回值记为 `right` ；
3. 返回值： 根据 `left` 和 `right` ，可展开为四种情况；
   1. 当 `left` 和 `right` 同时为空 ：说明 `root` 的左 / 右子树中都不包含 `p,q` ，返回 null ；
   2. 当 `left` 和 `right` 同时不为空 ：说明 `p, q` 分列在 `root` 的 异侧 （分别在 左 / 右子树），因此 `root` 为最近公共祖先，返回 `root` ；
   3. 当 `left` 为空 ，`right` 不为空 ：`p,q` 都不在 `root` 的左子树中，直接返回 `right` 。具体可分为两种情况：
      1. `p,q`其中一个在 `root` 的 右子树 中，此时 `right` 指向 `p`（假设为 `p` ）；
      2. `p,q` 两节点都在 `root` 的 右子树 中，此时的 `right` 指向 最近公共祖先节点 ；
   4. 当 `left` 不为空 ， `right` 为空 ：与情况 3. 同理；

```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function lowestCommonAncestor(
  root: TreeNode | null,
  p: number,
  q: number
): TreeNode | null {
  if (!root || root.val == p || root.val == q) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  // 情况1
  if (!left && !right) return null;
  // 情况3
  if (!left) return right;
  // 情况4
  if (!right) return left;
  // 情况2
  return root;
}
```

## 二叉搜索树的最近公共祖先

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  const pv = p.val,
    qv = q.val;
  let node = root;
  while (node) {
    const v = node.val;
    if (v > pv && v > qv) {
      node = node.left;
    } else if (v < pv && v < qv) {
      node = node.right;
    } else return node;
  }
  return null;
};
```

## 二叉搜索树中的插入操作

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
  if (root === null) {
    return new TreeNode(val);
  }
  let pos = root;
  while (pos !== null) {
    if (val < pos.val) {
      if (pos.left === null) {
        pos.left = new TreeNode(val);
        break;
      } else {
        pos = pos.left;
      }
    } else {
      if (pos.right === null) {
        pos.right = new TreeNode(val);
        break;
      } else {
        pos = pos.right;
      }
    }
  }
  return root;
};
```

## 二叉树的序列化与反序列化

:::info

序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据
:::

基于先序遍历

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
  let str = "";
  if (!root) str += "null,";
  else {
    str += root.val + ",";
    str += serialize(root.left);
    str += serialize(root.right);
  }
  return str;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  let a = data.split(",");
  a.pop();
  function rd(arr) {
    if (arr[0] == "null") {
      arr.shift();
      return null;
    }
    let root = new TreeNode(arr.shift());
    root.left = rd(arr);
    root.right = rd(arr);
    return root;
  }
  return rd(a);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
```

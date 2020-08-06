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

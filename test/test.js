/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  if (!n) return [];
  function gTrees(l, r) {
    if (l > r) return [null];
    if (l == r) return [new TreeNode(l)];
    let arr = [];
    for (let i = l; i <= r; ++i) {
      let la = gTrees(l, i - 1);
      let ra = gTrees(i + 1, r);
      for (let lt of la) {
        for (let rt of ra) {
          const root = new TreeNode(i);
          root.left = lt;
          root.right = rt;
          arr.push(root);
        }
      }
    }
    return arr;
  }
  return gTrees(1, n);
};

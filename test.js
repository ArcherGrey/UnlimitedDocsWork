/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {string} S
 * @return {TreeNode}
 */
var recoverFromPreorder = function (S) {
  let path = [];
  let pos = 0;
  while (pos < S.length) {
    // 获取当前节点的深度
    let level = 0;
    while (S[pos] == "-") {
      ++level;
      ++pos;
    }

    // 获取当前节点的值
    let val = 0;
    while (pos < S.length && !isNaN(S[pos])) {
      val = val * 10 + (S[pos] - "0");
      ++pos;
    }

    let node = new TreeNode(val);
    if (level == path.length) {
      if (path.length) {
        path[path.length - 1].left = node;
      }
    } else {
      while (level != path.length) {
        path.pop();
      }
      path[path.length - 1].right = node;
    }
    path.push(node);
  }
  return path[0];
};

/**
 * @description: 迭代 DFS 伪代码 显示栈
 * @param root 根节点
 * @param target 目标节点
 * @return: {Boolean}
 */
function DFS(root, target) {
  let visited = [];
  let stack = [];
  stack.push(root);
  while (stack.length > 0) {
    let cur = stack.pop();
    if (cur == target) return true;
    for (node of cur.neighbors) {
      if (visited.indexOf(node) < 0) {
        visited.push(node);
        stack.push(node);
      }
    }
  }
  return false;
}

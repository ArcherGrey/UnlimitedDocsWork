/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
  if (!node) return node;
  // 哈希表
  let m = new Map();
  // 队列
  let q = [node];
  // 克隆第一个节点并存储到 hash 表中
  m.set(node, new Node(node.val));
  while (q.length) {
    let n = q.shift();
    for (let neighbor of n.neighbors) {
      // 没有访问过
      if (!m.has(neighbor)) {
        // 标记访问，克隆节点，加入队列
        m.set(neighbor, new Node(neighbor.val));
        q.push(neighbor);
      }
      // 更新邻居列表
      m.get(n).neighbors.push(m.get(neighbor));
    }
  }
  return m.get(node);
};

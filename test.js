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
var cloneGraph = function (node) {
  if (!node) return node;
  var s = new Map();
  function dfs(n) {
    if (!s.has(n)) {
      var a = new Node(n.val, []);
      s.set(n, a);
      a.neighbors = n.neighbors.map(x => dfs(x));
    }
    return s.get(n);
  }
  return dfs(node);
};

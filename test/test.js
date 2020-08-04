/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  let edges = new Array(numCourses);
  for (let i = 0; i < edges.length; ++i) {
    edges[i] = [];
  }
  // 入度队列
  let indeg = new Array(numCourses).fill(0);

  // 构建有向图
  for (let point of prerequisites) {
    edges[point[1]].push(point[0]);
    indeg[point[0]]++;
  }
  let q = [];
  for (let i = 0; i < numCourses; ++i) {
    if (!indeg[i]) {
      // 入度为 0 的节点先入队
      q.push(i);
    }
  }

  let visited = 0;
  while (q.length) {
    ++visited;
    let u = q.pop();
    for (let v of edges[u]) {
      indeg[v]--;
      if (!indeg[v]) {
        q.push(v);
      }
    }
  }
  return visited == numCourses;
};

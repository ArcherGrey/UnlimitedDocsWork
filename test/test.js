/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
  // 有向图
  let v = [];
  // 结果路径
  let s = [];

  // 建立有向图
  for (let t of tickets) {
    if (v[t[0]] == undefined) {
      v[t[0]] = new Array(t[1]);
    } else {
      v[t[0]].push(t[1]);
      v[t[0]].sort();
    }
  }

  function dfs(cur) {
    // 如果有路
    while (v[cur] && v[cur].length) {
      let t = v[cur].shift();
      dfs(t);
    }
    s.unshift(cur);
  }
  dfs("JFK");
  return s;
};

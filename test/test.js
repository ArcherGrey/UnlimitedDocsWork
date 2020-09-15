/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function(costs) {
  if (costs.length == 0) return 0;
  let l = costs.length;

  let a = [...costs[0]];
  let b = new Array(3).fill(0);
  for (let i = 1; i < l; ++i) {
    for (let j = 0; j < 3; ++j) {
      b[j] = costs[i][j] + Math.min(a[(j + 1) % 3], a[(j + 2) % 3]);
    }
    a = [...b];
  }
  return Math.min(...a);
};

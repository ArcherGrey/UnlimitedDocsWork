/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let ls = [],
    rs = [];
  let len = heights.length;
  let l = [],
    r = [];
  for (let i = 0, j = len - 1; i < len, j >= 0; ++i, --j) {
    while (ls.length && heights[i] <= heights[ls[ls.length - 1]]) {
      ls.pop();
    }
    l[i] = ls.length ? ls[ls.length - 1] : -1;
    ls.push(i);
    while (rs.length && heights[j] <= heights[rs[rs.length - 1]]) {
      rs.pop();
    }
    r[j] = rs.length ? rs[rs.length - 1] : len;
    rs.push(j);
  }
  let ans = 0;
  for (let x = 0; x < len; ++x) {
    ans = Math.max(ans, (r[x] - l[x] - 1) * heights[x]);
  }
  return ans;
};

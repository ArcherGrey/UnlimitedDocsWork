/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  let n = triangle.length;
  let dp1 = new Array(n).fill(0);
  let dp2 = new Array(n).fill(0);
  dp1[0] = triangle[0][0];
  for (let i = 1; i < n; ++i) {
    // 最左
    dp2[0] = dp1[0] + triangle[i][0];
    for (let j = 1; j < i; ++j) {
      dp2[j] = Math.min(dp1[j], dp1[j - 1]) + triangle[i][j];
    }
    // 最右
    dp2[i] = dp1[i - 1] + triangle[i][i];
    // 深拷贝 dp2替换dp1
    [...dp1] = dp2;
  }
  return dp[n - 1].sort((a, b) => a - b)[0];
};

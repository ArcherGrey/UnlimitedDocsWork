/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  let res = 0;
  if (matrix.length == 0) return res;
  let rows = matrix.length,
    cols = matrix[0].length;
  let dp = new Array(rows);
  for (let i = 0; i < dp.length; ++i) {
    dp[i] = new Array(cols);
    for (let j = 0; j < dp[i].length; ++j) {
      dp[i][j] = 0;
    }
  }
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (matrix[i][j] == "1") {
        if (i == 0 || j == 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
        }
        if (dp[i][j] > res) {
          res = dp[i][j];
        }
      }
    }
  }
  return res * res;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const n = prices.length;
  if (n < 2) return 0;
  let dp = new Array(n);
  for (let i = 0; i < n; ++i) {
    dp[i] = new Array(3).fill(0);
  }
  dp[0][0] = -prices[0];
  dp[0][1] = dp[0][2] = 0;
  let i = 1;
  while (i < n) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2] - prices[i]);
    dp[i][1] = dp[i - 1][0] + prices[i];
    dp[i][2] = Math.max(dp[i - 1][1], dp[i - 1][2]);
    i++;
  }
  return Math.max(dp[i - 1][1], dp[i - 1][2]);
};

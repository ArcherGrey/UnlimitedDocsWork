/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findLength = function (A, B) {
  let al = A.length,
    bl = B.length;
  let dp = Array(al * bl + al + 1).fill(0),
    ans = 0;
  for (let i = al - 1; i >= 0; --i) {
    for (let j = bl - 1; j >= 0; --j) {
      if (A[i] == B[j]) {
        dp[i + al * j] = dp[i + 1 + al * (j + 1)] + 1;
      } else {
        dp[i + al * j] = 0;
      }
      ans = Math.max(dp[i + al * j], ans);
    }
  }
  return ans;
};

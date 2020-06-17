/**
 * @param {number[]} A
 * @return {number}
 */
var maxScoreSightseeingPair = function (A) {
  let ans = 0,
    max = A[0] + 0;
  for (let j = 1; j < A.length; ++j) {
    ans = Math.max(ans, max + A[j] - j);
    // 遍历同时维护最大值
    max = Math.max(max, A[j] - j);
  }
  return ans;
};

/**
 * @param {number[]} A
 * @return {boolean}
 */
var validMountainArray = function(A) {
  if (A.length < 3) return false;

  // 如果一开始就是下降肯定不是山脉
  if (A[0] > A[1]) return false;
  let m = 0; // m=0 表示上升
  for (let i = 0; i < A.length - 1; ++i) {
    // 趋势改变
    if (A[i] > A[i + 1] && !m) {
      m = 1;
    }
    // 上升趋势中遇到不符合的
    if (A[i] >= A[i + 1] && !m) {
      return false;
    }

    // 下降趋势中遇到不符合的
    if (A[i] <= A[i + 1] && m) {
      return false;
    }
  }
  return m;
};

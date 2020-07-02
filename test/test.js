/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  const n = matrix.length;
  let l = matrix[0][0];
  let r = matrix[n - 1][n - 1];
  while (l < r) {
    let mid = ~~((l + r) / 2);
    if (check(matrix, mid, k, n)) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
};

function check(m, mid, k, n) {
  let i = n - 1,
    j = 0;
  let num = 0;
  while (i >= 0 && j < n) {
    if (m[i][j] <= mid) {
      num += i + 1;
      j++;
    } else {
      i--;
    }
  }
  return num >= k;
}

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var subarraysDivByK = function (A, K) {
  let record = [];
  for (let j = 0; j < K; ++j) {
    record[j] = 0;
  }
  record[0] = 1;
  let sum = 0,
    ans = 0;
  for (let i = 0; i < A.length; ++i) {
    sum += A[i];
    // 兼容负数情况
    let mod = ((sum % K) + K) % K;
    record[mod] = record[mod] + 1;
  }
  for (let q = 0; q < record.length; ++q) {
    // 排列组合
    ans += (record[q] * (record[q] - 1)) / 2;
  }
  return ans;
};

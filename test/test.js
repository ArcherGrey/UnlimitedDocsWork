/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (s, nums) {
  if (!nums.length) return 0;
  let i = (j = sum = 0),
    ans = Infinity;
  while (j < nums.length) {
    sum += nums[j];
    while (sum >= s) {
      ans = Math.min(ans, j - i + 1);
      sum -= nums[i];
      i++;
    }
    j++;
  }
  return ans > n ? 0 : ans;
};

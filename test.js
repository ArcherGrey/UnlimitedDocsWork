/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let pre = 0;
  max = nums[0]; // 边界
  for (let num of nums) {
    // 状态转移方程
    pre = Math.max(num, pre + x);
    max = Math.max(pre, max);
  }
  return max;
};

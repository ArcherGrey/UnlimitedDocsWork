/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  let n = nums.length;
  // 第一次遍历 把所有负数转换为 n+1
  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] <= 0) {
      nums[i] = n + 1;
    }
  }

  // 第二次遍历 标记对应的位置为负数
  for (let i = 0; i < nums.length; ++i) {
    let cur = Math.abs(nums[i]);
    if (cur <= n && cur > 0) {
      if (nums[cur - 1] > 0) {
        nums[cur - 1] *= -1;
      }
    }
  }

  // 第三次遍历找到最小的未标记值
  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] > 0) return i + 1;
  }

  // 没有找到就是 n+1
  return n + 1;
};

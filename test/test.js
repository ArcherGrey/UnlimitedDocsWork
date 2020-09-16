/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  if (nums.length == 0) return 0;
  let dp = [nums[0]];
  for (let i = 1; i < nums.length; ++i) {
    if (dp[i - 1] >= 0) {
      dp[i] = dp[i - 1] + nums[i];
    } else dp[i] = nums[i];
    // else dp[i] = 0;
  }
  return Math.max(...dp);
};

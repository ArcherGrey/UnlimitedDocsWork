/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let max, min, ans;
  for (let i = 0; i < nums.length; ++i) {
    let cur = nums[i];
    if (i === 0) {
      ans = cur;
      max = cur;
      min = cur;
    } else {
      let mx = max,
        mn = min;
      max = Math.max(mx * cur, mn * cur, cur);
      min = Math.min(mx * cur, mn * cur, cur);
    }
    ans = Math.max(ans, max);
  }
  return ans;
};

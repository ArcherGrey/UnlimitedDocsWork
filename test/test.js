/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let s = new Set();
  for (let i = 0; i < nums.length; ++i) {
    // 除了一个每个都出现了两次
    // 那就先加入再刪除
    // 最后剩下的就是所求
    if (!s.has(nums[i])) s.add(nums[i]);
    else s.delete(nums[i]);
  }
  for (let x of s) {
    return x;
  }
};

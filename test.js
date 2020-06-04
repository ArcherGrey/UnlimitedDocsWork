/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  reverse(nums, 0, nums, length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
};

function reverse(nums, i, j) {
  for (; i <= j; i++, j--) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
}

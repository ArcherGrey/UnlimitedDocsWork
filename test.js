/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let noZ = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      [nums[noZ], nums[i]] = [nums[i], nums[noZ]];
      noZ++;
    }
  }
  return nums;
};

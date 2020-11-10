/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
  // 第一次扫描 找到 [左侧较小数]
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  // 如果存在
  if (i >= 0) {
    // 第二次扫描 找到 [右侧较大数]
    let j = nums.length - 1;
    while (j >= 0 && nums[i] >= nums[j]) {
      j--;
    }
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  // 交换完成后 再反转 [较大数] 右侧的即可
  let a = i + 1,
    b = nums.length - 1;
  while (a < b) {
    [nums[a], nums[b]] = [nums[b], nums[a]];
    a++;
    b--;
  }
};

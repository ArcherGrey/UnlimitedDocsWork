/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const len = nums.length;
  // 先排序
  nums.sort((a, b) => {
    return a - b;
  });
  let ans = [];
  for (let i = 0; i < len; ++i) {
    // 和上一个相同就跳过
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue;
    }
    let k = len - 1; // 最后一个数的指针指向数组最后
    let target = -nums[i]; // 转换为求两数之和是当前值的相反数
    for (let j = i + 1; j < len; ++j) {
      // 跳过相同的数
      if (j > i + 1 && nums[j] == nums[j - 1]) {
        continue;
      }
      // 保证后两个数顺序的前提，移动最后数的指针
      while (j < k && nums[j] + nums[k] > target) {
        k--;
      }
      // 如果指针重合就退出
      if (j == k) {
        break;
      }
      if (nums[j] + nums[k] == target) {
        ans.push([nums[i], nums[j], nums[k]]);
      }
    }
  }
  return ans;
};

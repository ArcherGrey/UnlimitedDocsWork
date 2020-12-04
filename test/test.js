/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function(nums) {
  const countMap = new Map(); // 统计每个数字出现的次数
  const endMap = new Map(); // 统计每个数字作为结尾的序列数量

  // 初始化
  for (const x of nums) {
    const count = (countMap.get(x) || 0) + 1;
    countMap.set(x, count);
  }

  for (const x of nums) {
    const count = countMap.get(x) || 0;
    // 存在该数字
    if (count > 0) {
      // 以 x-1 结尾的序列数量
      const prevEndCount = endMap.get(x - 1) || 0;

      // 存在以 x-1 结尾的序列
      if (prevEndCount > 0) {
        // x 数目减一
        countMap.set(x, count - 1);
        // x-1 结尾的序列减1
        endMap.set(x - 1, prevEndCount - 1);
        // x 结尾的序列加1
        endMap.set(x, (endMap.get(x, 0) || 0) + 1);
      } else {
        // x+1 x+2 是否都存在
        const count1 = countMap.get(x + 1, 0);
        const count2 = countMap.get(x + 2, 0);
        if (count1 > 0 && count2 > 0) {
          // 存在更新哈希表
          countMap.set(x, count - 1);
          countMap.set(x + 1, count1 - 1);
          countMap.set(x + 2, count2 - 1);
          endMap.set(x + 2, (endMap.get(x + 2) || 0) + 1);
        } else {
          // 不存在返回 false
          return false;
        }
      }
    }
  }
  return true;
};

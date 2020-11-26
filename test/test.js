/**
 * @description: LSD Radix Sort
 * @param {Array} nums 待排序数组
 * @return {void}
 */
function radixSort(nums) {
  const n = nums.length;
  if (n < 2) return;

  let exp = 1; // 位数，最低位开始
  const buf = new Array(n).fill(0);
  const maxVal = Math.max(...nums);

  // 超过最大值就结束排序
  while (maxVal >= exp) {
    const cnt = new Array(10).fill(0); // cnt[i] 对应的就是基数为 i 的值的最后位置
    for (let i = 0; i < n; ++i) {
      let digit = Math.floor(nums[i] / exp) % 10; // 计算基数
      cnt[digit]++;
    }

    for (let i = 1; i < 10; ++i) {
      cnt[i] += cnt[i - 1]; // 统计累计数量
    }

    for (let i = n - 1; i >= 0; i--) {
      let digit = Math.floor(nums[i] / exp) % 10;
      buf[cnt[digit] - 1] = nums[i];
      cnt[digit]--;
    }
    nums.splice(0, n, ...buf); // 实际上等于 nums = [...buf] 更新每位排序后的结果
    exp *= 10;
  }
}

# 基数排序

:::info
基数排序是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。由于整数也可以表达字符串（比如名字或日期）和特定格式的浮点数，所以基数排序也不是只能使用于整数。
:::

分为两种：

- `LSD(Least significant digital)`：最低有效位优先，即从右向左开始排序。
- `MSD(Most significant digital)`：最高有效位优先，即从左往右开始排序。

```js
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
    const cnt = new Array(10).fill(0); // 统计每个基数的数量
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
```

时间复杂度为`O (nlog(r)m)`，其中 `r` 为所采取的基数，`m` 是最大位数

/**
 * @param {number} N
 * @return {number}
 */
var monotoneIncreasingDigits = function(N) {
  // 将给定数字划分成数组
  const strN = N.toString()
    .split("")
    .map(v => +v);

  // 满足条件 i 就继续遍历
  let i = 1;
  while (i < strN.length && strN[i - 1] <= strN[i]) {
    i += 1;
  }

  // 从 i 开始的部分不满足条件
  if (i < strN.length) {
    // 从 i 开始反向检查不满足的就减一，直到之前的都满足条件
    while (i > 0 && strN[i - 1] > strN[i]) {
      strN[i - 1] -= 1;
      i -= 1;
    }

    // 贪心的角度 后面的位数直接补 9 就是最大的
    for (i += 1; i < strN.length; ++i) {
      strN[i] = 9;
    }
  }
  return parseInt(strN.join(""));
};

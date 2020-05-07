/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function (T) {
  let stack = [];
  let res = new Array(T.length);
  for (let i = 0; i < T.length; ++i) {
    // 栈空直接入栈
    if (stack.length === 0) {
      stack.push({ index: i, value: T[i] });
      continue;
    }
    // 栈顶元素
    let top = stack[stack.length - 1];

    // 如果栈顶元素大于等于当前值，直接入栈
    if (top.value >= T[i]) {
      stack.push({ index: i, value: T[i] });
      continue;
    }
    // 如果栈顶元素小于当前值，那么栈顶元素出栈，计算栈顶元素对应的索引差
    //（出栈后继续判断栈顶直到栈空或者比当前值大）
    while (stack.length > 0) {
      top = stack[stack.length - 1];
      if (top.value < T[i]) {
        res[top.index] = i - top.index;
        stack.pop();
      } else {
        break;
      }
    }
    // 所有小于当前值的元素都出栈后，入栈当前值
    stack.push({ index: i, value: T[i] });
  }
  // 剩余stack里面元素都是0
  for (let j = 0; j < stack.length; ++j) {
    res[stack[j].index] = 0;
  }
  return res;
};

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  let numSquares = []; // 保存小于 n 的完全平方数
  for (let i = 1; i * i <= n; ++i) {
    numSquares.push(i * i);
  }
  let level = 0;
  let queue = new Set(); // set 保存直接过滤重复
  queue.add(n);

  while (queue.size > 0) {
    level++;
    let newQueue = new Set();
    for (let ele of queue) {
      for (let num of numSquares) {
        // 完全平方数列表中找到了就返回
        if (ele == num) {
          return level;
        }
        // 如果小于当前的完全平方数，那肯定小于后面的，直接跳出循环
        else if (ele < num) {
          break;
        }
        // 如果大于就把差值加入到新队列中
        else {
          newQueue.add(ele - num);
        }
      }
    }
    queue = newQueue;
  }
  return level;
};

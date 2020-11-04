/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  let [left, right] = newInterval;
  let placed = false; // 标记是否加入新区间
  let ans = [];
  for (let i of intervals) {
    // 在插入区间的右侧，且没有交集
    if (i[0] > right) {
      if (!placed) {
        ans.push([left, right]);
        placed = true;
      }
      ans.push(i);
    } else if (i[1] < left) {
      // 左侧没有交集
      ans.push(i);
    } else {
      // 存在交集，计算并集，更新插入区间
      left = Math.min(left, i[0]);
      right = Math.max(right, i[1]);
    }
  }
  if (!placed) {
    // 如果不在插入区间的右侧
    // 那么插入区间就是在最后
    ans.push([left, right]);
  }
  return ans;
};

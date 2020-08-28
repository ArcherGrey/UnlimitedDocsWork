/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function(moves) {
  // 保存每个方向的次数
  let m = { U: 0, D: 0, L: 0, R: 0 };
  // 遍历统计每个方向的次数
  for (let s of moves) {
    m[s]++;
  }
  // 上下相等 左右相等就会返回原点
  return m["U"] == m["D"] && m["L"] == m["R"];
};
